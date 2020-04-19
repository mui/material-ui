import React from 'react';
import TopLayoutCompany from 'docs/src/modules/components/TopLayoutCompany';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'company/about';
const requireDemo = require.context('docs/src/pages/company/about', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/company/about',
  false,
  /\.(js|md|tsx)$/,
  'lazy',
);

// eslint-disable-next-line react/prop-types
export default function Page({ demos, docs }) {
  return <TopLayoutCompany demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = async (ctx) => {
  const { demos, docs } = await prepareMarkdown({ ctx, pageFilename, requireRaw });
  return { demos, docs };
};
