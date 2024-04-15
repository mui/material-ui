import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import * as pageProps from 'docs/data/material/getting-started/overview/overview.md?muiMarkdown';

export default function Page() {
  return (
    <BrandingCssVarsProvider>
      <MarkdownDocs {...pageProps} disableAd />
    </BrandingCssVarsProvider>
  );
}
