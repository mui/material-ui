import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/getting-started/templates', false, /\.md|\.js$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/getting-started/templates',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/getting-started/templates';

function Page() {
  return <MarkdownDocs disableToc req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
