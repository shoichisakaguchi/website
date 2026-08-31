---
name: change-featured-summit
description: Change which summit rdrp.io's homepage features, or override the phase the homepage displays. Use when asked to feature a different summit, switch the homepage to another event, or force the homepage into a specific phase.
---

# Change the homepage featured summit

The homepage is phase-driven: the `summit` singleton points at a featured summit, and that summit's phase decides
what the homepage renders.

1. Open the `summit` singleton in Keystatic (`npm run dev` -> http://localhost:4321/keystatic).
2. Update the `featuredSummit` relationship to the summit you want.
3. Optionally set an override phase if the homepage should display a phase different from the summit's own.
4. Check the homepage in `npm run dev`, then commit. Push only when asked — it deploys.
