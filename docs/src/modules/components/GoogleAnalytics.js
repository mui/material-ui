import * as React from 'react';
import loadScript from 'docs/src/modules/utils/loadScript';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNoSsrCodeVariant } from 'docs/src/modules/utils/codeVariant';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { useRouter } from 'next/router';

// So we can write code like:
//
// <Button
//   data-ga-event-category="demo"
//   data-ga-event-action="expand"
// >
//   Foo
// </Button>
function handleClick(event) {
  let element = event.target;

  while (element && element !== document) {
    const category = element.getAttribute('data-ga-event-category');

    // We reach a tracking element, no need to look higher in the dom tree.
    if (category) {
      const split = parseFloat(element.getAttribute('data-ga-event-split'));

      if (split && split < Math.random()) {
        return;
      }

      window.ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: element.getAttribute('data-ga-event-action'),
        eventLabel: element.getAttribute('data-ga-event-label'),
      });
      window.gtag('event', category, {
        eventAction: element.getAttribute('data-ga-event-action'),
        eventLabel: element.getAttribute('data-ga-event-label'),
      });
      break;
    }

    element = element.parentElement;
  }
}

let boundDataGaListener = false;

/**
 * basically just a `useAnalytics` hook.
 * However, it needs the redux store which is created
 * in the same component this "hook" is used.
 */
function GoogleAnalytics() {
  React.useEffect(() => {
    loadScript('https://www.google-analytics.com/analytics.js', document.querySelector('head'));

    if (!boundDataGaListener) {
      boundDataGaListener = true;
      document.addEventListener('click', handleClick);
    }
  }, []);

  const router = useRouter();
  const timeout = React.useRef();

  React.useEffect(() => {
    // Wait for the title to be updated.
    // React fires useEffect twice in dev mode
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      const { canonicalAsServer } = pathnameToLanguage(window.location.pathname);
      window.ga('set', { page: canonicalAsServer });
      window.ga('send', { hitType: 'pageview' });

      // https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: canonicalAsServer,
      });
    });
  }, [router.route]);

  const codeVariant = useNoSsrCodeVariant();
  React.useEffect(() => {
    window.ga('set', 'dimension1', codeVariant);
    window.gtag('set', 'user_properties', {
      codeVariant,
    });
  }, [codeVariant]);

  const userLanguage = useUserLanguage();
  React.useEffect(() => {
    window.ga('set', 'dimension2', userLanguage);
    window.gtag('set', 'user_properties', {
      userLanguage,
    });
  }, [userLanguage]);

  React.useEffect(() => {
    /**
     * Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#Monitoring_screen_resolution_or_zoom_level_changes
     * Adjusted to track 3 or more different ratios
     */
    function trackDevicePixelRation() {
      const devicePixelRatio = Math.round(window.devicePixelRatio * 10) / 10;
      window.ga('set', 'dimension3', devicePixelRatio);
      window.gtag('set', 'user_properties', {
        devicePixelRatio,
      });
    }

    trackDevicePixelRation();

    /**
     * @type {MediaQueryList}
     */
    const matchMedia = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    // Intentionally use deprecated listener methods to support iOS & old browsers
    matchMedia.addListener(trackDevicePixelRation);
    return () => {
      matchMedia.removeListener(trackDevicePixelRation);
    };
  }, []);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const colorSchemeOS = prefersDarkMode ? 'dark' : 'light';

  const theme = useTheme();
  const colorScheme = theme.palette.mode;

  React.useEffect(() => {
    window.ga('set', 'dimension4', colorSchemeOS);
    window.gtag('set', 'user_properties', {
      colorSchemeOS,
    });
  }, [colorSchemeOS]);

  React.useEffect(() => {
    window.ga('set', 'dimension5', colorScheme);
    window.gtag('set', 'user_properties', {
      colorScheme,
    });
  }, [colorScheme]);

  return null;
}

export default React.memo(GoogleAnalytics);
