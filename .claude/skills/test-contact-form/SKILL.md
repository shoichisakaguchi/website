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

## Testing the endpoint in production

**`curl` cannot exercise `POST /api/contact` on rdrp.io.** Cloudflare's bot protection answers automated clients with
`403` before the request reaches the Worker, regardless of the User-Agent or content type you set. A real browser gets
through. Measured 2026-09-01: curl returns 403 for every UA/content-type combination, while `fetch()` from a tab open
on https://rdrp.io/contact/ returns `400 {"error":"Missing required fields"}` from the handler itself.

So test from a browser console on the live origin, and omit a required field so nothing is actually emailed:

```js
const fd = new FormData();               // no name/email/message
const r = await fetch('/api/contact', { method: 'POST', body: fd });
console.log(r.status, await r.text());   // expect 400 Missing required fields
```

A `403` from curl means "Cloudflare stopped you", not "the endpoint is broken" — do not conclude the form is down.
A `429` means the `contact-form-rate-limit` WAF rule fired (3 POSTs per 10 s per IP); wait 10 seconds.

Unrelated: the site root answers `403` to a `Python-urllib` User-Agent but `200` to curl and browsers. The
session-coord board probes with urllib, so its `403` is expected and counts as up.
