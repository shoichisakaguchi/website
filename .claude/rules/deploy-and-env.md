# Deployment and Environment

- Build output directory is `dist/`.
- Cloudflare Pages uses `compatibility_flags = ["nodejs_compat"]`.
- Required environment variables:
  - `RESEND_API_KEY`
  - `KEYSTATIC_GITHUB_CLIENT_ID`
  - `KEYSTATIC_GITHUB_CLIENT_SECRET`
  - `KEYSTATIC_SECRET`
- Optional environment variable:
  - `CONTACT_EMAIL` (defaults to `shoichi.sakaguchi@gmail.com`)
