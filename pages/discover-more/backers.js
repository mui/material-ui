import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from '../../BACKERS.md';

function Page() {
  return <MarkdownDocs disableAd markdown={markdown} markdownLocation="/BACKERS.md" />;
}

export default Page;
