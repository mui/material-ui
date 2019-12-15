import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './november-2019-update.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} blog disableAd disableToc disableEdit />;
}
