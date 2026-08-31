// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import markdoc from '@astrojs/markdoc';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    // Only include Keystatic in dev (or when explicitly enabled) to avoid bundling its admin UI.
    integrations: [
        react(),
        ...(process.env.KEYSTATIC === 'true' || process.env.NODE_ENV !== 'production'
            ? [keystatic()]
            : []),
        markdoc(),
        sitemap({
            // Keep the Keystatic admin UI and the retired /contact URL out of
            // the sitemap. /contact is a 301 to the Google Form.
            filter: (page) => !page.includes('/keystatic') && !page.includes('/contact'),
        })
    ],
    imageService: 'compile',
    output: 'server',
    adapter: cloudflare(),
    site: 'https://rdrp.io'
});
