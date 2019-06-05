import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './material-ui-v4-is-out.md';

function Page() {
  return <MarkdownDocs markdown={markdown} blog disableAd disableToc disableEdit />;
}

export default Page;
