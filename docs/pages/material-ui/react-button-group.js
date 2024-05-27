import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/material/components/button-group/button-group.md?muiMarkdown';
import * as Prism from 'prismjs';

export default function Page() {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <MarkdownDocs {...pageProps} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};
