import * as React from 'react';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/components/button-group/button-group.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

Page.getLayout = function getLayout(page) {
  return <BrandingCssVarsProvider dense>{page}</BrandingCssVarsProvider>;
};
