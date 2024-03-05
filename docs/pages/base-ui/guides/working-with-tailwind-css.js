import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/base/guides/working-with-tailwind-css/working-with-tailwind-css.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
