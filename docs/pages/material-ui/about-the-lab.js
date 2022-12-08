import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/components/about-the-lab/about-the-lab.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
