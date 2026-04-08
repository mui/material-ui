import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import * as React from 'react';
import { AdConfig } from '@mui/internal-core-docs/Ad';
import { SandboxConfig } from '@mui/internal-core-docs/DemoContext';
import type { DocsAppProps } from '@mui/internal-core-docs/DocsApp';
import {
  DocsApp,
  createGetInitialProps,
  printConsoleBanner,
  reportWebVitals,
} from '@mui/internal-core-docs/DocsApp';
import findActivePage from '@mui/internal-core-docs/findActivePage';
import getProductInfoFromUrl from '@mui/internal-core-docs/getProductInfoFromUrl';
import type { Translations } from '@mui/internal-core-docs/i18n';
import type { MuiPage } from '@mui/internal-core-docs/MuiPage';
import materialPkgJson from '@mui/material/package.json';
import systemPkgJson from '@mui/system/package.json';
import { LicenseInfo } from '@mui/x-license';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import docsInfraPages from 'docs/data/docs-infra/pages';
import generalDocsPages from 'docs/data/docs/pages';
import materialPages from 'docs/data/material/pages';
import systemPages from 'docs/data/system/pages';
import SvgMuiLogomark, {
  muiSvgLogoString,
  muiSvgWordmarkString,
} from 'docs/src/icons/SvgMuiLogomark';

import * as config from '../config';
import '../public/static/components-gallery/base-theme.css';
import './global.css';

export { fontClasses } from '@mui/internal-core-docs/nextFonts';

// Remove the license warning from demonstration purposes
LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_LICENSE!);

printConsoleBanner();

/**
 * Generates root index template for Material UI demos.
 */
function getMaterialRootIndex(codeVariant: string) {
  const type = codeVariant === 'TS' ? '!' : '';
  return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`;
}

function useProductData(pageProps: DocsAppProps['pageProps']) {
  const router = useRouter();
  // TODO move productId & productCategoryId resolution to page layout.
  // We should use the productId field from the markdown and fallback to getProductInfoFromUrl()
  // if not present
  const { productId, productCategoryId } = getProductInfoFromUrl(router.asPath);

  const productIdentifier = React.useMemo(() => {
    const languagePrefix = pageProps.userLanguage === 'en' ? '' : `/${pageProps.userLanguage}`;

    if (productId === 'material-ui') {
      return {
        metadata: '',
        name: 'Material UI',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${materialPkgJson.version}`, current: true },
          {
            text: 'v7',
            href: `https://v7.mui.com${languagePrefix}/material-ui/getting-started/`,
          },
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

    if (productId === 'system') {
      return {
        metadata: '',
        name: 'MUI System',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${systemPkgJson.version}`, current: true },
          { text: 'v7', href: `https://v7.mui.com${languagePrefix}/system/getting-started/` },
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

    // TODO: 'core' is a productCategoryId, not a productId — this branch may be dead code.
    if ((productId as string) === 'core') {
      return {
        metadata: '',
        name: 'MUI Core',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${materialPkgJson.version}`, current: true },
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
  }, [pageProps.userLanguage, productId]);

  return React.useMemo(() => {
    let pages: MuiPage[] = generalDocsPages as MuiPage[];
    if (productId === 'material-ui') {
      pages = materialPages as MuiPage[];
    } else if (productId === 'system') {
      pages = systemPages as MuiPage[];
    } else if (productId === 'docs-infra') {
      pages = docsInfraPages as MuiPage[];
    }

    const { activePage, activePageParents } = findActivePage(pages, router.pathname);

    return {
      activePage,
      activePageParents,
      pages,
      productIdentifier: productIdentifier!,
      productId,
      productCategoryId,
    };
  }, [productId, productCategoryId, productIdentifier, router.pathname]);
}

const CSB_CONFIG: SandboxConfig = {
  primaryPackage: '@mui/material',
  fallbackDependency: { name: '@mui/material', version: 'latest' },
  getRootIndex: getMaterialRootIndex,
};

const GA_AD_CONFIG: AdConfig = { GADisplayRatio: 0.1 };

function useDemoDisplayName() {
  const router = useRouter();
  const { productId } = React.useMemo(() => getProductInfoFromUrl(router.asPath), [router.asPath]);
  return React.useMemo(() => {
    if (productId === 'system') {
      return 'MUI System';
    }
    if (productId?.startsWith('x-')) {
      return 'MUI X';
    }
    return 'Material UI';
  }, [productId]);
}

export default function MyApp(
  props: AppProps<{ userLanguage: string; translations: Translations }>,
) {
  const { Component, pageProps } = props;
  const {
    activePage,
    activePageParents,
    pages: pageList,
    productIdentifier,
    productId,
    productCategoryId,
  } = useProductData(pageProps);
  const demoDisplayName = useDemoDisplayName();

  return (
    <DocsApp
      {...props}
      Component={Component}
      pageProps={pageProps}
      docsConfig={config}
      serviceWorkerPath="/sw.js"
      adConfig={GA_AD_CONFIG}
      activePage={activePage}
      activePageParents={activePageParents}
      pageList={pageList}
      productIdentifier={productIdentifier}
      productId={productId}
      productCategoryId={productCategoryId}
      demoDisplayName={demoDisplayName}
      csbConfig={CSB_CONFIG}
    />
  );
}

MyApp.getInitialProps = createGetInitialProps({
  translationsContext: require.context('docs/translations', false, /\.\/translations.*\.json$/),
});

export { reportWebVitals };
