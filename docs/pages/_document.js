import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';
import createEmotionServer from 'create-emotion-server';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { themeColor } from 'docs/src/modules/components/ThemeContext';
import { cacheLtr } from 'docs/pages/_app';

const { extractCritical } = createEmotionServer(cacheLtr);

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

export default class MyDocument extends Document {
  render() {
    const { canonical, userLanguage } = this.props;

    return (
      <Html lang={userLanguage}>
        <Head>
          {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
          <link rel="manifest" href="/static/manifest.json" />
          {/* PWA primary color */}
          <meta name="theme-color" content={themeColor} />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          {/* iOS Icon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/180x180.png" />
          {/* SEO */}
          <link
            rel="canonical"
            href={`https://material-ui.com${
              userLanguage === 'en' ? '/' : `/${userLanguage}`
            }${canonical}`}
          />
          <link rel="alternate" href={`https://material-ui.com${canonical}`} hrefLang="x-default" />
          {LANGUAGES_SSR.map((userLanguage2) => (
            <link
              key={userLanguage2}
              rel="alternate"
              href={`https://material-ui.com${
                userLanguage2 === 'en' ? '/' : `/${userLanguage2}`
              }${canonical}`}
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
          <style id="prismjs" />
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
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const materialSheets = new ServerStyleSheets();
  const styledComponentsSheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />)),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCritical(initialProps.html);

    let css = materialSheets.toString();
    // It might be undefined, e.g. after an error.
    if (css && process.env.NODE_ENV === 'production') {
      const result1 = await prefixer.process(css, { from: undefined });
      css = result1.css;
      css = cleanCSS.minify(css).styles;
    }

    return {
      ...initialProps,
      canonical: pathnameToLanguage(ctx.req.url).canonical,
      userLanguage: ctx.query.userLanguage || 'en',
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        <style
          id="jss-server-side"
          key="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: css }}
        />,
        <style
          id="emotion-server-side"
          key="emotion-server-side"
          data-emotion-css={emotionStyles.ids.join(' ')}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: emotionStyles.css }}
        />,
        styledComponentsSheet.getStyleElement(),
      ],
    };
  } finally {
    styledComponentsSheet.seal();
  }
};
