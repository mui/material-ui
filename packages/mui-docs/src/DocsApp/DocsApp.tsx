import NextHead from 'next/head';
import * as React from 'react';
import type { AdConfig } from '../Ad';
import { CodeCopyProvider } from '../CodeCopy';
import type { DemoContextValue } from '../DemoContext';
import DemoContext from '../DemoContext';
import type { DocsConfig } from '../DocsProvider';
import { DocsProvider } from '../DocsProvider';
import type { MuiPageContext } from '../PageContext';
import PageContext from '../PageContext';
import { ThemeProvider } from '../ThemeContext';
import { CodeStylingProvider } from '../codeStyling';
import { CodeVariantProvider } from '../codeVariant';
import type { Translations } from '../i18n';
import { AnalyticsProvider } from './AnalyticsProvider';
import GoogleAnalytics from './GoogleAnalytics';
import DocsStyledEngineProvider from './StyledEngineProvider';
import createEmotionCache from './createEmotionCache';
import { loadDependencies } from './loadDependencies';
import { registerServiceWorker } from './serviceWorker';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface DocsAppProps {
  /**
   * The Next.js page component.
   */
  Component: React.ComponentType<any> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
  /**
   * The Emotion cache for CSS-in-JS. Falls back to a client-side cache.
   */
  emotionCache?: ReturnType<typeof createEmotionCache>;
  /**
   * Page props from Next.js, including userLanguage and translations.
   */
  pageProps: {
    userLanguage: string;
    translations: Translations;
    [key: string]: unknown;
  };
  /**
   * Docs configuration object (from docs/config.ts)
   */
  docsConfig: DocsConfig;
  /**
   * Path to the service worker file, e.g. '/sw.js'
   */
  serviceWorkerPath: string;
  /**
   * The currently active page object
   */
  activePage: MuiPageContext['activePage'];
  /**
   * The parent pages of the active page
   */
  activePageParents: MuiPageContext['activePageParents'];
  /**
   * List of all pages for the product
   */
  pageList: MuiPageContext['pages'];
  /**
   * Product metadata and branding info
   */
  productIdentifier: MuiPageContext['productIdentifier'];
  /**
   * Product identifier string (e.g. 'material-ui')
   */
  productId: MuiPageContext['productId'];
  /**
   * Product category identifier string (e.g. 'core')
   */
  productCategoryId: MuiPageContext['productCategoryId'];
  /**
   * Display name for the product (e.g. 'Material UI')
   */
  demoDisplayName: DemoContextValue['productDisplayName'];
  /**
   * CodeSandbox configuration for demos
   */
  csbConfig: DemoContextValue['csb'];
  /**
   * Optional ad configuration
   */
  adConfig?: Partial<AdConfig>;
  /**
   * Optional wrapper component for theming
   */
  ThemeWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

function DocsApp(props: DocsAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    docsConfig,
    serviceWorkerPath,
    activePage,
    activePageParents,
    pageList,
    productIdentifier,
    productId,
    productCategoryId,
    demoDisplayName,
    csbConfig,
    adConfig,
    ThemeWrapper = ThemeProvider,
  } = props;

  const pageContextValue: MuiPageContext = React.useMemo(
    () => ({
      activePage,
      activePageParents,
      pages: pageList,
      productIdentifier,
      productId,
      productCategoryId,
    }),
    [activePage, activePageParents, pageList, productIdentifier, productId, productCategoryId],
  );

  const demoContextValue: DemoContextValue = React.useMemo(
    () => ({
      productDisplayName: demoDisplayName,
      csb: csbConfig,
    }),
    [demoDisplayName, csbConfig],
  );

  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  React.useEffect(() => {
    loadDependencies();
    registerServiceWorker(serviceWorkerPath);

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="mui:productId" content={productId} />
        <meta name="mui:productCategoryId" content={productCategoryId} />
      </NextHead>
      <DocsProvider
        config={docsConfig}
        adConfig={adConfig}
        defaultUserLanguage={pageProps.userLanguage}
        translations={pageProps.translations}
      >
        <CodeCopyProvider>
          <CodeStylingProvider>
            <CodeVariantProvider>
              <PageContext.Provider value={pageContextValue}>
                <DemoContext.Provider value={demoContextValue}>
                  <ThemeWrapper>
                    <DocsStyledEngineProvider cacheLtr={emotionCache}>
                      <AnalyticsProvider>
                        {getLayout(<Component {...pageProps} />)}
                        <GoogleAnalytics />
                      </AnalyticsProvider>
                    </DocsStyledEngineProvider>
                  </ThemeWrapper>
                </DemoContext.Provider>
              </PageContext.Provider>
            </CodeVariantProvider>
          </CodeStylingProvider>
        </CodeCopyProvider>
      </DocsProvider>
    </React.Fragment>
  );
}

export { DocsApp };
