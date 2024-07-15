import * as React from 'react';
import Script from 'next/script';
import { documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';
import { ServerStyleSheets as JSSServerStyleSheets } from '@mui/styles';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import GlobalStyles from '@mui/material/GlobalStyles';
import MuiInitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import JoyInitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import createEmotionCache from 'docs/src/createEmotionCache';
import { getMetaThemeColor } from '@mui/docs/branding';

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

const PRODUCTION_GA =
  process.env.DEPLOY_ENV === 'production' || process.env.DEPLOY_ENV === 'staging';

const GOOGLE_ANALYTICS_ID_V4 = PRODUCTION_GA ? 'G-5NXDQLC2ZK' : 'G-XJ83JQEK7J';

export default class MyDocument extends Document {
  render() {
    const { canonicalAsServer, userLanguage } = this.props;

    return (
      <Html lang={userLanguage} data-mui-color-scheme="light" data-joy-color-scheme="light">
        <Head>
          {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
          <link rel="manifest" href="/static/manifest.json" />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={getMetaThemeColor('light')}
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content={getMetaThemeColor('dark')}
            media="(prefers-color-scheme: dark)"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          {/* iOS Icon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/180x180.png" />
          {/* SEO */}
          <link
            rel="canonical"
            href={`https://mui.com${
              userLanguage === 'en' ? '' : `/${userLanguage}`
            }${canonicalAsServer}`}
          />
          <link rel="alternate" href={`https://mui.com${canonicalAsServer}`} hrefLang="x-default" />
          {/*
            Preconnect allows the browser to setup early connections before an HTTP request
            is actually sent to the server.
            This includes DNS lookups, TLS negotiations, TCP handshakes.
          */}
          <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
            rel="stylesheet"
          />
          {/* ========== Font preload (prevent font flash) ============= */}
          <link
            rel="preload"
            // optimized for english characters (40kb -> 6kb)
            href="/static/fonts/GeneralSans-Semibold-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            // the above <link> does not work in mobile device, this inline <style> fixes it without blocking resources
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `@font-face{font-family:'General Sans';font-style:normal;font-weight:600;font-display:swap;src:url('/static/fonts/GeneralSans-Semibold-subset.woff2') format('woff2');}`,
            }}
          />
          <link
            rel="preload"
            // optimized for english characters (40kb -> 6kb)
            href="/static/fonts/IBMPlexSans-Regular-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            // the above <link> does not work in mobile device, this inline <style> fixes it without blocking resources
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:400;font-display:swap;src:url('/static/fonts/IBMPlexSans-Regular-subset.woff2') format('woff2');}`,
            }}
          />
          {/* =========================================================== */}
          <style
            // Loads General Sans: Regular (400), Medium (500), SemiBold (600), Bold (700)
            // Typeface documentation: https://www.fontshare.com/fonts/general-sans
            // use https://cssminifier.com/ to minify
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              @font-face{font-family:'General Sans';src:url(/static/fonts/GeneralSans-Regular.woff2) format('woff2'),url(/static/fonts/GeneralSans-Regular.ttf) format('truetype');font-weight:400;font-style:normal;font-display:swap;}

              @font-face{font-family:'General Sans';src:url(/static/fonts/GeneralSans-Medium.woff2) format('woff2'),url(/static/fonts/GeneralSans-Medium.ttf) format('truetype');font-weight:500;font-style:normal;font-display:swap;}

              @font-face{font-family:'General Sans';src:url(/static/fonts/GeneralSans-SemiBold.woff2) format('woff2'),url(/static/fonts/GeneralSans-SemiBold.ttf) format('truetype');font-weight:600;font-style:normal;font-display:swap;}

              @font-face{font-family:'General Sans';src:url(/static/fonts/GeneralSans-Bold.woff2) format('woff2'),url(/static/fonts/GeneralSans-Bold.ttf) format('truetype');font-weight:700;font-style:normal;font-display:swap;}`,
            }}
          />
          <style
            // Loads IBM Plex Sans: 400,500,700 & IBM Plex Mono: 400, 600
            // use https://cssminifier.com/ to minify
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              @font-face{font-family:'IBM Plex Sans';src:url(/static/fonts/IBMPlexSans-Regular.woff2) format('woff2'),url(/static/fonts/IBMPlexSans-Regular.woff) format('woff'),url(/static/fonts/IBMPlexSans-Regular.ttf) format('truetype');font-weight:400;font-style:normal;font-display:swap}

              @font-face{font-family:'IBM Plex Sans';src:url(/static/fonts/IBMPlexSans-Medium.woff2) format('woff2'),url(/static/fonts/IBMPlexSans-Medium.woff) format('woff'),url(/static/fonts/IBMPlexSans-Medium.ttf) format('truetype');font-weight:500;font-style:normal;font-display:swap}

              @font-face{font-family:'IBM Plex Sans';src:url(/static/fonts/IBMPlexSans-SemiBold.woff2) format('woff2'),url(/static/fonts/IBMPlexSans-SemiBold.woff) format('woff'),url(/static/fonts/IBMPlexSans-SemiBold.ttf) format('truetype');font-weight:600;font-style:normal;font-display:swap}

              @font-face{font-family:'IBM Plex Sans';src:url(/static/fonts/IBMPlexSans-Bold.woff2) format('woff2'),url(/static/fonts/IBMPlexSans-Bold.woff) format('woff'),url(/static/fonts/IBMPlexSans-Bold.ttf) format('truetype');font-weight:700;font-style:normal;font-display:swap}`,
            }}
          />
          <GlobalStyles
            styles={{
              // First SSR paint
              '.only-light-mode': {
                display: 'block',
              },
              '.only-dark-mode': {
                display: 'none',
              },
              // Post SSR Hydration
              '.mode-dark .only-light-mode': {
                display: 'none',
              },
              '.mode-dark .only-dark-mode': {
                display: 'block',
              },
              // TODO migrate to .only-dark-mode to .only-dark-mode-v2
              '[data-mui-color-scheme="light"] .only-dark-mode-v2': {
                display: 'none',
              },
              '[data-mui-color-scheme="dark"] .only-light-mode-v2': {
                display: 'none',
              },
              '.plan-pro, .plan-premium': {
                display: 'inline-block',
                height: '1em',
                width: '1em',
                verticalAlign: 'middle',
                marginLeft: '0.3em',
                marginBottom: '0.08em',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                flexShrink: 0,
              },
              '.plan-pro': {
                backgroundImage: 'url(/static/x/pro.svg)',
              },
              '.plan-premium': {
                backgroundImage: 'url(/static/x/premium.svg)',
              },
            }}
          />
        </Head>
        <body>
          <MuiInitColorSchemeScript defaultMode="system" />
          <JoyInitColorSchemeScript defaultMode="system" />
          <Main />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ANALYTICS_ID_V4}', {
  send_page_view: false,
});
`,
            }}
          />
          {/**
           * A better alternative to <script async>, to delay its execution
           * https://developer.chrome.com/blog/script-component/
           */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID_V4}`}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const jssSheets = new JSSServerStyleSheets();
  const styledComponentsSheet = new ServerStyleSheet();

  try {
    const finalProps = await documentGetInitialProps(ctx, {
      emotionCache: createEmotionCache(),
      plugins: [
        {
          // styled-components
          enhanceApp: (App) => (props) => styledComponentsSheet.collectStyles(<App {...props} />),
          resolveProps: async (initialProps) => ({
            ...initialProps,
            styles: [styledComponentsSheet.getStyleElement(), ...initialProps.styles],
          }),
        },
        {
          // JSS
          enhanceApp: (App) => (props) => jssSheets.collect(<App {...props} />),
          resolveProps: async (initialProps) => {
            let css = jssSheets.toString();
            // It might be undefined, for example after an error.
            if (css && process.env.NODE_ENV === 'production') {
              const result1 = await prefixer.process(css, { from: undefined });
              css = result1.css;
              css = cleanCSS.minify(css).styles;
            }

            return {
              ...initialProps,
              styles: [
                ...initialProps.styles,
                <style
                  id="jss-server-side"
                  key="jss-server-side"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: css }}
                />,
                <style id="insertion-point-jss" key="insertion-point-jss" />,
              ],
            };
          },
        },
      ],
    });

    // All the URLs should have a leading /.
    // This is missing in the Next.js static export.
    let url = ctx.req.url;
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    return {
      ...finalProps,
      canonicalAsServer: pathnameToLanguage(url).canonicalAsServer,
      userLanguage: ctx.query.userLanguage || 'en',
      styles: [
        <style id="material-icon-font" key="material-icon-font" />,
        <style id="font-awesome-css" key="font-awesome-css" />,
        ...finalProps.emotionStyleTags,
        <style id="app-search" key="app-search" />,
        <style id="prismjs" key="prismjs" />,
        ...React.Children.toArray(finalProps.styles),
      ],
    };
  } finally {
    styledComponentsSheet.seal();
  }
};
