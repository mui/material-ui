import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/migration-v4/migration-v4.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
