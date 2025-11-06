import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/migration-v3/migration-v3.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
