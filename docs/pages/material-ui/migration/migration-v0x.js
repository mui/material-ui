import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/migration-v0x/migration-v0x.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
