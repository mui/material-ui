import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context(
  'docs/src/pages/getting-started/supported-platforms',
  true,
  /\.md|\.js$/,
);
const reqSource = require.context(
  '!raw-loader!../../docs/src/pages/getting-started/supported-platforms',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/getting-started/supported-platforms';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
