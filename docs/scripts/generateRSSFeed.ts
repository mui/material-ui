import fs from 'fs';
import { Feed } from 'feed';
import { getAllBlogPosts, BlogPost } from 'docs/lib/sourcing';

function getFeedOptions(siteUrl: string) {
  return {
    title: 'MUI - Blog',
    description:
      'Follow the MUI blog to learn about new product features, latest advancements in UI development, and business initiatives.',
    id: `${siteUrl}/blog`,
    link: `${siteUrl}/blog`,
    language: 'en',
    image: `${siteUrl}/static/logo.svg`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `Copyright © ${new Date().getFullYear()} Material UI SAS.`,
    feedLinks: {
      rss2: `${siteUrl}/static/blog/feed/rss.xml`,
    },
  } as const;
}

function getFeedItem({ post, siteUrl }: { post: BlogPost; siteUrl: string }) {
  const postAuthors = post.authors && post.authors.map((author) => ({ name: author }));
  const postDate = post.date ? new Date(post.date) : new Date();
  const postCategory = post.tags.map((tag) => ({ name: tag }));
  const postLink = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    image: post.image,
    id: postLink,
    link: postLink,
    description: post.description,
    category: postCategory,
    date: postDate,
    author: postAuthors,
  } as const;
}

export default function generateRssFeed() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  const siteUrl = 'https://mui.com';
  const { allBlogPosts } = getAllBlogPosts();

  const feedOptions = getFeedOptions(siteUrl);
  const feed = new Feed(feedOptions);

  allBlogPosts.forEach((post) => {
    const feedItem = getFeedItem({ post, siteUrl });
    feed.addItem(feedItem);
  });

  fs.mkdirSync('public/static/blog/feed', { recursive: true });
  fs.writeFileSync('public/static/blog/feed/rss.xml', feed.rss2());
}
