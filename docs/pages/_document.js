import * as React from 'react';
import Script from 'next/script';
import { documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import GlobalStyles from '@mui/material/GlobalStyles';
import MuiInitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import JoyInitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import createEmotionCache from 'docs/src/createEmotionCache';
import { getMetaThemeColor } from '@mui/docs/branding';
import { fontClasses } from './_app';

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
          <link rel="icon" href="/static/favicon.ico" />
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
                height: '0.9em',
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
        <body className={fontClasses}>
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
