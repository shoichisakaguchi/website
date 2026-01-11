// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: import.meta.env.DEV
        ? {
            kind: 'local',
        }
        : {
            kind: 'github',
            repo: 'shoichisakaguchi/website',
        },
    collections: {

        announcements: collection({
            label: 'Announcements',
            slugField: 'title',
            path: 'src/content/announcements/*',
            format: { contentField: 'content' },
            previewUrl: '/announcements/{slug}',
            entryLabel: (entry) => entry.title,
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                publishedDate: fields.date({ label: 'Published Date', validation: { isRequired: true } }),
                eventDate: fields.date({ label: 'Event Date' }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'News', value: 'News' },
                        { label: 'Event', value: 'Event' },
                        { label: 'Journal Club', value: 'Journal Club' },
                        { label: 'Community', value: 'Community' },
                    ],
                    defaultValue: 'News',
                }),
                isPinned: fields.checkbox({ label: 'Pin to top', defaultValue: false }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
        people: collection({
            label: 'People',
            slugField: 'entryId',
            path: 'src/content/people/*',
            entryLabel: (entry) => entry.name,
            schema: {
                entryId: fields.slug({ name: { label: 'Entry ID' } }),
                name: fields.text({ label: 'Name', validation: { isRequired: true } }),
                edition: fields.select({
                    label: 'Edition',
                    options: [
                        { label: '2025 Lisbon', value: '2025 Lisbon' },
                        { label: '2023 Valencia', value: '2023 Valencia' },
                        { label: '2027 Germany', value: '2027 Germany' },
                    ],
                    defaultValue: '2025 Lisbon',
                }),
                role: fields.text({ label: 'Role', validation: { isRequired: true } }),
                affiliation: fields.text({ label: 'Affiliation', validation: { isRequired: true } }),
                image: fields.image({
                    label: 'Image',
                    directory: 'src/assets/images/people',
                    publicPath: '/src/assets/images/people',
                    validation: { isRequired: false },
                }),
                customImage: fields.image({
                    label: 'Custom Image',
                    directory: 'src/assets/images/people',
                    publicPath: '/src/assets/images/people',
                    validation: { isRequired: false },
                }),
                githubId: fields.text({ label: 'GitHub ID' }),
                blueskyId: fields.text({ label: 'Bluesky ID' }),
                xId: fields.text({ label: 'X ID' }),
                websiteUrl: fields.url({ label: 'Website URL' }),
                link: fields.url({ label: 'Social/Web Link' }),
            },
        }),
        journalClub: collection({
            label: 'Journal Club',
            slugField: 'title',
            path: 'src/content/journal-club/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Paper Title/Topic' } }),
                date: fields.date({ label: 'Date', validation: { isRequired: true } }),
                isPinned: fields.checkbox({ label: 'Pin to top', defaultValue: false }),
                speaker: fields.text({ label: 'Speaker' }),
                paperUrl: fields.url({ label: 'Paper URL' }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
        summits: collection({
            label: 'Summits',
            slugField: 'title',
            path: 'src/content/summits/*',
            format: { contentField: 'summary' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                phase: fields.select({
                    label: 'Phase',
                    options: [
                        { label: 'Planning', value: 'Planning' },
                        { label: 'Live', value: 'Live' },
                        { label: 'Archived', value: 'Archived' },
                    ],
                    defaultValue: 'Planning',
                }),
                year: fields.text({ label: 'Year' }),
                startDate: fields.date({ label: 'Start Date' }),
                endDate: fields.date({ label: 'End Date' }),
                location: fields.text({ label: 'Location (City, Country)' }),
                venue: fields.text({ label: 'Venue (Facility Name)' }),
                organizers: fields.array(
                    fields.object({
                        person: fields.relationship({
                            label: 'Person',
                            collection: 'people',
                            validation: { isRequired: true }
                        }),
                        role: fields.text({ label: 'Role' }),
                        section: fields.text({ label: 'Team / Section' }),
                    }),
                    {
                        label: 'Organizers',
                        itemLabel: (props) => props.fields.person.value || 'Organizer',
                    }
                ),
                links: fields.object({
                    registration: fields.url({ label: 'Registration URL' }),
                    callForPapers: fields.url({ label: 'Call for Papers URL' }),
                    slack: fields.url({ label: 'Slack Invite URL' }),
                    googleCalendar: fields.url({ label: 'Google Calendar URL' }),
                }, { label: 'Key Links' }),
                keynotes: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name' }),
                        affiliation: fields.text({ label: 'Affiliation' }),
                        url: fields.url({ label: 'Website URL' }),
                        image: fields.image({
                            label: 'Image',
                            directory: 'public/images/keynotes',
                            publicPath: '/images/keynotes',
                        }),
                    }),
                    {
                        label: 'Keynote Speakers',
                        itemLabel: (props) => props.fields.name.value,
                    }
                ),
                summary: fields.document({
                    label: 'Summary / Description',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
    },
    singletons: {
        summit: singleton({
            label: 'Summit Info',
            path: 'src/content/summit/info',
            schema: {
                featuredSummit: fields.relationship({
                    label: 'Featured Summit',
                    collection: 'summits',
                    validation: { isRequired: true }
                }),
                overridePhase: fields.select({
                    label: 'Override Phase',
                    description: 'Force a specific phase display on the homepage. "Auto" uses the Summit\'s actual phase.',
                    options: [
                        { label: 'Auto (Use Summit Phase)', value: 'Auto' },
                        { label: 'Force Planning', value: 'Planning' },
                        { label: 'Force Live', value: 'Live' },
                        { label: 'Force Archived', value: 'Archived' },
                    ],
                    defaultValue: 'Auto',
                }),
                topMessagePlanning: fields.document({
                    label: 'Planning Message',
                    description: 'Shown when in Planning phase',
                    formatting: true,
                    links: true,
                }),
                topMessageLive: fields.document({
                    label: 'Live Message',
                    description: 'Shown when in Live phase',
                    formatting: true,
                    links: true,
                }),
                topMessageArchived: fields.document({
                    label: 'Archived Message',
                    description: 'Shown when in Archived phase',
                    formatting: true,
                    links: true,
                }),
            },
        }),
    },
});
