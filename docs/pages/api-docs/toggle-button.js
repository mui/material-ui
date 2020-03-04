import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './toggle-button.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} />;
}
