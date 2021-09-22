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
  const learnPages = findPagesMarkdown(directory);
  const page = learnPages.find(
    (learnPage) => learnPage.pathname === `/learn/${params.chapter}/${params.lesson}`,
  )!;
  const markdown = fs.readFileSync(page.filename, { encoding: 'utf8' });
  const preparedMarkdown = prepareMarkdown({
    pageFilename: `learn/${params.chapter}`,
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
  const learnPages = findPagesMarkdown(path.resolve(process.cwd(), 'src/pages/learn'));

  return {
    paths: learnPages.map((learnPage) => {
      const [, , chapter, lesson] = learnPage.pathname.split('/');

      return {
        params: {
          chapter,
          lesson,
        },
      };
    }),
    fallback: false,
  };
}
