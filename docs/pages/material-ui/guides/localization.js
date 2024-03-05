import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/localization/localization.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
