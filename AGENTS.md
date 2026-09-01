# AGENTS.md

This file is the shared project map for LLMs working in this repo.
CLAUDE.md is a symlink to this file so multiple tools read the same source.

## Project Overview
- **Project:** rdrp.io (RNA-dependent RNA Polymerase Summit community site)
- **Stack:** Astro 5 (SSR), React 19, Keystatic CMS, Markdoc, Pagefind
- **Deploy:** Cloudflare Pages with `nodejs_compat`

## Architecture Summary
- **Homepage:** Phase-driven using the `summit` singleton and a featured summit.
- **Content Collections:** `summit` singleton, `summits`, `people`, `announcements`, `journal-club`.
- **Content Flow:** `summit` singleton -> featured summit -> phase-specific rendering -> organizers resolved from `people` with role/affiliation overrides.
- **Search:** Pagefind indexing during build (`astro build` then `pagefind --site dist`); only `data-pagefind-body` content is indexed.
- **Contact:** there is no server-side contact form and no email provider. Community intake is the Google Form linked from the header; `public/_redirects` 301s the retired `/contact` URL to it. A Resend-backed form used to live at `src/pages/api/contact.ts`, but `RESEND_API_KEY` was never set in either Cloudflare environment, so it only ever returned 500 — it was removed rather than finished.
- **Keystatic:** Admin UI at `/keystatic` (dev: http://localhost:4321/keystatic).

## Key Locations
- **Config:** `astro.config.mjs`, `wrangler.toml`, `keystatic.config.ts`, `src/content/config.ts`
- **Pages:** `src/pages/index.astro`, `src/pages/summits/[slug].astro`, `src/pages/journal-club/[slug].astro`
- **Images:** `src/assets/images/people/`, `public/images/summits/`, `public/images/speakers/`
- **Search UI:** `src/components/Search.astro`

## Schema Notes
- URL fields often allow empty strings (`.url().optional().or(z.literal(''))`) in `src/content/config.ts`.
- Images use Astro's `image()` helper for type safety/optimization.
- Dates are parsed with `z.coerce.date()` and displayed in "Month Day, Year" format.

## Journal Club Operations
- **The homepage card and the schedule page decide what to show in the browser, not at build time.** Each embeds the
  events that were still upcoming when the page was built, plus their start/end instants, and a small inline script
  re-picks using the visitor's clock (re-checked every 60 s, so a page left open crosses a start or end on its own).
  A stale build therefore cannot leave a finished session on "Live Now" — which is exactly what happened in June 2026.
  Without JavaScript the build-time choice stands, which is the old behaviour.
- Because of that, the scheduled rebuild is a **safety net, not the mechanism**: its job is to refresh the embedded
  list, and normal content pushes already do that. Correctness of the badge no longer depends on it.
- ⚠ Toggling with the `hidden` attribute needs `[hidden] { display: none !important }` in these components: author
  rules like `.button { display: inline-flex }` outbid the UA stylesheet and the element stays visible otherwise.
- **Live window / end time:** set `durationMinutes` per entry (Keystatic field). The site (`src/components/JournalClubHome.astro`) and the rebuild trigger both read it, so they always agree on when an event becomes past.
- **Automated post-event rebuild:** a scheduled job (`ops/scheduled-rebuild/`, launchd every 15 min) POSTs a Cloudflare Deploy Hook shortly after each event ends — no commit, clean history. See `ops/scheduled-rebuild/README.md`.
- **Where it runs:** the **Mac mini** (always on — `pmset` reports `sleep 0` on AC), out of a **dedicated clone at `~/ops/rdrp-website` that nobody edits by hand**. Agent label `io.rdrp.jc-rebuild`, log `~/Library/Logs/rdrp-jc-rebuild.log`. `RDRP_REPO_DIR` in the secrets file selects that clone. The Cloudflare deploy hook is named `journal-club-auto-rebuild` (branch `main`); its URL is a secret kept outside the repo at `~/.config/rdrp/deploy-hook.env` (chmod 600) and must never be committed.
- ⚠ The agent runs `git pull --rebase` in its clone, which **fails while that tree is dirty** — it then skips the rebuild and retries next run without advancing state. This is why the agent has its own clone: a dirty development tree would otherwise silently disable automatic rebuilds. Never hand-edit `~/ops/rdrp-website`.
- If there are post-event content updates (slides, recording links, status text), still commit and push them as usual; the automated rebuild only handles the "event just ended, nothing to commit" case.
- Inspect timing without side effects: `npm run journal-club:rebuild:list` (all events, UTC start/end, status) and `npm run journal-club:rebuild:check` (dry-run of the next scheduled decision).

## Ownership Transfer (deferred)

The repository description states the intent to move this repo from the personal account to an RdRp Summit
GitHub Organization. As of 2026-09-01 this is **on hold** pending a check with Neri about what is already managed
elsewhere. Keep this list so the work is not re-derived later.

Verified against GitHub's transfer docs: existing collaborators remain intact, webhooks/secrets/deploy keys stay
associated, and old URLs redirect automatically. So adding editors before the transfer is not wasted work.

What still has to be touched, because it names the repo explicitly or authorises against it:

- `keystatic.config.ts` — `repo: 'shoichisakaguchi/website'` is hardcoded. **Miss this and production Keystatic breaks.**
- Docs that name the slug: this file, `.claude/rules/keystatic.md`, `.claude/rules/git-workflow.md`,
  `.claude/skills/add-content-keystatic/SKILL.md`.
- Local clones — `git remote set-url`: `~/Projects/website` (MacBook Pro and Mac mini) and the rebuild agent's
  `~/ops/rdrp-website` on the Mac mini. Redirects cover them for a while, but leaving them stale is asking for
  confusion later.
- **Verify after transferring** (the docs do not settle these): that the Cloudflare Pages GitHub connection still
  builds, and that the Keystatic GitHub App (client id `Iv23li…`) is installed on the organization.

## Editing access

- Keystatic requires **write access to the repository** — there is no content-only permission. An editor can push
  anything, not just content. On a personal account there is no finer role than write.
- **Saving in Keystatic commits straight to `main`**, which deploys to production in about 90 seconds. There is no
  review step, and there never has been: the repo has no pull requests at all. Verified in the admin UI on
  2026-09-01 — the editor shows a single Save button while the branch selector reads `main`.
- A branch workflow exists (the "New branch…" button on the dashboard) but it is opt-in per session, not enforced.
- ⚠ **Do not enable "require a pull request" branch protection on `main`** unless everyone switches to the branch
  workflow first: it would break Save for every editor, including the repo owner.
- Tell new editors one thing: check that the branch selector says `main` before editing. Work saved on some other
  branch never reaches the site.

## Summit Phases

- A summit's `phase` (Planning / Preview / Live / Archived) is **deliberately manual**, set per entry in Keystatic
  (the field is labelled "Phase (Editor Only)"). Nothing derives it from `startDate`/`endDate`, and that is intended:
  the summit should not flip into an announcement mode while venue, dates and programme are still undecided. Do not
  "fix" this by automating it.
- `src/content/summit/info.yaml` picks the featured summit and can force a phase (`overridePhase`).
- ⚠ Known gaps, in case they look like bugs: on the homepage the Planning and Archived branches render identical markup,
  so switching between those two changes nothing; and the three `topMessage*` fields never reach the page, because
  Keystatic stores them as `.mdoc` files under `src/content/summit/info/` while the Astro `summit` collection is
  `type: 'data'` and only reads `info.yaml`. Only `Preview` and `Live` currently produce a distinct homepage.

## Git Workflow
- Before starting any repository edits, check `git status`.
- If the local branch is behind or the remote may have changed, run `git pull --rebase` before making edits.
- Do not start editing shared files such as `AGENTS.md` until the local branch is synchronized with the remote.
- **This repo has a GitHub remote and pushing to `main` is the deploy.** Cloudflare Pages auto-deploys every push to
  `main`, so a push is a production release — commit and push only when the user asks. This is the explicit exception to
  the lab-wide "local commits only, never push" default, which applies to remote-less repos synced via Dropbox.
- The `origin` remote is an HTTPS URL but the keychain holds no GitHub credential; pushes go over SSH
  (`git push git@github.com:shoichisakaguchi/website.git main`). Keystatic's production GitHub mode is unrelated to this.
- Content edited through Keystatic in production commits straight to GitHub, so the local clone can fall behind without
  anyone touching it. Always pull before editing content.

## Rules, Skills, Subagents
- **Rules:** `.claude/rules/` (absolute constraints and invariants)
- **Skills:** `.claude/skills/<name>/SKILL.md`, each with `name` + `description` frontmatter so Claude Code actually
  loads them. Current set: `dev-commands`, `add-content-keystatic`, `add-summit`, `change-featured-summit`,
  `test-contact-form`. A bare `.claude/skills/*.md` file is **not** a skill — it is just a note nothing will invoke.
- **Subagents:** `.claude/subagents/` (heavy/automated workflows; add as needed — currently empty)

## Priority
AGENTS.md -> Rules -> Skills -> User request. If there is a conflict, ask.
