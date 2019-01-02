import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from '../../ROADMAP.md';

function Page() {
  return <MarkdownDocs markdown={markdown} markdownLocation="/ROADMAP.md" />;
}

export default Page;
