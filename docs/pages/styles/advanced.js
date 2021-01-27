import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'styles/advanced';
const requireImports = require.context('docs/src/pages/styles/advanced', false, /Imports\.js$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/styles/advanced',
  false,
  /\.(js|md|tsx)$/,
);

// Run styled-components ref logic
// https://github.com/styled-components/styled-components/pull/2998
requireImports.keys().map(requireImports);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireImports={requireImports} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
