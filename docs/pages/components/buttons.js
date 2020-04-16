import React from 'react';
import MarkdownDocsX from 'docs/src/modules/components/MarkdownDocs.new';
import prepareMarkdown from 'docs/src/modules/utils/prepareMarkdown';

const req = require.context('docs/src/pages/components/buttons', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/buttons',
  false,
  /\.(js|tsx)$/,
);
const pageFilename = 'components/buttons';

// eslint-disable-next-line react/prop-types
export default function Page({ demos, docs }) {
  return <MarkdownDocsX demos={demos} docs={docs} req={req} />;
}

Page.getInitialProps = async () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, req, reqSource });
  return { demos, docs };
};
