import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/design-resources/material-ui-sync/material-ui-sync.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
