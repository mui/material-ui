import * as React from 'react';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter';
import theme, { roboto } from '../src/theme';

export default function MyDocument(props: DocumentProps) {
  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = documentGetInitialProps;
