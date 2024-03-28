import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/design-resources/material-ui-for-figma/material-ui-for-figma.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
