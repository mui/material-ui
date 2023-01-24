import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/button/button.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
