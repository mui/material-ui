import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/upgrade-to-grid-v2/upgrade-to-grid-v2.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
