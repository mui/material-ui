import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './dialog-title.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} />;
}
