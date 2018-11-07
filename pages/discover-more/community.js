import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /\.md$/);

function Page(props) {
  return <MarkdownDocs markdown={req(`./community${props.lang}.md`)} />;
}

export default withRoot(Page);
