/* eslint-disable no-underscore-dangle */

import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Main, NextScript } from 'next/document';
import { Router } from 'next/router';
import { LANGUAGES } from 'docs/src/modules/constants';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import getTheme from 'docs/src/modules/styles/getTheme';
import themeInitialState from 'docs/src/modules/styles/themeInitialState';

const theme = getTheme(themeInitialState);

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
  /* eslint-disable global-require */
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');
  /* eslint-enable global-require */

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

const GOOGLE_ID = process.env.NODE_ENV === 'production' ? 'UA-106598593-2' : 'UA-106598593-3';

class MyDocument extends Document {
  render() {
    const { canonical, userLanguage } = this.props;

    return (
      <html lang={userLanguage} dir="ltr">
        <Head>
          {/* Use minimum-scale=1 to enable GPU rasterization. */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
          <link rel="manifest" href="/static/manifest.json" />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          {/* SEO */}
          <link
            rel="canonical"
            href={`https://material-ui.com${Router._rewriteUrlForNextExport(
              `${userLanguage === 'en' ? '' : `/${userLanguage}`}${canonical}`,
            )}`}
          />
          <link
            rel="alternate"
            href={`https://material-ui.com${Router._rewriteUrlForNextExport(canonical)}`}
            hrefLang="x-default"
          />
          {LANGUAGES.map(userLanguage2 => (
            <link
              key={userLanguage2}
              rel="alternate"
              href={`https://material-ui.com${Router._rewriteUrlForNextExport(
                `${userLanguage2 === 'en' ? '' : `/${userLanguage2}`}${canonical}`,
              )}`}
              hrefLang={userLanguage2}
            />
          ))}
          {/*
            Preconnect allows the browser to setup early connections before an HTTP request
            is actually sent to the server.
            This includes DNS lookups, TLS negotiations, TCP handshakes.
          */}
          <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
          <style id="material-icon-font" />
          <style id="font-awesome-css" />
          <style id="app-search" />
          <style id="insertion-point-jss" />
        </Head>
        <body>
          <Main />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
window.ga('create','${GOOGLE_ID}','auto');
              `,
            }}
          />
          <NextScript />
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

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  let css = sheets.toString();
  // It might be undefined, e.g. after an error.
  if (css && process.env.NODE_ENV === 'production') {
    const result1 = await prefixer.process(css, { from: undefined });
    css = result1.css;
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...initialProps,
    canonical: pathnameToLanguage(ctx.req.url).canonical,
    userLanguage: ctx.query.userLanguage,
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
