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
            name: z.string(),
            affiliation: z.string(),
            image: image().optional(),
            blueskyId: z.string().optional().or(z.literal('')),
            xId: z.string().optional().or(z.literal('')),
            websiteUrl: z.string().url().optional().or(z.literal('')),
        }),
});

const journalClub = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        isPinned: z.boolean().default(false),
        // New structured speaker fields
        speakerName: z.string().optional(),
        speakerAffiliation: z.string().optional(),
        // User-friendly time input fields
        localDate: z.coerce.date().optional(),
        localTime: z.string().optional().or(z.literal('')),
        eventTz: z.string().optional().default('Asia/Tokyo'),
        // Advanced/backward compatibility
        startDateTimeUtc: z.string().optional().or(z.literal('')),
        // New generalized links array
        links: z.array(z.object({
            label: z.string(),
            url: z.string().url().or(z.literal('')),
            isPrimary: z.boolean().default(false),
        })).optional(),
        // Calendar and Zoom links
        calendarUrl: z.string().url().optional().or(z.literal('')),
        zoomUrl: z.string().url().optional().or(z.literal('')),
        showZoomLink: z.boolean().default(false),
        // Legacy fields (kept for backward compatibility during migration)
        speaker: z.string().optional(),
        paperUrl: z.string().optional(),
    }),
});

const summits = defineCollection({
    schema: z.object({
        title: z.string(),
        heroImage: z.string().optional(),
        description: z.string().optional(),
        intro: z.string().optional(),
        tags: z.array(z.string()).optional(),
        phase: z.enum(['Planning', 'Preview', 'Live', 'Archived']).optional().default('Planning'),
        year: z.string().optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        location: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        venue: z.string().optional(),
        format: z.enum(['On-site', 'Hybrid', 'Online']).optional().default('On-site'),
        satelliteOf: z.object({
            name: z.string().optional(),
            url: z.string().url().optional().or(z.literal('')),
        }).optional(),
        organizers: z.array(z.object({
            person: z.string(),
            role: z.string().optional(),
            affiliation: z.string().optional(),
            section: z.string().optional(),
            weight: z.number().optional().default(50),
        })).optional(),
        links: z.object({
            registration: z.string().url().optional().or(z.literal('')),
            callForPapers: z.string().url().optional().or(z.literal('')),
            slack: z.string().url().optional().or(z.literal('')),
            googleCalendar: z.string().url().optional().or(z.literal('')),
            detailedProgram: z.string().url().optional().or(z.literal('')),
            codeOfConduct: z.string().url().optional().or(z.literal('')),
        }).optional(),
        sponsors: z.array(z.object({
            name: z.string(),
            url: z.string().url().optional().or(z.literal('')),
            logo: z.string().optional(),
            supportType: z.string().optional(),
        })).optional(),
        travelGrant: z.object({
            amount: z.string().optional(),
            currency: z.string().optional(),
            eligibility: z.string().optional(),
            applicationUrl: z.string().url().optional().or(z.literal('')),
            notes: z.string().optional(),
        }).optional(),
        programArchive: z.object({
            label: z.string().default('View Program'),
            url: z.string().optional().or(z.literal('')),
            items: z.array(z.object({
                time: z.string().optional(),
                title: z.string(),
                speakers: z.string().optional(),
                note: z.string().optional(),
                link: z.string().optional().or(z.literal('')),
            })).optional(),
        }).optional(),
        archiveResources: z.object({
            photoGalleryUrl: z.string().url().optional().or(z.literal('')),
            recordingsUrl: z.string().url().optional().or(z.literal('')),
            slidesUrl: z.string().url().optional().or(z.literal('')),
            reportUrl: z.string().url().optional().or(z.literal('')),
        }).optional(),
        communityOutcomes: z.array(z.object({
            type: z.enum(['Consensus statement', 'Dataset', 'Software', 'Report', 'Slides', 'Recording', 'Photo', 'Other']).optional().default('Report'),
            title: z.string(),
            url: z.string().url().optional().or(z.literal('')),
            doi: z.string().optional(),
            date: z.coerce.date().optional(),
            description: z.string().optional(),
        })).optional(),
        speakers: z.array(z.object({
            name: z.string(),
            affiliation: z.string().optional(),
            role: z.string().optional(),
            link: z.string().url().optional().or(z.literal('')),
            image: z.string().optional(),
        })).optional(),
    }),
});

const summit = defineCollection({
    type: 'data',
    schema: z.object({
        featuredSummit: z.string().optional(),
        overridePhase: z.enum(['Auto', 'Planning', 'Preview', 'Live', 'Archived']).optional().default('Auto'),
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
