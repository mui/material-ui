import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/guides/interoperability', true, /\.md|\.js$/);
const reqSource = require.context(
  '!raw-loader!../../docs/src/pages/guides/interoperability',
  true,
  /\.js$/,
);

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} />;
}

export default Page;
