import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { documentGetInitialProps } from '@mui/material-nextjs/v16-pagesRouter';
import theme from '../src/theme';

export default function MyDocument() {
  return (
    <Html lang="en">
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

MyDocument.getInitialProps = async (ctx) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
