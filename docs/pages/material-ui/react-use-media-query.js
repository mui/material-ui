import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/components/use-media-query/use-media-query.md?muiMarkdown';
import * as Prism from 'prismjs';

export default function Page() {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <MarkdownDocs {...pageProps} />;
}
