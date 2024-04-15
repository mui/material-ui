import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import * as pageProps from 'docs/data/material/components/accordion/accordion.md?muiMarkdown';

export default function Page() {
  return (
    <BrandingCssVarsProvider>
      <MarkdownDocs {...pageProps} />
    </BrandingCssVarsProvider>
  );
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};
