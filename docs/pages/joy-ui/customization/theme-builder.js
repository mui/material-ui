import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/customization/theme-builder/theme-builder.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} disableCssVarsProvider disableToc />;
}
