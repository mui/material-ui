import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/main-features/global-variants/global-variants.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
