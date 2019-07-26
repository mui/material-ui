import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './april-2019-update.md';

function Page() {
  return <MarkdownDocs markdown={markdown} blog disableAd disableToc disableEdit />;
}

export default Page;
