import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'system/flexbox';
const requireDemo = require.context('docs/src/pages/system/flexbox', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/system/flexbox',
  false,
  /\.(js|md|tsx)$/,
);

// eslint-disable-next-line react/prop-types
export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = async (ctx) => {
  const { demos, docs } = prepareMarkdown({ ctx, pageFilename, requireRaw });
  return { demos, docs };
};
