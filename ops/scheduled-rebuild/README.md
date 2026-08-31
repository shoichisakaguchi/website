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

- **Host:** MacBook Pro (`Shoichis-MacBook-Pro.local`), repo at `~/Projects/website`.
- **Agent:** `~/Library/LaunchAgents/io.rdrp.jc-rebuild.plist`, label `io.rdrp.jc-rebuild`, every 900 s.
- **Deploy hook:** Cloudflare Pages project `website` -> `journal-club-auto-rebuild`, branch `main`.
- **Secret:** `~/.config/rdrp/deploy-hook.env` (chmod 600, outside the repo).
- **Log:** `~/Library/Logs/rdrp-jc-rebuild.log`.
- Verified: hook POST returns HTTP 200 `success: true`; first run initialised state without rebuilding.

Because this host is a laptop it can be asleep when an event ends. Nothing is lost — the next run rebuilds for any
event that ended since the last check — but the rebuild can be late. Moving the agent to an always-on machine only
needs a clone of this repo plus the same two files there.

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
- If the deploy hook fails (network, etc.) the last-run timestamp is *not*
  advanced, so the next run retries.
- `durationMinutes` lives on each Journal Club entry (Keystatic field). The site
  and this script read the same value, so changing an event's length keeps both
  the "Live Now" window and the rebuild timing in sync.
