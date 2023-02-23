import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/guides/using-icon-libraries/using-icon-libraries.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
