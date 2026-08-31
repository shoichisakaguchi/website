---
name: add-content-keystatic
description: Add or edit rdrp.io content (people, announcements, journal-club entries, summits) through the Keystatic CMS rather than by hand-editing files. Use when asked to add a person, post an announcement, add a journal club entry, or otherwise change site content.
---

# Add content via Keystatic

1. `npm run dev`
2. Open http://localhost:4321/keystatic
3. Create or edit the entry in the visual editor. In local mode this writes directly into `src/content/`.
4. Review the resulting file diff with `git diff` — Keystatic writes YAML/Markdoc, and the schema in
   `src/content/config.ts` is the source of truth for what is valid.
5. Commit. Push only when asked: pushing `main` deploys to production.

Notes:

- Production Keystatic runs in GitHub mode and commits straight to `shoichisakaguchi/website`, so pull before editing.
- People images belong in `src/assets/images/people/` (never `public/images/people/`). See `.claude/rules/content-assets.md`.
- Journal Club filenames are auto-prefixed with `YYYY-MM-DD-` by the pre-commit hook; a CI job checks the same thing.
