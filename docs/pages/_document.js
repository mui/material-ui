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

const isProd =
  process.env.DEPLOY_ENV === 'production' ||
  process.env.DEPLOY_ENV === 'staging';

const GA_ID = isProd ? 'G-5NXDQLC2ZK' : 'G-XJ83JQEK7J';

// Reusable helper: prevents duplicate inline blocks
const fontFace = (family, weight, file) => `
  @font-face {
    font-family: '${family}';
    src: url('/static/fonts/${file}.woff2') format('woff2');
    font-weight: ${weight};
    font-style: normal;
    font-display: swap;
  }
`;

export default class MyDocument extends Document {
  render() {
    const { canonicalAsServer, userLanguage } = this.props;

    return (
      <Html lang={userLanguage} data-mui-color-scheme="light" data-joy-color-scheme="light">
        <Head>

          {/* Manifest + Icons */}
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/180x180.png" />

          {/* Theme colors */}
          <meta name="theme-color" content={getMetaThemeColor('light')} media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content={getMetaThemeColor('dark')} media="(prefers-color-scheme: dark)" />

          {/* SEO */}
          <link
            rel="canonical"
            href={`https://mui.com${userLanguage === 'en' ? '' : `/${userLanguage}`}${canonicalAsServer}`}
          />
          <link rel="alternate" href={`https://mui.com${canonicalAsServer}`} hrefLang="x-default" />

          {/* Preconnect + Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          {/* Preload key fonts */}
          <link
            rel="preload"
            href="/static/fonts/GeneralSans-Semibold-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/fonts/IBMPlexSans-Regular-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Inline font-face fixes for mobile */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                ${fontFace('General Sans', 600, 'GeneralSans-Semibold-subset')}
                ${fontFace('IBM Plex Sans', 400, 'IBMPlexSans-Regular-subset')}
              `,
            }}
          />

          {/* Full font families */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                ${fontFace('General Sans', 400, 'GeneralSans-Regular')}
                ${fontFace('General Sans', 500, 'GeneralSans-Medium')}
                ${fontFace('General Sans', 600, 'GeneralSans-SemiBold')}
                ${fontFace('General Sans', 700, 'GeneralSans-Bold')}

                ${fontFace('IBM Plex Sans', 400, 'IBMPlexSans-Regular')}
                ${fontFace('IBM Plex Sans', 500, 'IBMPlexSans-Medium')}
                ${fontFace('IBM Plex Sans', 600, 'IBMPlexSans-SemiBold')}
                ${fontFace('IBM Plex Sans', 700, 'IBMPlexSans-Bold')}
              `,
            }}
          />

          {/* Global UI fixes */}
          <GlobalStyles
            styles={{
              '.only-light-mode': { display: 'block' },
              '.only-dark-mode': { display: 'none' },
              '.mode-dark .only-light-mode': { display: 'none' },
              '.mode-dark .only-dark-mode': { display: 'block' },

              '[data-mui-color-scheme="light"] .only-dark-mode-v2': { display: 'none' },
              '[data-mui-color-scheme="dark"] .only-light-mode-v2': { display: 'none' },

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
              '.plan-pro': { backgroundImage: 'url(/static/x/pro.svg)' },
              '.plan-premium': { backgroundImage: 'url(/static/x/premium.svg)' },
            }}
          />
        </Head>

        <body>
          <MuiInitColorSchemeScript defaultMode="system" />
          <JoyInitColorSchemeScript defaultMode="system" />

          <Main />

          {/* Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: false });
              `,
            }}
          />

          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />

          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const styledSheet = new ServerStyleSheet();

  try {
    const final = await documentGetInitialProps(ctx, {
      emotionCache: createEmotionCache(),
      plugins: [
        {
          enhanceApp: (App) => (props) => styledSheet.collectStyles(<App {...props} />),
          resolveProps: (initialProps) => ({
            ...initialProps,
            styles: [styledSheet.getStyleElement(), ...initialProps.styles],
          }),
        },
      ],
    });

    let url = ctx.req.url;
    if (!url.endsWith('/')) url += '/';

    return {
      ...final,
      canonicalAsServer: pathnameToLanguage(url).canonicalAsServer,
      userLanguage: ctx.query.userLanguage || 'en',
      styles: [
        <style id="material-icon-font" key="material-icon-font" />,
        <style id="font-awesome-css" key="font-awesome-css" />,
        ...final.emotionStyleTags,
        <style id="app-search" key="app-search" />,
        <style id="prismjs" key="prismjs" />,
        ...React.Children.toArray(final.styles),
      ],
    };
  } finally {
    styledSheet.seal();
  }
};
