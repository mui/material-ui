import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/experimental-api/pigment-css/pigment-css.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
