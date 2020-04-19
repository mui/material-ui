import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'api-docs/table-pagination';
const requireDemo = require.context(
  'docs/src/pages/api-docs/table-pagination',
  false,
  /\.(js|tsx)$/,
);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/api-docs/table-pagination',
  false,
  /\.(js|md|tsx)$/,
);

// eslint-disable-next-line react/prop-types
export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = async () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
