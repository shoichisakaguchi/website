import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';

export async function GET(context: { site: URL }) {
    const posts = await getCollection('posts');
    const items = posts
        .filter((post) => post.data.publishedDate)
        .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf())
        .map((post) => ({
            title: post.data.title,
            link: `/posts/${post.slug}/`,
            pubDate: post.data.publishedDate,
            description: post.data.excerpt
                ? marked.parse(post.data.excerpt)
                : undefined,
            author: post.data.author || undefined,
        }));

    return rss({
        title: 'RdRp Summit',
        description: 'The global hub for RdRp research and collaboration.',
        site: context.site,
        items,
    });
}
