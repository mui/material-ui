import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/components/skeleton', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/skeleton',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/skeleton';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
