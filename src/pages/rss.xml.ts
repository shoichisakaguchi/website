import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { getSortDate, sortEntriesByDateDesc } from '../utils/sortDate';

export async function GET(context: { site: URL }) {
    const posts = await getCollection('posts');
    const journalClub = await getCollection('journal-club');
    const summits = await getCollection('summits');

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

    const journalItems = sortEntriesByDateDesc(journalClub, 'journal-club').map((item) => ({
        title: `Journal Club: ${item.data.title}`,
        link: `/journal-club/${item.slug}/`,
        pubDate: getSortDate('journal-club', item.data),
        description: undefined,
    }));

    const summitItems = sortEntriesByDateDesc(summits, 'summits').map((item) => ({
        title: `Summit: ${item.data.title}`,
        link: `/summits/${item.slug}/`,
        pubDate: getSortDate('summits', item.data),
        description: item.data.description || item.data.intro || undefined,
    }));

    const items = [...postItems, ...journalItems, ...summitItems].sort(
        (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
    );

    return rss({
        title: 'RdRp Summit',
        description: 'The global hub for RdRp research and collaboration.',
        site: context.site,
        items,
    });
}
