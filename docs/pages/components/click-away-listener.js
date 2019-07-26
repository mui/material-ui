import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context(
  'docs/src/pages/components/click-away-listener',
  false,
  /\.(md|js|tsx)$/,
);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/click-away-listener',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/click-away-listener';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
