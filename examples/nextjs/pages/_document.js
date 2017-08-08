/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getContext } from '../styles/context';

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const page = ctx.renderPage();
    // Get the context with the collected side effects.
    const context = getContext();
    return {
      ...page,
      styles: (
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }}
        />
      ),
    };
  }

  render() {
    const context = getContext();
    return (
      <html lang="en">
        <Head>
          <title>My page</title>
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
