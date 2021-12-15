import fs from 'fs';
import path from 'path';
import { getHeaders } from '@mui/markdown';

const blogDir = path.join(process.cwd(), 'pages/blog');

export const getBlogFilenames = (ext = '.md') => {
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

export const getBlogPost = (filename: string): BlogPost => {
  const slug = filename.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');

  const headers = getHeaders(content) as unknown as BlogPost;

  return {
    ...headers,
    slug,
  };
};

export const getAllBlogPosts = () => {
  const filenames = getBlogFilenames();
  const posts = filenames
    .map((name) => getBlogPost(name))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      if (post1.date && post2.date) {
        return new Date(post1.date) > new Date(post2.date) ? -1 : 1;
      }
      if (post1.date && !post2.date) {
        return 1;
      }
      return -1;
    });
  return posts;
};
