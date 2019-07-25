import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './form-helper-text.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default Page;
