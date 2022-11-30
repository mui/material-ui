import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/system/experimental-api/extend-sx-prop/extend-sx-prop.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
