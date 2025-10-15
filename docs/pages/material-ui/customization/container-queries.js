import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/customization/container-queries/container-queries.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
