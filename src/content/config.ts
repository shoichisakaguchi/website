import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    // Keystatic creates Markdoc files by default if using 'document' field
    // or Markdown/MDX depending on configuration. 
    // Based on your previous file open 'hello-world.mdoc', it seems to be Markdoc or default.
    // We'll treat it as standard collection for now, but integration might need @astrojs/markdoc if .mdoc is used.
    // Let's assume standard schema based on keystatic config.
    schema: z.object({
        title: z.string(),
    }),
});

export const collections = { posts };
