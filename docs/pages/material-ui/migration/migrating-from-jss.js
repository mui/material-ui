import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/migration-v4/migrating-from-jss.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
