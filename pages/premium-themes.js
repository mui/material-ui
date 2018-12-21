import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/premium-themes', true, /\.md|\.js$/);
const reqSource = require.context('!raw-loader!../docs/src/pages/premium-themes', true, /\.js$/);

function Page() {
  return <MarkdownDocs req={req} reqPrefix="docs/src/pages/premium-themes" reqSource={reqSource} />;
}

export default Page;
