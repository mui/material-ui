import React from 'react';
import TopLayoutDocs from 'docs/src/modules/components/TopLayoutDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'system/advanced';
const requireDemo = require.context('docs/src/pages/system/advanced', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/system/advanced',
  false,
  /\.(js|md|tsx)$/,
);

// Run styled-components ref logic
// https://github.com/styled-components/styled-components/pull/2998
requireDemo.keys().map(requireDemo);

export default function Page({ demos, docs }) {
  return <TopLayoutDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
