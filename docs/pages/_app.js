import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import * as React from 'react';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import acceptLanguage from 'accept-language';
import { useRouter } from 'next/router';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import pages from 'docs/src/pages';
import basePages from 'docs/data/base/pages';
import materialPages from 'docs/data/material/pages';
import joyPages from 'docs/data/joy/pages';
import systemPages from 'docs/data/system/pages';
import PageContext from 'docs/src/modules/components/PageContext';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import { CodeCopyProvider } from 'docs/src/modules/utils/CodeCopy';
import { ThemeProvider } from 'docs/src/modules/components/ThemeContext';
import { pathnameToLanguage, getCookie } from 'docs/src/modules/utils/helpers';
import { LANGUAGES } from 'docs/src/modules/constants';
import { CodeVariantProvider } from 'docs/src/modules/utils/codeVariant';
import {
  UserLanguageProvider,
  useSetUserLanguage,
  useUserLanguage,
} from 'docs/src/modules/utils/i18n';
import DocsStyledEngineProvider from 'docs/src/modules/utils/StyledEngineProvider';
import createEmotionCache from 'docs/src/createEmotionCache';
import findActivePage from 'docs/src/modules/utils/findActivePage';
import useRouterExtra from 'docs/src/modules/utils/useRouterExtra';
import { LicenseInfo } from '@mui/x-data-grid-pro';

// Remove the license warning from demonstration purposes
LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_LICENSE);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Set the locales that the documentation automatically redirects to.
acceptLanguage.languages(LANGUAGES);

function LanguageNegotiation() {
  const setUserLanguage = useSetUserLanguage();
  const router = useRouter();
  const userLanguage = useUserLanguage();

  useEnhancedEffect(() => {
    const { userLanguage: userLanguageUrl, canonicalAs } = pathnameToLanguage(router.asPath);

    // Only consider a redirection if coming to the naked folder.
    if (userLanguageUrl === 'en') {
      const preferedLanguage =
        LANGUAGES.find((lang) => lang === getCookie('userLanguage')) ||
        acceptLanguage.get(navigator.language) ||
        userLanguage;

      if (userLanguage !== preferedLanguage && !process.env.BUILD_ONLY_ENGLISH_LOCALE) {
        window.location =
          preferedLanguage === 'en' ? canonicalAs : `/${preferedLanguage}${canonicalAs}`;
      }
    }

    if (userLanguage !== userLanguageUrl) {
      setUserLanguage(userLanguageUrl);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

let reloadInterval;

// Avoid infinite loop when "Upload on reload" is set in the Chrome sw dev tools.
function lazyReload() {
  clearInterval(reloadInterval);
  reloadInterval = setInterval(() => {
    if (document.hasFocus()) {
      window.location.reload();
    }
  }, 100);
}

// Inspired by
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
function forcePageReload(registration) {
  // console.log('already controlled?', Boolean(navigator.serviceWorker.controller));

  if (!navigator.serviceWorker.controller) {
    // The window client isn't currently controlled so it's a new service
    // worker that will activate immediately.
    return;
  }

  // console.log('registration waiting?', Boolean(registration.waiting));
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    registration.waiting.postMessage('skipWaiting');
    return;
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', (event) => {
      // console.log('statechange', event.target.state);
      if (event.target.state === 'installed' && registration.waiting) {
        // A new service worker is available, inform the user
        registration.waiting.postMessage('skipWaiting');
      } else if (event.target.state === 'activated') {
        // Force the control of the page by the activated service worker.
        lazyReload();
      }
    });
  }

  if (registration.installing) {
    listenInstalledStateChange();
    return;
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange);
}

async function registerServiceWorker() {
  if (
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production' &&
    window.location.host.indexOf('mui.com') !== -1
  ) {
    // register() automatically attempts to refresh the sw.js.
    const registration = await navigator.serviceWorker.register('/sw.js');
    // Force the page reload for users.
    forcePageReload(registration);
  }
}

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Two+Tone',
    document.querySelector('#material-icon-font'),
  );
}

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(
    `%c

███╗   ███╗ ██╗   ██╗ ██████╗
████╗ ████║ ██║   ██║   ██╔═╝
██╔████╔██║ ██║   ██║   ██║
██║╚██╔╝██║ ██║   ██║   ██║
██║ ╚═╝ ██║ ╚██████╔╝ ██████╗
╚═╝     ╚═╝  ╚═════╝  ╚═════╝

Tip: you can access the documentation \`theme\` object directly in the console.
`,
    'font-family:monospace;color:#1976d2;font-size:12px;',
  );
}
function AppWrapper(props) {
  const { children, emotionCache, pageProps } = props;

  const { asPathWithoutLang, product, ...router } = useRouterExtra();

  React.useEffect(() => {
    loadDependencies();
    registerServiceWorker();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  let productPages = pages;
  if (product === 'base') {
    productPages = basePages;
  }
  if (product === 'material-ui') {
    productPages = materialPages;
  }
  if (product === 'joy-ui') {
    productPages = joyPages;
  }
  if (product === 'system') {
    productPages = systemPages;
  }

  const activePage = findActivePage(productPages, router.pathname);

  let fonts = [];
  if (asPathWithoutLang.match(/onepirate/)) {
    fonts = [
      'https://fonts.googleapis.com/css?family=Roboto+Condensed:700|Work+Sans:300,400&display=swap',
    ];
  }

  return (
    <React.Fragment>
      <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {fonts.map((font) => (
          <link rel="stylesheet" href={font} key={font} />
        ))}
      </NextHead>
      <UserLanguageProvider defaultUserLanguage={pageProps.userLanguage}>
        <LanguageNegotiation />
        <CodeCopyProvider>
          <CodeVariantProvider>
            <PageContext.Provider value={{ activePage, pages: productPages }}>
              <ThemeProvider>
                <DocsStyledEngineProvider cacheLtr={emotionCache}>
                  {children}
                  <GoogleAnalytics />
                </DocsStyledEngineProvider>
              </ThemeProvider>
            </PageContext.Provider>
          </CodeVariantProvider>
        </CodeCopyProvider>
      </UserLanguageProvider>
    </React.Fragment>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  emotionCache: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <AppWrapper emotionCache={emotionCache} pageProps={pageProps}>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps: {
      userLanguage: ctx.query.userLanguage || 'en',
      ...pageProps,
    },
  };
};

// Track fraction of actual events to prevent exceeding event quota.
// Filter sessions instead of individual events so that we can track multiple metrics per device.
const disableWebVitalsReporting = Math.random() > 0.0001;
export function reportWebVitals({ id, name, label, value }) {
  if (disableWebVitalsReporting) {
    return;
  }

  window.ga('send', 'event', {
    eventCategory: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}
