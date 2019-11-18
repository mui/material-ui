import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './tree-view.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} />;
}
