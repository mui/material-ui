import * as React from 'react';
import type { DocumentContext } from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';
import { documentGetInitialProps } from '@mui/material-nextjs/v16-pagesRouter';
import theme, { roboto } from '../src/theme';

export default function MyDocument() {
  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
