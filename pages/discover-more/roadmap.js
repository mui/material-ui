import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from '../../ROADMAP.md';

function Page() {
  return <MarkdownDocs markdown={markdown} markdownLocation="/ROADMAP.md" />;
}

export default withRoot(Page);
