import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './menu-list.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} />;
}
