import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './touch-ripple.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} />;
}
