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
import { generateVersions } from '@mui/internal-core-docs/utils';
import type { ProductVersion } from '@mui/internal-core-docs/PageContext';
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

type GeneratedVersion = { version: string; url: string };

// Module-level cache so generateVersions() is only called once per process
// (once during static export, once per dev server start).
let versionsCache: GeneratedVersion[] | null = null;

function getVersionedProductPath(version: string, productId: string): string {
  const versionNumber = parseInt(version.replace('v', ''), 10);
  if (productId === 'material-ui') {
    if (versionNumber >= 6) {
      return '/material-ui/getting-started/';
    }
    if (versionNumber >= 4) {
      return '/getting-started/installation/';
    }
  }
  if (productId === 'system') {
    if (versionNumber >= 5) {
      return '/system/getting-started/';
    }
    if (versionNumber === 4) {
      return '/system/basics/';
    }
  }
  return '/';
}

function buildProductVersions(
  generatedVersions: GeneratedVersion[],
  productId: string,
  languagePrefix: string,
): ProductVersion[] {
  const MIN_VERSION = 4;
  const versions: ProductVersion[] = generatedVersions
    .filter((v) => {
      if (v.version.includes('pre-release')) {
        return false;
      }
      const vNum = parseInt(v.version.replace('v', ''), 10);
      return vNum >= MIN_VERSION;
    })
    .map((v) => {
      if (v.url === 'https://mui.com') {
        return { text: v.version, current: true };
      }
      const productPath = getVersionedProductPath(v.version, productId);
      return { text: v.version, href: `${v.url}${languagePrefix}${productPath}` };
    });

  versions.push({
    text: 'View all versions',
    href: `https://mui.com${languagePrefix}/material-ui/getting-started/versions/`,
  });

  return versions;
}

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

function useProductData(
  pageProps: DocsAppProps['pageProps'],
  generatedVersions: GeneratedVersion[],
) {
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
        versions: buildProductVersions(generatedVersions, 'material-ui', languagePrefix),
      };
    }

    if (productId === 'system') {
      return {
        metadata: '',
        name: 'MUI System',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: buildProductVersions(generatedVersions, 'system', languagePrefix),
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
        versions: buildProductVersions(generatedVersions, 'material-ui', languagePrefix),
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
  }, [pageProps.userLanguage, productId, generatedVersions]);

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
  props: AppProps<{ userLanguage: string; translations: Translations; generatedVersions?: GeneratedVersion[] }>,
) {
  const { Component, pageProps } = props;
  const generatedVersions = pageProps.generatedVersions ?? [];
  const {
    activePage,
    activePageParents,
    pages: pageList,
    productIdentifier,
    productId,
    productCategoryId,
  } = useProductData(pageProps, generatedVersions);
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

const baseGetInitialProps = createGetInitialProps({
  translationsContext: require.context('../translations', false, /\.\/translations.*\.json$/),
});

MyApp.getInitialProps = async (ctx: Parameters<typeof baseGetInitialProps>[0]) => {
  if (!versionsCache) {
    try {
      versionsCache = await generateVersions();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch versions from GitHub:', error);
      versionsCache = [];
    }
  }

  const result = await baseGetInitialProps(ctx);
  return {
    ...result,
    pageProps: {
      ...result.pageProps,
      generatedVersions: versionsCache,
    },
  };
};

export { reportWebVitals };
