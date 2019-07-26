import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/system/api', false, /\.(md|js|tsx)$/);
const reqSource = require.context('!raw-loader!../../src/pages/system/api', false, /\.(js|tsx)$/);
const reqPrefix = 'pages/system/api';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
