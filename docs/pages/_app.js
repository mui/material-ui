/* eslint-disable no-underscore-dangle */
import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import App, { Container } from 'next/app';
import find from 'lodash/find';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import acceptLanguage from 'accept-language';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { Router as Router2, useRouter } from 'next/router';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import pages from 'docs/src/pages';
import initRedux from 'docs/src/modules/redux/initRedux';
import PageContext from 'docs/src/modules/components/PageContext';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import loadScript from 'docs/src/modules/utils/loadScript';
import { ThemeProvider } from 'docs/src/modules/components/ThemeContext';
import { pathnameToLanguage, getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
  insertionPoint: process.browser ? document.querySelector('#insertion-point-jss') : null,
});

function useFirstRender() {
  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return firstRenderRef.current;
}

acceptLanguage.languages(['en', 'zh']);

function loadCrowdin() {
  window._jipt = [];
  window._jipt.push(['project', 'material-ui-docs']);
  loadScript('https://cdn.crowdin.com/jipt/jipt.js', document.querySelector('head'));
}

function LanguageNegotiation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userLanguage = useSelector(state => state.options.userLanguage);

  React.useEffect(() => {
    if (userLanguage === 'aa') {
      loadCrowdin();
    }
  }, [userLanguage]);

  React.useEffect(() => {
    const { userLanguage: userLanguageUrl, canonical } = pathnameToLanguage(
      Router2._rewriteUrlForNextExport(router.asPath),
    );
    const preferedLanguage =
      getCookie('userLanguage') !== 'noDefault' && userLanguage === 'en'
        ? acceptLanguage.get(navigator.language)
        : userLanguage;

    if (preferedLanguage !== userLanguage) {
      window.location = preferedLanguage === 'en' ? canonical : `/${preferedLanguage}${canonical}`;
    } else if (userLanguageUrl !== userLanguage) {
      dispatch({ type: ACTION_TYPES.OPTIONS_CHANGE, payload: { userLanguage: userLanguageUrl } });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

/**
 * Priority: on first render: navigated value, persisted value; otherwise initial value, 'JS'
 * @param {string} initialCodeVariant
 * @param {(nextCodeVariant: string) => void} codeVariantChanged
 * @returns {string} - The persisted variant if the initial value is undefined
 */
function usePersistCodeVariant(initialCodeVariant = CODE_VARIANTS.JS, codeVariantChanged) {
  const isFirstRender = useFirstRender();

  const navigatedCodeVariant = React.useMemo(() => {
    const navigatedCodeVariantMatch =
      typeof window !== 'undefined' ? window.location.hash.match(/\.(js|tsx)$/) : null;

    if (navigatedCodeVariantMatch === null) {
      return undefined;
    }

    return navigatedCodeVariantMatch[1] === 'tsx' ? CODE_VARIANTS.TS : CODE_VARIANTS.JS;
  }, []);

  const persistedCodeVariant = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return getCookie('codeVariant');
  }, []);

  /**
   * we initialize from navigation or cookies. on subsequent renders the store is the
   * truth
   */
  const codeVariant =
    isFirstRender === true
      ? navigatedCodeVariant || persistedCodeVariant || initialCodeVariant
      : initialCodeVariant;

  React.useEffect(() => {
    if (codeVariant !== initialCodeVariant) {
      codeVariantChanged(codeVariant);
    }
  });

  React.useEffect(() => {
    document.cookie = `codeVariant=${codeVariant};path=/;max-age=31536000`;
  }, [codeVariant]);

  return codeVariant;
}

function PersistState() {
  const dispatch = useDispatch();
  const options = useSelector(state => state.options);

  const codeVariant = usePersistCodeVariant(options.codeVariant, nextCodeVariant =>
    dispatch({ type: ACTION_TYPES.OPTIONS_CHANGE, payload: { codeVariant: nextCodeVariant } }),
  );

  React.useEffect(() => {
    window.ga('set', 'dimension1', codeVariant);
  }, [codeVariant]);

  React.useEffect(() => {
    window.ga('set', 'dimension2', options.userLanguage);
  }, [options.userLanguage]);

  return null;
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
    registration.installing.addEventListener('statechange', event => {
      // console.log('statechange', event.target.state);
      if (event.target.state === 'installed' && registration.waiting) {
        // A new service worker is available, inform the user
        registration.waiting.postMessage('skipWaiting');
      } else if (event.target.state === 'activated') {
        // Force the control of the page by the activated service worker.
        window.location.reload();
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
    window.location.host.indexOf('material-ui.com') <= 0
  ) {
    // register() automatically attempts to refresh the sw.js.
    const registration = await navigator.serviceWorker.register('/sw.js');
    // Force the page reload for users.
    forcePageReload(registration);
  }
}

// Add the strict mode back once the number of warnings is manageable.
// We might miss important warnings by keeping the strict mode 🌊🌊🌊.
const ReactMode =
  {
    // createSyncRoot compatible
    sync: React.StrictMode,
    // partial createRoot, ConcurrentMode is deprecated
    concurrent: React.unstable_ConcurrentMode,
  }[process.env.REACT_MODE] || React.Fragment;

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#material-icon-font'),
  );
  loadScript('https://www.google-analytics.com/analytics.js', document.querySelector('head'));
}

if (process.browser && process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(
    `%c

███╗   ███╗ █████╗ ████████╗███████╗██████╗ ██╗ █████╗ ██╗      ██╗   ██╗██╗
████╗ ████║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗██║      ██║   ██║██║
██╔████╔██║███████║   ██║   █████╗  ██████╔╝██║███████║██║█████╗██║   ██║██║
██║╚██╔╝██║██╔══██║   ██║   ██╔══╝  ██╔══██╗██║██╔══██║██║╚════╝██║   ██║██║
██║ ╚═╝ ██║██║  ██║   ██║   ███████╗██║  ██║██║██║  ██║███████╗ ╚██████╔╝██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝  ╚═════╝ ╚═╝

Tip: you can access the documentation \`theme\` object directly in the console.
`,
    'font-family:monospace;color:#1976d2;font-size:12px;',
  );
}

function findActivePage(currentPages, pathname) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      if (pathname.indexOf(`${page.pathname}/`) === 0) {
        // Check if one of the children matches (for /components)
        return findActivePage(page.children, pathname);
      }
    }

    // Should be an exact match if no children
    return pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== pathname) {
    return findActivePage(activePage.children, pathname);
  }

  return activePage;
}

