import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/base/guides/next-js-app-router/next-js-app-router.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
