import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './2019-july-update.md';

function Page() {
  return <MarkdownDocs markdown={markdown} blog disableAd disableToc disableEdit />;
}

export default Page;
