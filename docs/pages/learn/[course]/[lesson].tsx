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
      {`Lesson ${learn.course}/${learn.lesson}`}
      <TopLayoutBlog docs={preparedMarkdown.docs} />
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const directory = path.resolve(process.cwd(), 'src/pages/learn');
  const learnPages = findPagesMarkdown(directory);
  const page = learnPages.find(
    (learnPage) => learnPage.pathname === `/learn/${params.course}/${params.lesson}`,
  )!;
  const markdown = fs.readFileSync(page.filename, { encoding: 'utf8' });
  const preparedMarkdown = prepareMarkdown({
    pageFilename: `learn/${params.course}`,
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
