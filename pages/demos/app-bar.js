import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/demos/app-bar', false, /\.md|\.js$/);
const reqSource = require.context(
  '!raw-loader!../../docs/src/pages/demos/app-bar',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/demos/app-bar';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
