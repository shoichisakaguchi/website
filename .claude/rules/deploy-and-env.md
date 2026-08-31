# Deployment and Environment

- Build output directory is `dist/`.
- Cloudflare Pages uses `compatibility_flags = ["nodejs_compat"]`.
- Required environment variables:
  - `KEYSTATIC_GITHUB_CLIENT_ID`
  - `KEYSTATIC_GITHUB_CLIENT_SECRET`
  - `KEYSTATIC_SECRET`
- There is no email provider. The site has no server-side contact form; community
  intake goes through the Google Form linked from the header. `public/_redirects`
  sends the retired `/contact` URL there.
