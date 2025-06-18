import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import { getMetaThemeColor } from '@mui/docs/branding';
import JoyInitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import MuiInitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { LANGUAGES_SSR } from 'docs/config';
import { GenerateMetadataProps } from 'docs/src/modules/utils/createMetadata';
import { defaultLanguage } from 'docs/src/modules/utils/i18n';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import * as React from 'react';
import '../public/static/components-gallery/base-theme.css';
import AppWrapper from './appWrapper';
import './global.css';

const PRODUCTION_GA =
  process.env.DEPLOY_ENV === 'production' || process.env.DEPLOY_ENV === 'staging';

const GOOGLE_ANALYTICS_ID_V4 = PRODUCTION_GA ? 'G-5NXDQLC2ZK' : 'G-XJ83JQEK7J';

export const viewport: Viewport = {
  // PWA primary color
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: getMetaThemeColor('light') },
    { media: '(prefers-color-scheme: dark)', color: getMetaThemeColor('dark') },
  ],
};

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
  return {
    icons: {
      apple: { sizes: '180x180', url: '/static/icons/180x180.png' }, // iOS Icon
      icon: '/static/favicon.ico',
    },
    /*
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    */
    manifest: '/static/manifest.json',
  };
}

export async function generateStaticParams() {
  // We want to speed-up the build of pull requests.
  // For this, consider only English language on deploy previews, except for crowdin PRs.
  if (process.env.BUILD_ONLY_ENGLISH_LOCALE === 'true') {
    console.log('Considering only English for SSR');
    return [];
  }

  console.log('Considering various locales for SSR');
  return LANGUAGES_SSR.map((l) => ({ lang: l }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  const userLanguage = lang ?? defaultLanguage;

  return (
    <html lang={userLanguage} suppressHydrationWarning>
      <body>
        <MuiInitColorSchemeScript defaultMode="system" />
        <JoyInitColorSchemeScript defaultMode="system" />
        <AppWrapper userLanguage={userLanguage}>{children}</AppWrapper>
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
