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
- **Contact Form:** `src/pages/api/contact.ts` uses Resend and reads env from Cloudflare `locals.runtime.env` or `import.meta.env` in dev.
- **Keystatic:** Admin UI at `/keystatic` (dev: http://localhost:4321/keystatic).

## Key Locations
- **Config:** `astro.config.mjs`, `wrangler.toml`, `keystatic.config.ts`, `src/content/config.ts`
- **Pages:** `src/pages/index.astro`, `src/pages/summits/[slug].astro`, `src/pages/api/contact.ts`
- **Images:** `src/assets/images/people/`, `public/images/summits/`, `public/images/speakers/`
- **Search UI:** `src/components/Search.astro`

## Schema Notes
- URL fields often allow empty strings (`.url().optional().or(z.literal(''))`) in `src/content/config.ts`.
- Images use Astro's `image()` helper for type safety/optimization.
- Dates are parsed with `z.coerce.date()` and displayed in "Month Day, Year" format.

## Journal Club Operations
- The homepage "Next Meeting" card is prerendered, so it only reflects the build-time clock. An entry stays "Live Now"/upcoming until a rebuild runs after its end time (`start + durationMinutes`, default 60).
- **Live window / end time:** set `durationMinutes` per entry (Keystatic field). The site (`src/components/JournalClubHome.astro`) and the rebuild trigger both read it, so they always agree on when an event becomes past.
- **Automated post-event rebuild:** a scheduled job (`ops/scheduled-rebuild/`, launchd on the always-on Mac) POSTs a Cloudflare Deploy Hook shortly after each event ends — no commit, clean history. See `ops/scheduled-rebuild/README.md`.
- If there are post-event content updates (slides, recording links, status text), still commit and push them as usual; the automated rebuild only handles the "event just ended, nothing to commit" case.
- Inspect timing without side effects: `npm run journal-club:rebuild:list` (all events, UTC start/end, status) and `npm run journal-club:rebuild:check` (dry-run of the next scheduled decision).

## Git Workflow
- Before starting any repository edits, check `git status`.
- If the local branch is behind or the remote may have changed, run `git pull --rebase` before making edits.
- Do not start editing shared files such as `AGENTS.md` until the local branch is synchronized with the remote.

## Rules, Skills, Subagents
- **Rules:** `.claude/rules/` (absolute constraints and invariants)
- **Skills:** `.claude/skills/` (explicit workflows to run when requested)
- **Subagents:** `.claude/subagents/` (heavy/automated workflows; add as needed)

## Priority
AGENTS.md -> Rules -> Skills -> User request. If there is a conflict, ask.
