import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/customization/using-css-variables/using-css-variables.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
