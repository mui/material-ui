import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/getting-started/installation', false, /\.md|\.js$/);
const reqSource = require.context(
  '!raw-loader!../../docs/src/pages/getting-started/installation',
  false,
  /\.js$/,
);
const reqPrefix = 'pages/getting-started/installation';

function Page() {
  return <MarkdownDocs disableAd req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
