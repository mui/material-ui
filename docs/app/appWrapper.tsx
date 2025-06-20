'use client';
import { CodeCopyProvider } from '@mui/docs/CodeCopy';
import { DocsProvider } from '@mui/docs/DocsProvider';
import { useRouter } from '@mui/docs/routing';
import joyPkgJson from '@mui/joy/package.json';
import materialPkgJson from '@mui/material/package.json';
import systemPkgJson from '@mui/system/package.json';
import { LicenseInfo } from '@mui/x-license';
import docsInfraPages from 'docs/data/docs-infra/pages';
import generalDocsPages from 'docs/data/docs/pages';
import joyPages from 'docs/data/joy/pages';
import materialPages from 'docs/data/material/pages';
import systemPages from 'docs/data/system/pages';
import SvgMuiLogomark, {
  muiSvgLogoString,
  muiSvgWordmarkString,
} from 'docs/src/icons/SvgMuiLogomark';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import PageContext from 'docs/src/modules/components/PageContext';
import { ThemeProvider } from 'docs/src/modules/components/ThemeContext';
import { CodeVariantProvider } from 'docs/src/modules/utils/codeVariant';
import findActivePage from 'docs/src/modules/utils/findActivePage';
import getProductInfoFromUrl from 'docs/src/modules/utils/getProductInfoFromUrl';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { defaultLanguage, getTranslations } from 'docs/src/modules/utils/i18n';
import DocsStyledEngineProvider from 'docs/src/modules/utils/StyledEngineProviderApp';
import { loadCSS } from 'fg-loadcss';
import * as React from 'react';
import ReactDOM from 'react-dom';
import * as config from '../config';

interface Props {
  children: React.ReactNode;
  userLanguage: string;
}

// Remove the license warning from demonstration purposes
LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_LICENSE!);

let reloadInterval: number;

// Avoid infinite loop when "Upload on reload" is set in the Chrome sw dev tools.
function lazyReload() {
  window.clearInterval(reloadInterval);
  reloadInterval = window.setInterval(() => {
    if (document.hasFocus()) {
      window.location.reload();
    }
  }, 100);
}

// Inspired by
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
function forcePageReload(registration: ServiceWorkerRegistration) {
  if (!navigator.serviceWorker.controller) {
    // The window client isn't currently controlled so it's a new service
    // worker that will activate immediately.
    return;
  }

  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    registration.waiting.postMessage('skipWaiting');
    return;
  }

  function listenInstalledStateChange() {
    registration.installing!.addEventListener('statechange', (event) => {
      const target = event.target as unknown as { state: string };

      if (target.state === 'installed' && registration.waiting) {
        // A new service worker is available, inform the user
        registration.waiting.postMessage('skipWaiting');
      } else if (target.state === 'activated') {
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
    window.location.host.includes('mui.com')
  ) {
    // register() automatically attempts to refresh the sw.js.
    const registration = await navigator.serviceWorker.register('/sw.js');
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
    document.querySelector('#material-icon-font') as HTMLElement,
  );
}

/**
 * Preconnect allows the browser to setup early connections before an HTTP request
   is actually sent to the server.
   This includes DNS lookups, TLS negotiations, TCP handshakes.
 */
function preconnectResources() {
  ReactDOM.preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' });
  ReactDOM.preconnect('https://fonts.googleapis.com');
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

export default function AppWrapper(props: Props) {
  const { children, userLanguage } = props;

  const router = useRouter();
  const translations = getTranslations();

  // TODO move productId & productCategoryId resolution to page layout.
  // We should use the productId field from the markdown and fallback to getProductInfoFromUrl()
  // if not present
  const { productId, productCategoryId } = getProductInfoFromUrl(router.pathname);

  React.useEffect(() => {
    loadDependencies();
    registerServiceWorker();
    preconnectResources();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const productIdentifier = React.useMemo(() => {
    const languagePrefix = userLanguage === defaultLanguage ? '' : `/${userLanguage}`;

    if (productId === 'material-ui') {
      return {
        metadata: '',
        name: 'Material UI',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${materialPkgJson.version}`, current: true },
          {
            text: 'v6',
            href: `https://v6.mui.com${languagePrefix}/material-ui/getting-started/`,
          },
          {
            text: 'v5',
            href: `https://v5.mui.com${languagePrefix}/getting-started/installation/`,
          },
          {
            text: 'v4',
            href: `https://v4.mui.com${languagePrefix}/getting-started/installation/`,
          },
          {
            text: 'View all versions',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    if (productId === 'joy-ui') {
      return {
        metadata: '',
        name: 'Joy UI',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [{ text: `v${joyPkgJson.version}`, current: true }],
      };
    }

    if (productId === 'system') {
      return {
        metadata: '',
        name: 'MUI System',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${systemPkgJson.version}`, current: true },
          { text: 'v6', href: `https://v6.mui.com${languagePrefix}/system/getting-started/` },
          { text: 'v5', href: `https://v5.mui.com${languagePrefix}/system/getting-started/` },
          { text: 'v4', href: `https://v4.mui.com${languagePrefix}/system/basics/` },
          {
            text: 'View all versions',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    if (productId === 'docs-infra') {
      return {
        metadata: '',
        name: 'Docs-infra',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          {
            text: 'v0.0.0',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    if (productId === 'docs') {
      return {
        metadata: '',
        name: 'Home docs',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          {
            text: 'v0.0.0',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    return null;
  }, [userLanguage, productId]);

  const pageContextValue = React.useMemo(() => {
    let pages = generalDocsPages;
    if (productId === 'material-ui') {
      pages = materialPages;
    } else if (productId === 'joy-ui') {
      pages = joyPages;
    } else if (productId === 'system') {
      pages = systemPages;
    } else if (productId === 'docs-infra') {
      pages = docsInfraPages;
    }

    const { activePage, activePageParents } = findActivePage([...pages], router.pathname);

    return {
      activePage,
      activePageParents,
      pages: [...pages],
      productIdentifier: productIdentifier!,
      productId,
      productCategoryId,
    };
  }, [productId, productCategoryId, productIdentifier, router.pathname]);

  let fonts: string[] = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap',
  ];
  if (pathnameToLanguage(router.pathname).canonicalAs.match(/onepirate/)) {
    fonts = [
      'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Work+Sans:wght@300;400&display=swap',
    ];
  }

  return (
    <React.Fragment>
      {fonts.map((font) => (
        <link rel="stylesheet" href={font} key={font} />
      ))}
      <meta name="mui:productId" content={productId} />
      <meta name="mui:productCategoryId" content={productCategoryId} />
      <DocsProvider
        config={config}
        adConfig={{ GADisplayRatio: 0.1 }}
        defaultUserLanguage={userLanguage}
        translations={translations}
      >
        <CodeCopyProvider>
          <CodeVariantProvider>
            <PageContext.Provider value={pageContextValue}>
              <ThemeProvider>
                <DocsStyledEngineProvider>
                  {children}
                  <GoogleAnalytics />
                </DocsStyledEngineProvider>
              </ThemeProvider>
            </PageContext.Provider>
          </CodeVariantProvider>
        </CodeCopyProvider>
      </DocsProvider>
    </React.Fragment>
  );
}
