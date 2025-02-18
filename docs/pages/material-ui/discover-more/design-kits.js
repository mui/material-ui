import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/discover-more/design-kits/design-kits.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
