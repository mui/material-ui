// @flow

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getContext, setContext } from 'docs/src/modules/styles/context';
import CleanCSS from 'clean-css';

const cleanCSS = new CleanCSS();

class MyDocument extends Document {
  render() {
    const context = getContext();
    return (
      <html lang="en" dir="ltr">
        <Head>
          <title>Material-UI</title>
          <meta
            name="description"
            content="React Components that Implement Google's Material Design."
          />
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
          <link rel="manifest" href="/static/manifest.json" />
          {/* PWA primary color */}
          <meta name="theme-color" content={context.theme.palette.primary[500]} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <style id="insertion-point-jss" />
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@MaterialUI" />
          <meta name="twitter:title" content="Material-UI" />
          <meta
            name="twitter:description"
            content="React Components that Implement Google's Material Design."
          />
          <meta name="twitter:image" content="/static/icons/512x512.png" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js" async defer />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Reset the context for handling a new request.
  setContext();
  const page = ctx.renderPage();
  // Get the context with the collected side effects.
  const context = getContext();

  let css = context.sheetsRegistry.toString();
  if (process.env.NODE_ENV === 'production') {
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...page,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />
    ),
  };
};

export default MyDocument;
