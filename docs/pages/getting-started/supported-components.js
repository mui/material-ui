import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context(
  'docs/src/pages/getting-started/supported-components',
  true,
  /\.md|\.js$/,
);
const reqSource = require.context(
  '!raw-loader!../../src/pages/getting-started/supported-components',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/getting-started/supported-components';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
