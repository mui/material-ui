import fs from 'fs';
import path from 'path';
import { getHeaders } from '@mui/markdown';

const blogDir = path.join(process.cwd(), 'pages/blog');

export const getBlogFilePaths = (ext = '.md') => {
  return fs.readdirSync(blogDir).filter((file) => file.endsWith(ext));
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags?: Array<string>;
  authors?: Array<string>;
  date?: string;
}

export const getBlogPost = (filePath: string): BlogPost => {
  const slug = filePath.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(blogDir, filePath), 'utf-8');

  const headers = getHeaders(content) as unknown as BlogPost;

  return {
    ...headers,
    slug,
  };
};

export const getAllBlogPosts = () => {
  const filePaths = getBlogFilePaths();
  const rawBlogPosts = filePaths
    .map((name) => getBlogPost(name))
    // sort allBlogPosts by date in descending order
    .sort((post1, post2) => {
      if (post1.date && post2.date) {
        return new Date(post1.date) > new Date(post2.date) ? -1 : 1;
      }
      if (post1.date && !post2.date) {
        return 1;
      }
      return -1;
    });
  const allBlogPosts = rawBlogPosts.filter((post) => !!post.title);
  const tagInfo: Record<string, number | undefined> = {};
  allBlogPosts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      tagInfo[tag] = (tagInfo[tag] || 0) + 1;
    });
  });
  return {
    rawBlogPosts, // all posts from the directory
    allBlogPosts, // posts with at least a title
    allTags: Object.keys(tagInfo),
    tagInfo,
  };
};
