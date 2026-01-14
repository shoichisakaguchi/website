# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Note:** This file is tracked in git. Do not include private information, secrets, API keys, or personal data.

## Project Overview

This is **rdrp.io** - a website for the RNA-dependent RNA Polymerase (RdRp) Summit community. It's built with **Astro 5** and deployed to **Cloudflare Pages** with server-side rendering (SSR).

**Key Technologies:**
- Astro 5.16+ (SSR mode, not static)
- Cloudflare Pages adapter with `nodejs_compat` flag
- Keystatic CMS (Git-based, GitHub backend in production, local in dev)
- Pagefind for static search indexing
- Resend API for contact form emails
- React 19 for interactive components
- Markdoc for rich content formatting

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:4321)
npm run dev

# Access Keystatic CMS admin dashboard
# Navigate to: http://localhost:4321/keystatic

# Build for production (includes Pagefind search index generation)
npm run build

# Preview production build locally
npm run preview
```

## Architecture & Content Model

### Content Collections Architecture

The site uses a **phase-driven architecture** where content displays differently based on summit lifecycle:

1. **`summit` singleton** (`src/content/summit/info/`) - Controls homepage behavior
   - References a `featuredSummit` from the summits collection
   - Can override phase display (`Auto`, `Planning`, `Live`, `Archived`)
   - Contains phase-specific messages (Planning/Live/Archived)

2. **`summits` collection** - Archive of all RdRp summits
   - Each has intrinsic `phase` field (Planning/Live/Archived)
   - Rich nested structure: organizers, speakers, sponsors, travel grants, program archive
   - Organizers link to `people` collection via relationships

3. **`people` collection** - Team members/organizers (YAML format)
   - Images stored in `src/assets/images/people/`
   - Referenced by summits via relationships
   - Supports social links (Bluesky, X/Twitter, website)

4. **`announcements` collection** - News and events (Markdoc)
   - Supports pinning, categories, event dates
   - Homepage shows latest 3

5. **`journal-club` collection** - Bi-weekly discussion meetings (Markdoc)
   - Homepage automatically finds next upcoming meeting

### Key Rendering Patterns

**Homepage (`src/pages/index.astro`):**
- Fetches `summit` singleton to determine featured summit
- Resolves phase (can be overridden or auto-detected)
- Dynamically shows different content based on phase:
  - **Planning**: Placeholder message, join Slack CTA
  - **Live**: Dates, venue, registration link, organizing team with photos
  - **Archived**: Past event notice, link to summit archive
- Shows next upcoming journal club meeting with "Add to Calendar" link
- Displays latest announcements

**Content Resolution Flow:**
```javascript
summit singleton → featuredSummit (slug) → summits collection entry
                 → overridePhase or summit.phase
                 → phase-specific topMessage (DocumentRenderer)
                 → organizers array → people collection (relationships)
```

**Important**: Organizers are resolved by fetching person entries from the `people` collection, then merging role/affiliation overrides from summit data.

### Image Storage Conventions

**Active directories:**
- `src/assets/images/people/` - Organizer profile images (used by people collection)
- `public/images/speakers/{summit-slug}/speakers/` - Speaker headshots (embedded in summit content)
- `public/images/summits/hero/{summit-slug}/` - Summit hero images
- `public/images/summits/sponsors/` - Sponsor logos (if configured in Keystatic)

**Keystatic Configuration:**
- People images: `directory: 'src/assets/images/people'`
- Speaker images: `directory: 'public/images/speakers'`
- Summit hero: `directory: 'public/images/summits/hero'`

### API Endpoints

**Contact Form (`src/pages/api/contact.ts`):**
- Server-side endpoint (`prerender = false`)
- Uses Resend API for email delivery
- Environment variables required:
  - `RESEND_API_KEY` (required)
  - `CONTACT_EMAIL` (optional, defaults to shoichi.sakaguchi@gmail.com)
- Accesses Cloudflare env via `locals.runtime.env` or `import.meta.env` in dev

### Keystatic CMS Integration

**Access URL:** `http://localhost:4321/keystatic` (dev) or `/keystatic` (production)

