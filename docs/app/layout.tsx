import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import { getMetaThemeColor } from '@mui/docs/branding';
import JoyInitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import GlobalStyles from '@mui/material/GlobalStyles';
import MuiInitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Script from 'next/script';
import * as React from 'react';
import '../public/static/components-gallery/base-theme.css';
import AppWrapper from './appWrapper';
import './global.css';

const PRODUCTION_GA =
  process.env.DEPLOY_ENV === 'production' || process.env.DEPLOY_ENV === 'staging';

const GOOGLE_ANALYTICS_ID_V4 = PRODUCTION_GA ? 'G-5NXDQLC2ZK' : 'G-XJ83JQEK7J';

/* TODO
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const userLanguage = searchParams['userLanguage'] ?? 'en';
  const canonicalAsServer = pathnameToLanguage("todo").canonicalAsServer;

  return {
    // SEO
    alternates: {
      canonical: `https://mui.com${userLanguage === 'en' ? '' : `/${userLanguage}`}${canonicalAsServer}`,
      languages: {"x-default": `https://mui.com${canonicalAsServer}`}
    },
  };
}*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
      </head>
      <body>
        <MuiInitColorSchemeScript defaultMode="system" />
        <JoyInitColorSchemeScript defaultMode="system" />
        <AppWrapper>{children}</AppWrapper>
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
      </body>
    </html>
  );
}
