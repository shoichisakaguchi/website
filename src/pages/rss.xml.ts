import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { getSortDate, sortEntriesByDateDesc } from '../utils/sortDate';
import { formatDate } from '../utils/date';
import { resolveEventTimes } from '../lib/journalClubTime.mjs';

// A feed is read later, in someone else's app, with no way to know the
// reader's timezone, so it states the time as announced (to match the Slack
// or Bluesky post) and in UTC (one unambiguous reference). Both come from the
// resolved UTC instant, so DST is handled the same way as on the site.
function formatJournalClubWhen(data: {
    date: Date;
    localTime?: string;
    eventTz?: string;
}): string {
    const times = resolveEventTimes(data);
    if (!times || !times.hasTime || !data.localTime) {
        return formatDate(data.date);
    }
    const tz = data.eventTz || 'Asia/Tokyo';
    const city = (tz.split('/').pop() || tz).replace(/_/g, ' ');
    const fmt = (timeZone: string, withDay: boolean) =>
        new Intl.DateTimeFormat('en-US', {
            timeZone,
            ...(withDay
                ? { weekday: 'short', month: 'short', day: 'numeric' }
                : {}),
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(times.start);
    const dayIn = (timeZone: string) =>
        new Intl.DateTimeFormat('en-CA', { timeZone }).format(times.start);
    const local = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(times.start);
    // Name the UTC day only when it differs from the announced one.
    const utc = fmt('UTC', dayIn(tz) !== dayIn('UTC'));
    return `${local} ${city} (${utc} UTC)`;
}

function toRssDate(value: unknown): Date | undefined {
    if (value instanceof Date && !Number.isNaN(value.valueOf())) {
        return value;
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return undefined;
        const parsed = new Date(trimmed);
        if (!Number.isNaN(parsed.valueOf())) {
            return parsed;
        }
    }
    return undefined;
}

function getRssPubDate(data: { publishedDate?: unknown; date?: unknown }): Date {
    return (
        toRssDate(data.publishedDate) ||
        toRssDate(data.date) ||
        new Date('1970-01-01T00:00:00Z')
    );
}

function getPostAuthor(data: {
    author?: string;
    credits?: Array<{ role: string; name: string }>;
}): string | undefined {
    if (Array.isArray(data.credits) && data.credits.length > 0) {
        const authorCredit = data.credits.find((credit) => credit.role === 'author');
        if (authorCredit?.name) return authorCredit.name;
        const summaryCredit = data.credits.find((credit) => credit.role === 'summary');
        if (summaryCredit?.name) return summaryCredit.name;
        const first = data.credits[0];
        if (first?.name) return first.name;
    }
    return data.author || undefined;
}

export async function GET(context: { site: URL }) {
    const posts = await getCollection('posts');
    const journalClub = await getCollection('journal-club');

    const postItems = sortEntriesByDateDesc(
        posts.filter((post) => post.data.publishedDate),
        'posts',
    ).map((post) => ({
        title: post.data.title,
        link: `/posts/${post.slug}/`,
        pubDate: getRssPubDate(post.data),
        description: post.data.excerpt
            ? marked.parse(post.data.excerpt)
            : undefined,
        author: getPostAuthor(post.data),
    }));

    const journalItems = sortEntriesByDateDesc(
        journalClub,
        'journal-club',
    ).map((item) => ({
        title: `Journal Club: ${item.data.title}`,
        link: `/journal-club/${item.slug}/`,
        pubDate: getRssPubDate(item.data),
        description: (() => {
            const speakerName = item.data.speakerName || item.data.speaker;
            const speakerAffiliation = item.data.speakerAffiliation;
            const speakerLine = speakerName
                ? speakerAffiliation
                    ? `${speakerName} (${speakerAffiliation})`
                    : speakerName
                : undefined;
            const chairsLine = Array.isArray(item.data.chairs)
                ? item.data.chairs
                      .filter((chair) => chair?.name && chair?.affiliation)
                      .map((chair) => `${chair.name} (${chair.affiliation})`)
                      .join(' · ')
                : '';
            const dateLine = formatJournalClubWhen(item.data);
            return [
                `<p><strong>Date:</strong> ${dateLine}</p>`,
                speakerLine
                    ? `<p><strong>Speaker:</strong> ${speakerLine}</p>`
                    : undefined,
                chairsLine
                    ? `<p><strong>Chaired by:</strong> ${chairsLine}</p>`
                    : undefined,
            ]
                .filter(Boolean)
                .join('');
        })(),
    }));

    const items = [...postItems, ...journalItems].sort(
        (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
    );

    return rss({
        title: 'RdRp Summit',
        description: 'The global hub for RdRp research and collaboration.',
        site: context.site,
        items,
    });
}