**Storage Modes:**
- Local development: `kind: 'local'` (files in `src/content/`)
- Production: `kind: 'github'`, repo: `shoichisakaguchi/website`

**Important Collections:**
- Announcements, People, Journal Club, Summits use full CMS editing
- Summit singleton controls homepage featured summit

**Image Upload Behavior:**
- Images uploaded via Keystatic are stored according to `directory` config
- Never put images in `public/images/people/` (obsolete location)

### Search Implementation

**Pagefind Integration:**
- Generated during build: `astro build && pagefind --site dist`
- Only indexes content wrapped in `data-pagefind-body` attribute
- Search UI loaded client-side from `/pagefind/` directory
- Search component: `src/components/Search.astro`

## Deployment to Cloudflare Pages

**Build Command:** `npm run build`
**Output Directory:** `dist/`
**Node Compatibility:** Enabled via `compatibility_flags = ["nodejs_compat"]`

**Required Environment Variables:**
- `RESEND_API_KEY` - For contact form emails
- `CONTACT_EMAIL` - Override default contact recipient (optional)
- `KEYSTATIC_GITHUB_CLIENT_ID` - For Keystatic GitHub auth
- `KEYSTATIC_GITHUB_CLIENT_SECRET` - For Keystatic GitHub auth
- `KEYSTATIC_SECRET` - For Keystatic session encryption

**Important:** Never commit `.env` file (already in `.gitignore`).

## Common Tasks

