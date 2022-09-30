import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/understand-mui-packages/understand-mui-packages.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
