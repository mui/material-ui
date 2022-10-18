import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/guides/using-joy-ui-and-material-ui/using-joy-ui-and-material-ui.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
