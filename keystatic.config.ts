// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    ui: {
        brand: { name: 'rdrp.io admin' },
    },
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
            slugField: 'name',
            path: 'src/content/people/*',
            schema: {
                name: fields.slug({ name: { label: 'Name' } }),
                affiliation: fields.text({ label: 'Affiliation', validation: { isRequired: true } }),
                country: fields.text({ label: 'Country (Name & Flag)' }),
                bio: fields.document({
                    label: 'Bio',
                    formatting: true,
                    links: true,
                }),
                image: fields.image({
                    label: 'Image',
                    directory: 'src/assets/images/people',
                    publicPath: '/src/assets/images/people',
                    validation: { isRequired: false },
                }),
                blueskyId: fields.text({ label: 'Bluesky ID' }),
                xId: fields.text({ label: 'X (Twitter) ID' }),
                websiteUrl: fields.url({ label: 'Website URL' }),
            },
        }),
        journalClub: collection({
            label: 'Journal Club',
            slugField: 'title',
            path: 'src/content/journal-club/*',
            format: { contentField: 'content' },
            previewUrl: '/journal-club/{slug}',
            schema: {
                title: fields.slug({ name: { label: 'Paper Title/Topic' } }),
                date: fields.date({ label: 'Date', validation: { isRequired: true } }),
                isPinned: fields.checkbox({ label: 'Pin to top', defaultValue: false }),
                speakerName: fields.text({ label: 'Speaker Name' }),
                speakerAffiliation: fields.text({ label: 'Speaker Affiliation' }),
                // User-friendly time input fields (recommended)
                localDate: fields.date({
                    label: 'Local Date',
                    description: 'Event date in the event\'s local timezone.'
                }),
                localTime: fields.text({
                    label: 'Local Time',
                    description: 'HH:mm (e.g. 22:00). Use 24-hour format.',
                    validation: {
                        match: {
                            pattern: '^([01]\\d|2[0-3]):[0-5]\\d$',
                            message: 'Please use 24-hour time format HH:mm (e.g. 22:00)',
                        },
                    },
                }),
                eventTz: fields.select({
                    label: 'Event Timezone (IANA)',
                    description: 'Timezone where the event is primarily coordinated (DST-aware). The site will convert Local Date/Time + Timezone into UTC for sorting/upcoming logic.',
                    options: [
                        { label: 'Asia/Tokyo (Japan)', value: 'Asia/Tokyo' },
                        { label: 'America/Toronto (Eastern Time)', value: 'America/Toronto' },
                        { label: 'America/Santiago (Chile)', value: 'America/Santiago' },
                        { label: 'Europe/Paris (Central European)', value: 'Europe/Paris' },
                        { label: 'Europe/Vilnius (Eastern European)', value: 'Europe/Vilnius' },
                        { label: 'Australia/Sydney (Australian Eastern)', value: 'Australia/Sydney' },
                        { label: 'UTC', value: 'UTC' },
                    ],
                    defaultValue: 'Asia/Tokyo',
                }),
                // Advanced field (backward compatibility)
                startDateTimeUtc: fields.text({
                    label: 'Start Date/Time (UTC) — auto',
                    description: '⚠️ Prefer Local Date/Time + Timezone above. Only edit this if you know what you\'re doing. ISO 8601 like 2026-01-15T13:00:00Z.',
                }),
                links: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Label', validation: { isRequired: true } }),
                        url: fields.url({ label: 'URL', validation: { isRequired: true } }),
                        isPrimary: fields.checkbox({ label: 'Primary Link', defaultValue: false }),
                    }),
                    {
                        label: 'Links',
                        itemLabel: (props) => props.fields.label.value || 'Link',
                    }
                ),
                calendarUrl: fields.url({ label: 'Google Calendar URL' }),
                zoomUrl: fields.url({ label: 'Zoom URL' }),
                showZoomLink: fields.checkbox({ label: 'Show Zoom Link', defaultValue: false }),
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
            previewUrl: '/summits/{slug}',
            schema: {
                // ─────────────────────────────────────────────────────────────
                // 1. Hero / Title / Meta
                // ─────────────────────────────────────────────────────────────
                title: fields.slug({ name: { label: 'Title' } }),
                year: fields.text({ label: 'Year' }),
                heroImage: fields.image({
                    label: 'Hero Image',
                    directory: 'public/images/summits/hero',
                    publicPath: '/images/summits/hero',
                }),
                description: fields.text({ label: 'Description (OGP/Card)', multiline: true }),
                phase: fields.select({
                    label: 'Phase (Editor Only)',
                    description: 'Controls which sections are shown and how the page behaves.',
                    options: [
                        { label: 'Planning', value: 'Planning' },
                        { label: 'Preview', value: 'Preview' },
                        { label: 'Live', value: 'Live' },
                        { label: 'Archived', value: 'Archived' },
                    ],
                    defaultValue: 'Planning',
                }),
                tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags (Editor Only)' }),
                startDate: fields.date({ label: 'Start Date' }),
                endDate: fields.date({ label: 'End Date' }),
                satelliteOf: fields.object({
                    name: fields.text({ label: 'Parent Event Name' }),
                    url: fields.url({ label: 'Parent Event URL' }),
                }, { label: 'Satellite Event Of' }),

                // ─────────────────────────────────────────────────────────────
                // 2. Intro (What is this?)
                // ─────────────────────────────────────────────────────────────
                intro: fields.text({
                    label: 'Intro / Context',
                    description: 'A brief introduction or teaser text (top of page).',
                    multiline: true,
                }),

                // ─────────────────────────────────────────────────────────────
                // 3. Venue (+ map)
                // ─────────────────────────────────────────────────────────────
                location: fields.text({ label: 'Location Display String' }),
                venue: fields.text({ label: 'Venue (Facility Name)' }),
                city: fields.text({ label: 'City' }),
                country: fields.text({ label: 'Country' }),
                format: fields.select({
                    label: 'Format',
                    options: [
                        { label: 'On-site', value: 'On-site' },
                        { label: 'Hybrid', value: 'Hybrid' },
                        { label: 'Online', value: 'Online' },
                    ],
                    defaultValue: 'On-site',
                }),

                // ─────────────────────────────────────────────────────────────
                // 4. Featured Speakers
                // ─────────────────────────────────────────────────────────────
                speakers: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name' }),
                        affiliation: fields.text({ label: 'Affiliation' }),
                        role: fields.text({ label: 'Role / Title' }),
                        link: fields.url({ label: 'Link (Personal Page)' }),
                        image: fields.image({
                            label: 'Headshot',
                            directory: 'public/images/speakers',
                            publicPath: '/images/speakers',
                        }),
                    }),
                    {
                        label: 'Featured Invited Speakers',
                        itemLabel: (props) => props.fields.name.value,
                    }
                ),

                // ─────────────────────────────────────────────────────────────
                // 5. Program
                // ─────────────────────────────────────────────────────────────
                programArchive: fields.object({
                    label: fields.text({ label: 'Button Label', defaultValue: 'View Program' }),
                    url: fields.file({
                        label: 'Program File (PDF)',
                        directory: 'public/files/summits',
                        publicPath: '/files/summits',
                    }),
                    items: fields.array(
                        fields.object({
                            time: fields.text({ label: 'Time' }),
                            title: fields.text({ label: 'Title', validation: { isRequired: true } }),
                            speakers: fields.text({ label: 'Speakers (Comma separated)' }),
                            note: fields.text({ label: 'Note' }),
                            link: fields.text({ label: 'Link' }),
                        }),
                        {
                            label: 'Program Items',
                            itemLabel: (props) => `${props.fields.time.value || ''} ${props.fields.title.value}`,
                        }
                    ),
                }, { label: 'Program (Archive)' }),
                archiveResources: fields.object({
                    photoGalleryUrl: fields.url({ label: 'Photo Gallery URL' }),
                    recordingsUrl: fields.url({ label: 'Recordings URL' }),
                    slidesUrl: fields.url({ label: 'Slides URL' }),
                    reportUrl: fields.url({ label: 'Report URL' }),
                }, { label: 'Archive Resources' }),
                links: fields.object({
                    detailedProgram: fields.url({ label: 'Detailed Program URL' }),
                    registration: fields.url({ label: 'Registration URL' }),
                    callForPapers: fields.url({ label: 'Call for Papers URL' }),
                    slack: fields.url({ label: 'Slack Invite URL' }),
                    googleCalendar: fields.url({ label: 'Google Calendar URL' }),
                    codeOfConduct: fields.url({ label: 'Code of Conduct URL' }),
                }, { label: 'Key Links' }),

                // ─────────────────────────────────────────────────────────────
                // 6. Registration Fees
                // ─────────────────────────────────────────────────────────────
                registrationFees: fields.text({
                    label: 'Registration Fees',
                    description: 'Supports Markdown including tables. Use standard Markdown table syntax.',
                    multiline: true,
                }),
                travelGrant: fields.object({
                    amount: fields.text({ label: 'Amount' }),
                    currency: fields.text({ label: 'Currency' }),
                    eligibility: fields.text({ label: 'Eligibility' }),
                    applicationUrl: fields.url({ label: 'Application URL' }),
                    notes: fields.text({ label: 'Notes', multiline: true }),
                }, { label: 'Travel Grants' }),

                // ─────────────────────────────────────────────────────────────
                // 7. Objectives & Outcomes (Content Field)
                // ─────────────────────────────────────────────────────────────
                summary: fields.document({
                    label: 'Objectives & Outcomes',
                    description: 'The main content section describing objectives, outcomes, and detailed information.',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),

                // ─────────────────────────────────────────────────────────────
                // 8. Community Outcomes
                // ─────────────────────────────────────────────────────────────
                communityOutcomes: fields.array(
                    fields.object({
                        type: fields.select({
                            label: 'Type',
                            options: [
                                { label: 'Consensus statement', value: 'Consensus statement' },
                                { label: 'Dataset', value: 'Dataset' },
                                { label: 'Software', value: 'Software' },
                                { label: 'Report', value: 'Report' },
                                { label: 'Slides', value: 'Slides' },
                                { label: 'Recording', value: 'Recording' },
                                { label: 'Photo', value: 'Photo' },
                                { label: 'Other', value: 'Other' },
                            ],
                            defaultValue: 'Report',
                        }),
                        title: fields.text({ label: 'Title' }),
                        url: fields.url({ label: 'URL' }),
                        doi: fields.text({ label: 'DOI' }),
                        date: fields.date({ label: 'Date' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                    }),
                    {
                        label: 'Community Outcomes',
                        itemLabel: (props) => props.fields.title.value,
                    }
                ),

                // ─────────────────────────────────────────────────────────────
                // 9. Sponsors
                // ─────────────────────────────────────────────────────────────
                sponsors: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Sponsor Name' }),
                        url: fields.url({ label: 'Website URL' }),
                        logo: fields.image({
                            label: 'Logo',
                            directory: 'public/images/summits/sponsors',
                            publicPath: '/images/summits/sponsors',
                        }),
                        supportType: fields.text({ label: 'Support Type (e.g. Platinum, Travel)' }),
                    }),
                    {
                        label: 'Sponsors',
                        itemLabel: (props) => props.fields.name.value,
                    }
                ),

                // ─────────────────────────────────────────────────────────────
                // 10. Organizing Team
                // ─────────────────────────────────────────────────────────────
                organizers: fields.array(
                    fields.object({
                        person: fields.relationship({
                            label: 'Person',
                            collection: 'people',
                            validation: { isRequired: true }
                        }),
                        role: fields.text({ label: 'Role' }),
                        affiliation: fields.text({ label: 'Affiliation (Override)' }),
                        section: fields.text({ label: 'Team / Section' }),
                    }),
                    {
                        label: 'Organizers',
                        itemLabel: (props) => {
                            const personValue = props.fields.person.value;
                            const name = (typeof personValue === 'string'
                                ? personValue
                                : (personValue as { slug?: string })?.slug) || 'Organizer';
                            const role = props.fields.role.value;
                            return role ? `${name} — ${role}` : name;
                        },
                    }
                ),
            },
        }),
    },
    singletons: {
        summit: singleton({
            label: 'Summit Info',
            path: 'src/content/summit/info',
            previewUrl: '/',
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
                        { label: 'Force Preview', value: 'Preview' },
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
