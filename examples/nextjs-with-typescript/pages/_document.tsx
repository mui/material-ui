import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../src/theme';
import { withMuiSetup, createEmotionCache } from '../sdk';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = withMuiSetup({
  getEmotionCache: createEmotionCache,
});
