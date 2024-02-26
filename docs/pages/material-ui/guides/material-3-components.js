import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/material-3-components/material-3-components.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
