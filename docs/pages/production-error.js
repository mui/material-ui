import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  docs,
  demos,
  demoComponents,
} from 'docs/src/pages/production-error/index.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs demos={demos} disableAd docs={docs} demoComponents={demoComponents} />;
}
