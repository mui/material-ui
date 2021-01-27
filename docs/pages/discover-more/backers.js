import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'discover-more/backers';
const requireImports = require.context('docs/src/pages/discover-more/backers', false, /Imports\.js$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/discover-more/backers',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireImports={requireImports} disableAd />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
