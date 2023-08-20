import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/joy/components/button-group/button-group.md?@mui/markdown';

export default function Page() {
  return null;
}

Page.getLayout = () => {
  return <AppFrame><MarkdownDocs {...pageProps} /></AppFrame>;
};
