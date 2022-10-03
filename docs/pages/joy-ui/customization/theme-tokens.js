import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/customization/theme-tokens/theme-tokens.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
