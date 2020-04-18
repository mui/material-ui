import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/components/autocomplete', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/autocomplete',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/autocomplete';

// Run styled-components ref logic
// https://github.com/styled-components/styled-components/pull/2998
req.keys().map(req);

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
