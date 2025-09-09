import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/white-label-themes/white-label-themes.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
