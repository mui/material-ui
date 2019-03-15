import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/demos/breadcrumbs', false, /\.md|\.js$/);
const reqSource = require.context(
  '!raw-loader!../../docs/src/pages/demos/breadcrumbs',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/demos/breadcrumbs';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
