import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  demoComponents,
} from 'docs/data/joy/getting-started/templates/index.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs demos={demos} docs={docs} disableToc demoComponents={demoComponents} />;
}
