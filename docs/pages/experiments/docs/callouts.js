import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { docs } from './callouts.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs docs={docs} />;
}
