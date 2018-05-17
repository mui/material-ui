import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from '../../BACKERS.md';

function Page() {
  return <MarkdownDocs markdown={markdown} markdownLocation="/BACKERS.md" />;
}

export default withRoot(Page);
