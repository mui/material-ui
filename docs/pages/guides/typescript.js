import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/guides/typescript', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/guides/typescript',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/guides/typescript';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
