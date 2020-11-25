import React from 'react';
import TopLayoutDocs from 'docs/src/modules/components/TopLayoutDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'discover-more/backers';
const requireDemo = require.context('docs/src/pages/discover-more/backers', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/discover-more/backers',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return <TopLayoutDocs demos={demos} docs={docs} requireDemo={requireDemo} disableAd />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
