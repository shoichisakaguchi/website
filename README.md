# rdrp.io website

Website for the RdRp Summit community.

## Stack
- Astro 5 (SSR)
- React 19
- Keystatic CMS
- Markdoc
- Pagefind
- Cloudflare Pages

## Development
```sh
npm install
npm run dev
```

Keystatic admin: http://localhost:4321/keystatic

## Build and Preview
```sh
npm run build
npm run preview
```

## Content and CMS
- Content lives in `src/content/` (Keystatic local mode).
- Homepage is phase-driven via the `summit` singleton and featured summit.
- Search indexing runs after build: `pagefind --site dist`.

## Images
- People images: `src/assets/images/people/`
- Summit heroes: `public/images/summits/hero/{slug}/`
- Speaker images: `public/images/speakers/{summit-slug}/speakers/`
- Sponsor logos: `public/images/summits/sponsors/`

## Deployment
Cloudflare Pages with `nodejs_compat`.

Required environment variables:
- `RESEND_API_KEY`
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`

Optional:
- `CONTACT_EMAIL` (defaults to `rdrp.summit@gmail.com`)

## LLM Guidance
- Project map: `AGENTS.md` (CLAUDE.md is a symlink)
- Rules: `.claude/rules/`
- Skills: `.claude/skills/`
- Subagents: `.claude/subagents/`
