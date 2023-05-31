import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/base/getting-started/supported-components/supported-components.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
