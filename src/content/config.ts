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

const announcements = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(), // Handles date strings from YAML
        isPinned: z.boolean().default(false),
    }),
});

const people = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        affiliation: z.string().optional(),
        photo: z.string().optional(),
    }),
});

const journalClub = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        speaker: z.string().optional(),
        paperUrl: z.string().optional(), // Relaxed from .url() to allow partial input or placeholder
    }),
});

const summits = defineCollection({
    schema: z.object({
        title: z.string(),
        year: z.string().optional(),
        organizer: z.string().optional(), // Stores the slug of the related person
    }),
});

export const collections = {
    posts,
    announcements,
    people,
    'journal-club': journalClub,
    summits
};
