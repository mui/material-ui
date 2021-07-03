import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import theme from 'styles/theme';

// https://material-ui.com/styles/advanced/#next-js
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta content={theme.palette.primary.main} name="theme-color" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
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

MyDocument.getInitialProps = async (ctx) => {
  // Step 1: Create an instance of ServerStyleSheet
  const sheet = new ServerStyleSheet();

  // Step 2: Retrieve styles from components in the page
  const view = ctx.renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));

  // Step 3: Extract the styles as <style> tags
  const styleTags = sheet.getStyleElement();

  // Step 4: Pass styleTags as a prop
  return { ...view, styleTags };
};
