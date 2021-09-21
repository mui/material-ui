import path from 'path';
import fs from 'fs';
import * as React from 'react';
import { findPagesMarkdown } from 'docs/src/modules/utils/find';
import { prepareMarkdown } from '@mui/markdown';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';

export default function Lesson(props: any) {
  const { learn, preparedMarkdown } = props;
  return (
    <div>
      {`Lesson ${learn.chapter}/${learn.lesson}`}
      <TopLayoutBlog docs={preparedMarkdown.docs} />
    </div>
  );
}

export async function getStaticProps({ params }: any) {
  const directory = path.resolve(process.cwd(), 'src/pages/learn');
  const pages = findPagesMarkdown(directory);
  const page = pages.find((page) => page.pathname === `/learn/${params.chapter}/${params.lesson}`)
  const markdown = fs.readFileSync(page.filename, { encoding: 'utf8' });
  const preparedMarkdown = prepareMarkdown({
    translations: [
      {
        filename: '',
        userLanguage: 'en',
        markdown,
      },
    ],
  });
  return {
    props: {
      learn: params,
      preparedMarkdown,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          chapter: 'introduction',
          lesson: 'what-is-mui',
        },
      },
    ],
    fallback: false,
  };
}
