import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import getPageContext from 'docs/src/modules/styles/getPageContext';
import config from 'docs/src/config';

// You can find a benchmark of the available CSS minifiers under
// https://github.com/GoalSmashers/css-minification-benchmark
// We have found that clean-css is faster than cssnano but the output is larger.
// Waiting for https://github.com/cssinjs/jss/issues/279
// 4% slower but 12% smaller output than doing it in a single step.
//
// It's using .browserslistrc
let prefixer;
let cleanCSS;
if (process.env.NODE_ENV === 'production') {
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

class MyDocument extends Document {
  render() {
    const { canonical, pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
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
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="canonical" href={canonical} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          {/*
            Preconnect allows the browser to setup early connections before an HTTP request
            is actually sent to the server.
            This includes DNS lookups, TLS negotiations, TCP handshakes.
          */}
          <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
          <style id="insertion-point-jss" />
        </Head>
        <body>
          <Main />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.google.id}`} />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)};
gtag('js', new Date());
              `,
            }}
          />
          <NextScript />
          <script async src="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js" />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
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

  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const page = ctx.renderPage(Component => props => (
    <Component pageContext={pageContext} {...props} />
  ));

  let css = pageContext.sheetsRegistry.toString();
  if (process.env.NODE_ENV === 'production') {
    const result1 = await prefixer.process(css, { from: undefined });
    css = result1.css;
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...page,
    pageContext,
    canonical: `https://material-ui.com${ctx.req.url.replace(/\/$/, '')}/`,
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
