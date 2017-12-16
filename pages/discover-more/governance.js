import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from '../../GOVERNANCE.md';

function Page() {
  return <MarkdownDocs markdown={markdown} markdownLocation="/GOVERNANCE.md" />;
}

export default withRoot(Page);
