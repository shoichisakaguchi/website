---
name: dev-commands
description: Run rdrp.io locally — install deps, start the Astro dev server, open the Keystatic admin UI, build for production, and preview the build. Use when asked to run, start, serve, build, or preview this site, or when you need the Keystatic editor on localhost.
---

# Local development and build

```sh
npm install
npm run hooks:install   # once per clone: enables .githooks (journal-club slug dates)
npm run dev             # http://localhost:4321
```

- Keystatic admin: http://localhost:4321/keystatic (local mode — writes straight into `src/content/`).
- Production build: `npm run build` (`KEYSTATIC=true astro build` then `pagefind --site dist`; output in `dist/`).
- Preview the built site: `npm run preview`.

Journal Club timing helpers (no side effects):

```sh
npm run journal-club:rebuild:list    # every event's UTC start/end and status
npm run journal-club:rebuild:check   # dry-run of the next scheduled rebuild decision
```

Do not push to `main` unless asked — a push to `main` is the production deploy.
