import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/components/popper', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../docs/src/pages/components/popper',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/popper';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
