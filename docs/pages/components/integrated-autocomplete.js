import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context(
  'docs/src/pages/components/integrated-autocomplete',
  false,
  /\.(md|js|tsx)$/,
);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/integrated-autocomplete',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/integrated-autocomplete';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
