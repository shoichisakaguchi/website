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
        sitemap()
    ],
    output: 'server',
    adapter: cloudflare(),
    site: 'https://rdrp.io'
});
