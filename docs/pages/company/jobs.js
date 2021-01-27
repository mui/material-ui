import * as React from 'react';
import TopLayoutCompany from 'docs/src/modules/components/TopLayoutCompany';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'company/jobs';
const requireImports = require.context('docs/src/pages/company/jobs', false, /Imports\.js$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/company/jobs',
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