### Adding New Content via Keystatic CMS
1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:4321/keystatic`
3. Create/edit content in the visual editor
4. Changes commit directly to git (local mode) or push to GitHub (production)

### Adding a New Summit
1. Use Keystatic to create summit in `summits` collection
2. Upload hero image to `public/images/summits/hero/{slug}/`
3. Add organizers by selecting from `people` collection
4. Set phase: Planning → Live → Archived as event progresses
5. Update `summit` singleton to set as `featuredSummit` for homepage

### Changing Homepage Featured Summit
1. Edit `summit` singleton in Keystatic
2. Change `featuredSummit` relationship to desired summit slug
3. Optionally override phase display for special cases

### Testing Contact Form Locally
1. Add `RESEND_API_KEY` to `.env` file
2. Start dev server
3. Navigate to `/contact` and submit form
4. Check Resend dashboard for sent email

## Content Schema Notes

**Zod Validation (`src/content/config.ts`):**
- Many URL fields use `.url().optional().or(z.literal(''))` pattern to allow empty strings from Keystatic
- Images use Astro's `image()` helper for type safety and optimization
- Summit organizers array contains `person` (relationship), `role`, `affiliation` (override), `section`, `weight` (sort order)

**Date Handling:**
- All dates use `z.coerce.date()` for automatic parsing
- Journal club displays dates with timezone handling via Google Calendar integration
- Summit dates displayed in "Month Day, Year" format

## File Locations

**Configuration:**
- `astro.config.mjs` - Astro + integrations (React, Keystatic, Markdoc, Sitemap)
- `wrangler.toml` - Cloudflare Pages configuration
- `keystatic.config.ts` - CMS schema and storage configuration (314 lines)
- `src/content/config.ts` - Zod schemas for content collections

**Key Pages:**
- `src/pages/index.astro` - Homepage with phase-driven layout
- `src/pages/summits/[slug].astro` - Individual summit detail pages
- `src/pages/keystatic/[...path].astro` - Keystatic CMS admin UI (required)
- `src/pages/api/contact.ts` - Contact form API endpoint

**Components:**
- `src/components/Layout.astro` - Main page wrapper
- `src/components/BaseHead.astro` - SEO meta tags and OGP
- `src/components/Header.astro` - Navigation with search toggle
- `src/components/Search.astro` - Pagefind search UI
- `src/components/HomeAnnouncements.astro` - Latest announcements display

**Content:**
- `src/content/announcements/` - Announcement posts (Markdoc)
- `src/content/people/` - Organizer profiles (YAML + images)
- `src/content/journal-club/` - Journal club entries (Markdoc)
- `src/content/summits/` - Summit archives (Markdoc)
- `src/content/summit/info/` - Homepage singleton configuration

## Special Considerations

**Prerendering:**
- Homepage is prerendered (`export const prerender = true`)
- Static pages (about, contact) are prerendered
- API routes must use `export const prerender = false`
- Dynamic summit/announcement pages use `getStaticPaths()`

**Cloudflare Compatibility:**
- Uses `nodejs_compat` flag for Node.js APIs (required for Resend SDK)
- Environment variables accessed differently in dev vs. production (see contact.ts)

**Keystatic Admin Route:**
- **Managed by Integration:** The `@keystatic/astro` integration automatically injects the `/keystatic` routes.
- **Do not create manual files:** Do NOT create `src/pages/keystatic/[...path].astro`. It causes route collisions and build errors in SSR mode.

## AI Behavior Guidelines

**Update Rules on Error Resolution:**
When you encounter and resolve a non-trivial error (especially related to build, deployment, or environment), **you MUST update the "Troubleshooting & Known Issues" section below**.
- Record the error message/symptom.
- Record the solution or workaround.
- This ensures future sessions (or other AIs) avoid the same pitfall.

## Troubleshooting & Known Issues

### Cloudflare Deployment
- **Error**: YAML indentation error in `.mdoc` files (e.g. `rdrp-summit-2025.mdoc`)
  - **Solution**: Ensure strict 2-space indentation in YAML frontmatter. Do not mix tabs.
  - **Context**: Cloudflare's build environment is stricter than local dev.

- **Error**: Homepage shows only `[object Object]` on Cloudflare Pages, but works locally.
  - **Symptom**: Local development works perfectly, but production deployment displays only `[object Object]` instead of page content.
  - **Root Cause**: Homepage was SSR-rendered (no `prerender` directive) while all other pages were statically prerendered. Cloudflare Pages SSR environment has subtle differences that caused rendering errors to output as stringified objects.
  - **Solution**: Add `export const prerender = true;` to `src/pages/index.astro` to enable static prerendering at build time.
  - **Context**: All pages should be prerendered unless they explicitly need SSR functionality (e.g., API routes with dynamic data). This ensures consistent behavior across environments.

- **Error**: SSR pages (e.g., `/keystatic`) show `[object Object]` on Cloudflare Pages.
  - **Symptom**: Any SSR-rendered page displays `[object Object]` instead of content. Prerendered pages work fine.
  - **Root Cause**: The `enable_nodejs_process_v2` flag became default on 2025-09-15. Combined with `nodejs_compat`, it causes SSR rendering to fail.
  - **Solution**: Add `disable_nodejs_process_v2` to `wrangler.toml`:
    ```toml
    compatibility_flags = [ "nodejs_compat", "disable_nodejs_process_v2" ]
    ```
  - **Context**: See [withastro/astro#14511](https://github.com/withastro/astro/issues/14511). Alternative fix: update Wrangler to ≥4.42.0.

### Keystatic Integration
- **Error**: Route collision with `/keystatic/[...params]` or "Keystatic is not exported".
  - **Solution**: Delete `src/pages/keystatic/[...path].astro`. The integration handles routing automatically.
  - **Context**: Occurs in Cloudflare SSR builds with `@keystatic/astro` v5+.

- **Error**: `[object Object]` displays in Keystatic admin UI (e.g., in array item labels).
  - **Symptom**: Array items in Keystatic show `[object Object]` instead of readable labels.
  - **Root Cause**: `itemLabel` function uses a relationship field value directly in string interpolation. Relationship fields return objects (e.g., `{slug: "..."}`) not strings.
  - **Solution**: Extract the slug from the relationship object:
    ```typescript
    // Before (broken):
    const name = props.fields.person.value || 'Organizer';

    // After (fixed):
    const personValue = props.fields.person.value;
    const name = (typeof personValue === 'string'
        ? personValue
        : (personValue as { slug?: string })?.slug) || 'Organizer';
    ```
  - **Context**: Applies to any `itemLabel` that references a `fields.relationship()` field.
