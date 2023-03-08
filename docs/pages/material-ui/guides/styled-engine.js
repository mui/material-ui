import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/styled-engine/styled-engine.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
