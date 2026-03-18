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
- After each `journal-club` session ends, make a same-day commit and push so Cloudflare Pages deploys the latest site state.
- If there are post-event updates such as slides, recording links, or status text, include them in that commit.
- If no content changes are needed, still create an empty commit to record the post-event check and trigger deployment.
- Suggested commit message: `chore: post-journal-club sync YYYY-MM-DD`

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
