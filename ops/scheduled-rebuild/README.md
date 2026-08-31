# Scheduled rebuild after Journal Club events

The homepage is prerendered, so its "Next Meeting" card is frozen at build time.
Normal content edits rebuild via GitHub push, but when an event simply *ends*
there is no commit, so the live site keeps showing the finished event until the
next build.

This agent runs on an always-on Mac every 15 minutes. When a Journal Club
event's end time (`start + durationMinutes`, default 60) has just passed, it
POSTs a Cloudflare **Deploy Hook** to rebuild `main` — no commit, clean history.

## Pieces

- `scripts/check-journal-club-rebuild.mjs` — reads every `journal-club` entry,
  computes each end time, and fires the deploy hook if one ended since the last
  run. Tracks the last-run timestamp in `~/.cache/rdrp-jc-rebuild/last-check`.
- `ops/scheduled-rebuild/run-jc-rebuild.sh` — launchd wrapper; loads the secret
  Deploy Hook URL and runs the script with `--pull`.
- `ops/scheduled-rebuild/io.rdrp.jc-rebuild.plist` — the launchd agent.

## Current installation (as of 2026-09-01)

- **Host:** Mac mini (`Shoichis-Mac-mini`). Always on: `pmset` reports `sleep 0` on AC power.
- **Clone the agent reads:** `~/ops/rdrp-website` — **dedicated to the agent; never hand-edit it.** Selected via
  `RDRP_REPO_DIR` in the secrets file. The human working copy on that machine stays at `~/Projects/website`.
- **Agent:** `~/Library/LaunchAgents/io.rdrp.jc-rebuild.plist`, label `io.rdrp.jc-rebuild`, every 900 s.
- **Deploy hook:** Cloudflare Pages project `website` -> `journal-club-auto-rebuild`, branch `main`.
- **Secret:** `~/.config/rdrp/deploy-hook.env` (chmod 600, outside the repo).
- **Log:** `~/Library/Logs/rdrp-jc-rebuild.log`.
- Verified end to end: hook POST returns HTTP 200 `success: true`; the agent pulls the dedicated clone (checked by
  leaving the two clones at different commits and seeing which one advanced); consecutive scheduled runs 15 minutes
  apart (15:42:48Z -> 15:57:50Z).

The agent previously ran on the MacBook Pro out of the shared development clone. It was moved because a laptop sleeps
and, more importantly, because sharing a clone with hand-editing means a dirty tree silently disables rebuilds.

## One-time setup

1. **Create a Cloudflare Deploy Hook**
   Cloudflare dashboard → Workers & Pages → (this project) → Settings →
   Builds & deployments → Deploy hooks → create one for branch `main`.
   Copy the URL.

2. **Store the URL outside the repo** (never commit it):
   ```sh
   mkdir -p ~/.config/rdrp
   printf 'export RDRP_DEPLOY_HOOK_URL="PASTE_URL_HERE"\n' > ~/.config/rdrp/deploy-hook.env
   chmod 600 ~/.config/rdrp/deploy-hook.env
   ```

3. **Make the wrapper executable:**
   ```sh
   chmod +x ops/scheduled-rebuild/run-jc-rebuild.sh
   ```

4. **Install the launchd agent:**
   ```sh
   cp ops/scheduled-rebuild/io.rdrp.jc-rebuild.plist ~/Library/LaunchAgents/
   launchctl load -w ~/Library/LaunchAgents/io.rdrp.jc-rebuild.plist
   ```
   (If the repo is not at `~/Projects/website`, edit the absolute paths in the
   plist, and set `RDRP_REPO_DIR` in the wrapper or env file.)

## Verify without touching production

These never POST anything:

```sh
# Show every event's computed start/end (UTC) and current status.
npm run journal-club:rebuild:list

# Show what the next scheduled run would decide (no POST, no state change).
npm run journal-club:rebuild:check
```

Check the agent is registered and read its log:

```sh
launchctl list | grep io.rdrp.jc-rebuild
tail -f ~/Library/Logs/rdrp-jc-rebuild.log
```

## Manage

```sh
# Run once immediately (will pull + may fire if an event just ended):
launchctl start io.rdrp.jc-rebuild

# Stop / remove:
launchctl unload -w ~/Library/LaunchAgents/io.rdrp.jc-rebuild.plist
```

## Notes

- **First run never rebuilds.** It only records the current time, so historical
  events don't trigger a build. Real triggering starts from the next event end.
- The "Initialized state at ..." line appears only while `~/.cache/rdrp-jc-rebuild/last-check`
  does not exist yet. If you ran the wrapper or the script by hand before loading the agent,
  the state file already exists, so `RunAtLoad`'s first run prints the ordinary
  "No event ended since ..." line instead. That is not a failure.
- **`RDRP_REPO_DIR` selects which clone the agent reads and pulls.** Set it in the secrets
  file (it is sourced before the path is resolved). Point it at a clone nobody edits by hand:
  the agent runs `git pull --rebase`, which fails on a dirty tree and skips the run. If the
  resolved clone has no rebuild script the wrapper aborts with a message rather than a bare
  node error.
- To confirm which clone the agent actually used, leave the two clones at different commits
  and check which one advanced after a run — the output alone is identical either way.
- If the deploy hook fails (network, etc.) the last-run timestamp is *not*
  advanced, so the next run retries.
- `durationMinutes` lives on each Journal Club entry (Keystatic field). The site
  and this script read the same value, so changing an event's length keeps both
  the "Live Now" window and the rebuild timing in sync.
