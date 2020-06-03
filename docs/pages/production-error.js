import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'production-error';
const requireDemo = require.context('docs/src/pages/production-error', false, /\.js$/);
const requireRaw = require.context(
  '!raw-loader!../src/pages/production-error',
  false,
  /\.(js|md)$/,
);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} disableAd docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
