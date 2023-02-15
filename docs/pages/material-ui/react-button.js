import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/components/buttons/buttons.md?@mui/markdown';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

Page.getLayout = function getLayout(page) {
  return <BrandingCssVarsProvider dense>{page}</BrandingCssVarsProvider>;
};
