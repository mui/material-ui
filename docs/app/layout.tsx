import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import { getMetaThemeColor } from '@mui/docs/branding';
import JoyInitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import MuiInitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import getProductInfoFromUrl from 'docs/src/modules/utils/getProductInfoFromUrl';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { defaultLanguage, getUserLanguageFromMetadata } from 'docs/src/modules/utils/i18n';
import { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
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

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const userLanguage = await getUserLanguageFromMetadata(props);

  const headersList = await headers();
  const pathName = headersList.get('pathname')!;

  const canonicalAsServer = pathnameToLanguage(pathName).canonicalAsServer;
  const { productId, productCategoryId } = getProductInfoFromUrl(pathName);

  return {
    // SEO
    alternates: {
      canonical: `https://mui.com${userLanguage === defaultLanguage ? '' : `/${userLanguage}`}${canonicalAsServer}`,
      languages: { 'x-default': `https://mui.com${canonicalAsServer}` },
    },
    icons: {
      apple: { sizes: '180x180', url: '/static/icons/180x180.png' }, // iOS Icon
      icon: '/static/favicon.ico',
    },
    /*
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    */
    manifest: '/static/manifest.json',
    other: {
      'mui:productCategoryId': productCategoryId,
      'mui:productId': productId,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
