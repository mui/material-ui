import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './input-base.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default Page;
