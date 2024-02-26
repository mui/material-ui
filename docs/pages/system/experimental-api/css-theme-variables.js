import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/system/experimental-api/css-theme-variables/css-theme-variables.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
