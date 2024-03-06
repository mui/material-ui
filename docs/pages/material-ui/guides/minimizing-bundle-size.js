import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/minimizing-bundle-size/minimizing-bundle-size.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
