import { defineCollection, z } from 'astro:content';



const announcements = defineCollection({
    schema: z.object({
        title: z.string(),
        publishedDate: z.coerce.date(),
        eventDate: z.coerce.date().optional(),
        category: z.enum(['News', 'Event', 'Journal Club', 'Community']).optional().default('News'),
        isPinned: z.boolean().default(false),
    }),
});

const people = defineCollection({
    type: 'data',
    schema: ({ image }) =>
        z.object({
            entryId: z.string(),
            name: z.string(),
            edition: z.string(),
            role: z.string(),
            affiliation: z.string(),
            image: image().optional(),
            customImage: image().optional(),
            githubId: z.string().optional().or(z.literal('')),
            blueskyId: z.string().optional().or(z.literal('')),
            xId: z.string().optional().or(z.literal('')),
            websiteUrl: z.string().url().optional().or(z.literal('')),
            link: z.string().url().optional().or(z.literal('')),
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
        phase: z.enum(['Planning', 'Live', 'Archived']).optional().default('Planning'),
        year: z.string().optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        location: z.string().optional(),
        venue: z.string().optional(),
        organizers: z.array(z.object({
            person: z.string(),
            role: z.string().optional(),
            section: z.string().optional(),
        })).optional(),
        links: z.object({
            registration: z.string().url().optional().or(z.literal('')),
            callForPapers: z.string().url().optional().or(z.literal('')),
            slack: z.string().url().optional().or(z.literal('')),
            googleCalendar: z.string().url().optional().or(z.literal('')),
        }).optional(),
        keynotes: z.array(z.object({
            name: z.string(),
            affiliation: z.string().optional(),
            url: z.string().url().optional().or(z.literal('')),
            image: z.string().optional(),
        })).optional(),
    }),
});

const summit = defineCollection({
    type: 'data',
    schema: z.object({
        featuredSummit: z.string().optional(),
        overridePhase: z.enum(['Auto', 'Planning', 'Live', 'Archived']).optional().default('Auto'),
        topMessagePlanning: z.any().optional(),
        topMessageLive: z.any().optional(),
        topMessageArchived: z.any().optional(),
    }),
});

export const collections = {
    announcements,
    people,
    'journal-club': journalClub,
    summits,
    summit,
};