function AppWrapper(props) {
  const { children, pageProps } = props;

  const router = useRouter();
  const [redux] = React.useState(() => initRedux(pageProps.reduxServerState));

  React.useEffect(() => {
    loadDependencies();
    registerServiceWorker();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  let pathname = router.pathname;
  // Add support for leading / in development mode.
  if (pathname !== '/') {
    // The leading / is only added to support static hosting (resolve /index.html).
    // We remove it to normalize the pathname.
    // See `_rewriteUrlForNextExport` on Next.js side.
    pathname = pathname.replace(/\/$/, '');
  }
  // console.log(pages, { ...router, pathname })
  const activePage = findActivePage(pages, pathname);

  let fonts = ['https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'];
  if (pathname.match(/onepirate/)) {
    fonts = [
      'https://fonts.googleapis.com/css?family=Roboto+Condensed:700|Work+Sans:300,400&display=swap',
    ];
  } else if (pathname.match(/blog/)) {
    fonts.push('https://fonts.googleapis.com/css?family=Roboto+Slab:300&display=swap');
  }

  return (
    <ReactMode>
      <Container>
        <NextHead>
          {fonts.map(font => (
            <link rel="stylesheet" href={font} key={font} />
          ))}
        </NextHead>
        <ReduxProvider store={redux}>
          <PageContext.Provider value={{ activePage, pages }}>
            <StylesProvider jss={jss}>
              <ThemeProvider>{children}</ThemeProvider>
            </StylesProvider>
          </PageContext.Provider>
          <PersistState />
          <LanguageNegotiation />
        </ReduxProvider>
      </Container>
      <GoogleAnalytics key={router.route} />
    </ReactMode>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppWrapper pageProps={pageProps}>
        <Component {...pageProps} />
      </AppWrapper>
    );
  }
}

MyApp.getInitialProps = ({ ctx }) => {
  let pageProps = {};

  if (!process.browser) {
    const redux = initRedux({
      options: {
        userLanguage: ctx.query.userLanguage,
      },
    });
    pageProps = {
      // No need to include other initial Redux state because when it
      // initialises on the client-side it'll create it again anyway
      reduxServerState: redux.getState(),
    };
  }

  return {
    pageProps,
  };
};
