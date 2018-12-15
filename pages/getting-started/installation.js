import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return <MarkdownDocs disableAd markdown={req(`./installation${props.lang}.md`)} />;
}

export default Page;
