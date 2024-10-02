import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/system/getting-started/the-sx-prop/the-sx-prop.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
