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
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                date: fields.date({ label: 'Date', validation: { isRequired: true } }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'Update', value: 'update' },
                        { label: 'Event', value: 'event' },
                        { label: 'Genera', value: 'general' },
                    ],
                    defaultValue: 'update',
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
            slugField: 'name',
            path: 'src/content/people/*',
            schema: {
                name: fields.slug({ name: { label: 'Name' } }),
                affiliation: fields.text({ label: 'Affiliation' }),
                photo: fields.image({
                    label: 'Photo',
                    directory: 'public/images/people',
                    publicPath: '/images/people',
                }),
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
                startDate: fields.date({ label: 'Start Date' }),
                year: fields.text({ label: 'Year' }),
                organizer: fields.relationship({
                    label: 'Organizer',
                    collection: 'people',
                }),
                summary: fields.document({
                    label: 'Summary',
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
                year: fields.text({ label: 'Year (e.g. 2027)' }), // Displayed if dates are missing, or as title suffix
                startDate: fields.date({ label: 'Start Date' }),
                endDate: fields.date({ label: 'End Date' }),
                venue: fields.text({ label: 'Venue' }),
                fee: fields.text({ label: 'Registration Fee' }),
                registrationUrl: fields.url({ label: 'Registration URL' }),
                callForPapersUrl: fields.url({ label: 'Call for Papers URL' }),
                keynotes: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name' }),
                        affiliation: fields.text({ label: 'Affiliation' }),
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
            },
        }),
    },
});
