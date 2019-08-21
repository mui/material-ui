import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './material-ui-v4-is-out.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} blog disableAd disableToc disableEdit />;
}
