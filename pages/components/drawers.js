import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/components/drawers', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../docs/src/pages/components/drawers',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/drawers';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
