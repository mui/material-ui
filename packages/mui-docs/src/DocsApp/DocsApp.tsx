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
   * Docs language/SSR/i18n configuration (from docs/config.ts).
   */
  config: DocsConfig;
  /**
   * Path to the service worker file, e.g. '/sw.js' or '/x/sw.js'.
   */
  serviceWorkerPath: string;
  /**
   * The resolved page context value (activePage, pages, productIdentifier, etc.).
   * Computed by each project since the pages and product info differ.
   */
  pageContextValue: MuiPageContext;
  /**
   * The resolved demo context value (product display name, sandbox config, etc.).
   * Computed by each project since demo configuration differs.
   */
  demoContextValue: DemoContextValue;
  /**
   * Optional ad configuration. material-ui passes { GADisplayRatio: 0.1 }.
   */
  adConfig?: Partial<AdConfig>;
  /**
   * Optional wrapper component around the themed content.
   * Defaults to ThemeProvider from @mui/docs/ThemeContext.
   * Pass React.Fragment to disable theming (e.g. for playground routes).
   */
  ThemeWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

function DocsApp(props: DocsAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    config,
    serviceWorkerPath,
    pageContextValue,
    demoContextValue,
    adConfig,
    ThemeWrapper = ThemeProvider,
  } = props;

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
        <meta name="mui:productId" content={pageContextValue.productId} />
        <meta name="mui:productCategoryId" content={pageContextValue.productCategoryId} />
      </NextHead>
      <DocsProvider
        config={config}
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
