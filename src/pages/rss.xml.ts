import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { getSortDate, sortEntriesByDateDesc } from '../utils/sortDate';
import { formatDate } from '../utils/date';

export async function GET(context: { site: URL }) {
    const posts = await getCollection('posts');
    const journalClub = await getCollection('journal-club');

    const postItems = sortEntriesByDateDesc(
        posts.filter((post) => post.data.publishedDate),
        'posts',
    ).map((post) => ({
        title: post.data.title,
        link: `/posts/${post.slug}/`,
        pubDate: post.data.publishedDate,
        description: post.data.excerpt
            ? marked.parse(post.data.excerpt)
            : undefined,
        author: post.data.author || undefined,
    }));

    const journalItems = sortEntriesByDateDesc(
        journalClub.filter((item) => item.data.publishedDate),
        'journal-club',
    ).map((item) => ({
        title: `Journal Club: ${item.data.title}`,
        link: `/journal-club/${item.slug}/`,
        pubDate: item.data.date,
        description: (() => {
            const speakerName = item.data.speakerName || item.data.speaker;
            const speakerAffiliation = item.data.speakerAffiliation;
            const speakerLine = speakerName
                ? speakerAffiliation
                    ? `${speakerName} (${speakerAffiliation})`
                    : speakerName
                : undefined;
            const dateLine = formatDate(item.data.date);
            return [
                `<p><strong>Date:</strong> ${dateLine}</p>`,
                speakerLine
                    ? `<p><strong>Speaker:</strong> ${speakerLine}</p>`
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
