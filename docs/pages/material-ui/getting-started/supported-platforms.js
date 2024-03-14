import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/getting-started/supported-platforms/supported-platforms.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
