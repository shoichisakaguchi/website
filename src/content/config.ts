import { defineCollection, z } from 'astro:content';



const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        type: z.enum(['announcement', 'post', 'event']).optional().default('post'),
        publishedDate: z.coerce.date(),
        author: z.string().optional(),
        credits: z.array(z.object({
            role: z.enum(['author', 'summary', 'editor', 'translator', 'curator']).default('author'),
            name: z.string(),
        })).optional(),
        excerpt: z.string().optional(),
        ogImage: z.string().optional().or(z.literal('')),
        ogImageAlt: z.string().optional().or(z.literal('')),
        tags: z.array(z.string()).optional(),
        discussionUrl: z.string().url().optional().or(z.literal('')),
        discussionLabel: z.string().optional(),
    }),
});

const people = defineCollection({
    type: 'data',
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            affiliation: z.string(),
            country: z.string().optional().or(z.literal('')),
            image: image().optional(),
            blueskyId: z.string().optional().or(z.literal('')),
            xId: z.string().optional().or(z.literal('')),
            websiteUrl: z.string().url().optional().or(z.literal('')),
            orcid: z.string().optional().or(z.literal('')),
            linkedin: z.string().url().optional().or(z.literal('')),
            github: z.string().optional().or(z.literal('')),
        }),
});

const journalClub = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        publishedDate: z.coerce.date().optional(),
        isPinned: z.boolean().default(false),
        // New structured speaker fields
        speakerName: z.string().optional(),
        speakerAffiliation: z.string().optional(),
        speaker_image: z.string().optional().or(z.literal('')),
        ogImage: z.string().optional().or(z.literal('')),
        ogImageAlt: z.string().optional().or(z.literal('')),
        chairs: z.array(z.object({
            id: z.string().optional().or(z.literal('')),
            name: z.string(),
            affiliation: z.string(),
        })).optional(),
        // User-friendly time input fields
        localDate: z.coerce.date().optional(),
        localTime: z.string().optional().or(z.literal('')),
        eventTz: z.string().optional().default('Asia/Tokyo'),
        // How long the event lasts. Controls the homepage "Live Now" window and
        // when the entry moves from upcoming/live to past. Also read by the
        // scheduled rebuild trigger so both compute the same end time.
        durationMinutes: z.number().optional().default(60),
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
        ogImage: z.string().optional().or(z.literal('')),
        ogImageAlt: z.string().optional().or(z.literal('')),
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
        registrationFees: z.string().optional(),
    }),
});

const summit = defineCollection({
    type: 'data',
    schema: z.object({
        featuredSummit: z.string().optional(),
        overridePhase: z.enum(['Auto', 'Planning', 'Preview', 'Live', 'Archived']).optional().default('Auto'),
        topMessagePlanning: z.string().optional().or(z.literal('')),
        topMessageLive: z.string().optional().or(z.literal('')),
        topMessageArchived: z.string().optional().or(z.literal('')),
    }),
});

export const collections = {
    posts,
    people,
    'journal-club': journalClub,
    summits,
    summit,
};
