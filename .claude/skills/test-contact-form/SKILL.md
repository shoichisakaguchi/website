---
name: test-contact-form
description: Test or debug the rdrp.io contact form and its Resend email delivery locally. Use when the contact form is failing, emails are not arriving, or a change to src/pages/api/contact.ts needs verifying.
---

# Test the contact form locally

The endpoint is `src/pages/api/contact.ts`. It reads env from Cloudflare `locals.runtime.env` in production and
`import.meta.env` in dev.

1. Put `RESEND_API_KEY` in `.env` (never commit `.env` — see `.claude/rules/repo-safety.md`).
2. `npm run dev`
3. Submit the form at http://localhost:4321/contact
4. Confirm delivery in the Resend dashboard.

`CONTACT_EMAIL` is optional and defaults to `shoichi.sakaguchi@gmail.com`.
If nothing arrives, check the dev server console first — a missing key fails at the endpoint, not in the browser.
