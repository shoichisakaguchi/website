# Content and Assets

- Image policy:
  - `src/assets/` for Astro-managed, build-time optimized images.
  - `public/` for static, direct-served assets.
  - Keystatic-managed images must follow its configured directories.

- People images live in `src/assets/images/people/` (Keystatic-managed).
- Speaker images live in `public/images/speakers/{summit-slug}/speakers/`.
- Summit hero images live in `public/images/summits/hero/{summit-slug}/`.
- Sponsor logos live in `public/images/summits/sponsors/`.
- Never put people images in `public/images/people/` (obsolete location).
