import { defineCollection, z } from 'astro:content';



const announcements = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(), // Handles date strings from YAML
        category: z.enum(['update', 'event', 'general']).optional().default('update'),
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
        isPinned: z.boolean().default(false),
        speaker: z.string().optional(),
        paperUrl: z.string().optional(), // Relaxed from .url() to allow partial input or placeholder
    }),
});

const summits = defineCollection({
    schema: z.object({
        title: z.string(),
        startDate: z.coerce.date().optional(),
        year: z.string().optional(),
        organizer: z.string().optional(), // Stores the slug of the related person
    }),
});

const summit = defineCollection({
    type: 'data',
    schema: z.object({
        year: z.string().optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        venue: z.string().optional(),
        fee: z.string().optional(),
        registrationUrl: z.string().url().optional(),
        callForPapersUrl: z.string().url().optional(),
        keynotes: z.array(z.object({
            name: z.string(),
            affiliation: z.string().optional(),
            image: z.string().optional(),
        })).optional(),
    }),
});

export const collections = {
    announcements,
    people,
    'journal-club': journalClub,
    summits,
    summit,
};
