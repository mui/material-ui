import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  docs,
  demos,
  requireDemo,
} from 'docs/src/pages/production-error/index.md?@material-ui/markdown';

export default function Page() {
  return <MarkdownDocs demos={demos} disableAd docs={docs} requireDemo={requireDemo} />;
}
