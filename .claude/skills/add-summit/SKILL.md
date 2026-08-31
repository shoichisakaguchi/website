---
name: add-summit
description: Add a new RdRp Summit to rdrp.io — create the summits entry, place hero and speaker images in the right directories, attach organizers, set the phase, and optionally feature it on the homepage. Use when asked to add, set up, or publish a new summit.
---

# Add a new summit

1. Create the entry in Keystatic (`summits` collection) — `npm run dev`, then http://localhost:4321/keystatic
2. Place images in the directories the rules require (`.claude/rules/content-assets.md`):
   - hero: `public/images/summits/hero/{summit-slug}/`
   - speakers: `public/images/speakers/{summit-slug}/speakers/`
   - sponsor logos: `public/images/summits/sponsors/`
3. Attach organizers from the `people` collection; role and affiliation can be overridden per summit.
4. Set the summit phase (Planning -> Live -> Archived) — the homepage renders differently per phase.
5. To feature it on the homepage, update the `summit` singleton (see the `change-featured-summit` skill).
6. Verify with `npm run dev`, then commit. Push only when asked.
