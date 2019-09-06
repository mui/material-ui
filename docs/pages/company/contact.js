import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/company/contact', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/company/contact',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/company/contact';

export default function Page() {
  return (
    <MarkdownDocs
      disableAd
      disableToc
      disableEdit
      req={req}
      reqSource={reqSource}
      reqPrefix={reqPrefix}
    />
  );
}
