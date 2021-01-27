import * as React from 'react';
import TopLayoutCompany from 'docs/src/modules/components/TopLayoutCompany';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'company/about';
const requireImports = require.context('docs/src/pages/company/about', false, /Imports\.js$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/company/about',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return <TopLayoutCompany demos={demos} docs={docs} requireImports={requireImports} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
