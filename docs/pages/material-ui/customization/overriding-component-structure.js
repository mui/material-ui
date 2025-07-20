import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/customization/overriding-component-structure/overriding-component-structure.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
