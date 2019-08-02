/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Router as Router2, useRouter } from 'next/router';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { ThemeProvider } from 'docs/src/modules/components/ThemeContext';
import { pathnameToLanguage, getCookie } from 'docs/src/modules/utils/helpers';
import acceptLanguage from 'accept-language';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';
import { create } from 'jss';
import rtl from 'jss-rtl';

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

function LanguageNegotiation() {
  const router = useRouter();
  const { userLanguage } = useSelector(state => ({
    userLanguage: state.options.userLanguage,
  }));

  React.useEffect(() => {
    const preferedLanguage =
      getCookie('userLanguage') !== 'noDefault' && userLanguage === 'en'
        ? acceptLanguage.get(navigator.language)
        : userLanguage;

    if (preferedLanguage !== userLanguage) {
      const { canonical } = pathnameToLanguage(Router2._rewriteUrlForNextExport(router.asPath));

      window.location = preferedLanguage === 'en' ? canonical : `/${preferedLanguage}${canonical}`;
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

function Tracking() {
  const dispatch = useDispatch();
  const { options } = useSelector(state => ({
    options: state.options,
  }));

  const codeVariant = usePersistCodeVariant(options.codeVariant, nextCodeVariant =>
    dispatch({ type: ACTION_TYPES.OPTIONS_CHANGE, payload: { codeVariant: nextCodeVariant } }),
  );

  React.useEffect(() => {
    window.ga('set', 'dimension1', codeVariant);
  }, [codeVariant]);

  React.useEffect(() => {
    window.ga('set', 'dimension2', options.userLanguage);
  }, [options.userLanguage]);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

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

function AppWrapper(props) {
  const { children } = props;

  React.useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider>{children}</ThemeProvider>
      <Tracking />
      <LanguageNegotiation />
    </StylesProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
