import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context(
  'docs/src/pages/components/data-grid/localization',
  false,
  /\.(md|js|tsx)$/,
);
const reqSource = require.context(
  '!raw-loader!../../../src/pages/components/data-grid/localization',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/data-grid/localization';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
