import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import App, { Container } from 'next/app';
import find from 'lodash/find';
import { Provider } from 'react-redux';
import AppWrapper from 'docs/src/modules/components/AppWrapper';
import initRedux from 'docs/src/modules/redux/initRedux';
import findPages from /* preval */ 'docs/src/modules/utils/findPages';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import PageContext from 'docs/src/modules/components/PageContext';
import getPageContext from 'docs/src/modules/styles/getPageContext';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import loadScript from 'docs/src/modules/utils/loadScript';

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#insertion-point-jss'),
  );
  loadScript('https://www.google-analytics.com/analytics.js', document.querySelector('head'));
}

const pages = [
  {
    pathname: '/getting-started',
    children: [
      {
        pathname: '/getting-started/installation',
      },
      {
        pathname: '/getting-started/usage',
      },
      {
        pathname: '/getting-started/example-projects',
      },
      {
        pathname: '/getting-started/page-layout-examples',
      },
      {
        pathname: '/getting-started/learn',
      },
      {
        pathname: '/getting-started/faq',
        title: 'Frequently Asked Questions',
      },
      {
        pathname: '/getting-started/supported-components',
      },
      {
        pathname: '/getting-started/supported-platforms',
      },
      {
        pathname: '/getting-started/comparison',
        title: 'Comparison With Other Libraries',
      },
    ],
  },
  {
    pathname: '/style',
    children: [
      {
        pathname: '/style/icons',
      },
      {
        pathname: '/style/color',
      },
      {
        pathname: '/style/typography',
      },
      {
        pathname: '/style/links',
      },
      {
        pathname: '/style/css-baseline',
        title: 'CSS Baseline',
      },
    ],
  },
  {
    pathname: '/layout',
    children: [
      {
        pathname: '/layout/basics',
      },
      {
        pathname: '/layout/grid',
      },
      {
        pathname: '/layout/breakpoints',
      },
      {
        pathname: '/layout/use-media-query',
        title: 'useMediaQuery',
      },
      {
        pathname: '/layout/hidden',
      },
    ],
  },
  {
    pathname: '/utils',
    children: [
      {
        pathname: '/utils/modal',
      },
      {
        pathname: '/utils/transitions',
      },
      {
        pathname: '/utils/popover',
      },
      {
        pathname: '/utils/popper',
      },
      {
        pathname: '/utils/portal',
      },
      {
        pathname: '/utils/no-ssr',
        title: 'No SSR',
      },
      {
        pathname: '/utils/click-away-listener',
      },
      {
        pathname: '/utils/box',
        title: 'Box (unstable)',
      },
    ],
  },
  {
    ...findPages[1],
    title: 'Component Demos',
  },
  {
    ...findPages[0],
    title: 'Component API',
  },
  {
    pathname: '/css-in-js',
    title: 'CSS in JS (alpha)',
    children: [
      {
        pathname: '/css-in-js/basics',
      },
      {
        pathname: '/css-in-js/advanced',
      },
      {
        pathname: '/css-in-js/api',
        title: 'API',
      },
    ],
  },
  {
    pathname: '/system',
    title: 'System (alpha)',
    children: [
      {
        pathname: '/system/basics',
      },
      {
        pathname: '/system/borders',
      },
      {
        pathname: '/system/display',
      },
      {
        pathname: '/system/flexbox',
      },
      {
        pathname: '/system/palette',
      },
      {
        pathname: '/system/positions',
      },
      {
        pathname: '/system/shadows',
      },
      {
        pathname: '/system/sizing',
      },
      {
        pathname: '/system/spacing',
      },
      {
        pathname: '/system/typography',
      },
      {
        pathname: '/system/api',
        title: 'API',
      },
    ],
  },
  {
    pathname: '/customization',
    children: [
      {
        pathname: '/customization/themes',
      },
      {
        pathname: '/customization/overrides',
      },
      {
        pathname: '/customization/css-in-js',
        title: 'CSS in JS',
      },
      {
        pathname: '/customization/default-theme',
        title: 'Default Theme',
      },
    ],
  },
  {
    pathname: '/guides',
    children: [
      {
        pathname: '/guides/api',
        title: 'API Design Approach',
      },
      {
        pathname: '/guides/typescript',
        title: 'TypeScript',
      },
      {
        pathname: '/guides/interoperability',
        title: 'Style Library Interoperability',
      },
      {
        pathname: '/guides/minimizing-bundle-size',
      },
      {
        pathname: '/guides/composition',
      },
      {
        pathname: '/guides/server-rendering',
      },
      {
        pathname: '/guides/migration-v0x',
        title: 'Migration From v0.x',
      },
      {
        pathname: '/guides/testing',
      },
      {
        pathname: '/guides/flow',
      },
      {
        pathname: '/guides/right-to-left',
        title: 'Right-to-left',
      },
    ],
  },
  {
    pathname: '/premium-themes',
  },
  {
    pathname: '/lab',
    children: [
      {
        pathname: '/lab/about',
        title: 'About The Lab',
      },
      {
        pathname: '/lab/slider',
      },
      {
        pathname: '/lab/speed-dial',
      },
      {
        pathname: '/lab/toggle-button',
      },
      {
        ...findPages[2].children[1],
        title: 'API',
      },
    ],
  },
  {
    pathname: '/discover-more',
    children: [
      {
        pathname: '/discover-more/showcase',
      },
      {
        pathname: '/discover-more/related-projects',
      },
      {
        pathname: '/discover-more/roadmap',
      },
      {
        pathname: '/discover-more/backers',
        title: 'Sponsors & Backers',
      },
      {
        pathname: '/discover-more/vision',
      },
      {
        pathname: '/discover-more/team',
      },
      {
        pathname: '/discover-more/community',
      },
      {
        pathname: '/discover-more/changelog',
      },
      {
        pathname: '/discover-more/governance',
      },
    ],
  },
  {
    pathname: '/versions',
    displayNav: false,
  },
  {
    pathname: '/',
    displayNav: false,
    title: false,
  },
];

function findActivePage(currentPages, router) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return router.pathname.indexOf(`${page.pathname}/`) === 0;
    }

    // Should be an exact match if no children
    return router.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== router.pathname) {
    return findActivePage(activePage.children, router);
  }

  return activePage;
}

class MyApp extends App {
  constructor(props) {
    super();
    this.redux = initRedux(props.reduxServerState || {});
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    loadDependencies();
  }

  render() {
    const { Component, pageProps, router } = this.props;

    let pathname = router.pathname;
    if (pathname !== '/') {
      // The leading / is only added to support static hosting (resolve /index.html).
      // We remove it to normalize the pathname.
      // See `_rewriteUrlForNextExport` on Next.js side.
      pathname = pathname.replace(/\/$/, '');
    }
    const activePage = findActivePage(pages, { ...router, pathname });

    // Add the strict mode back once the number of warnings is manageable.
    // We might miss important warnings by keeping the strict mode 🌊🌊🌊.
    // <React.StrictMode>
    // </React.StrictMode>

    return (
      <Container>
        <Provider store={this.redux}>
          <PageContext.Provider value={{ activePage, pages }}>
            <AppWrapper pageContext={this.pageContext}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </AppWrapper>
          </PageContext.Provider>
        </Provider>
        <GoogleAnalytics key={router.route} />
      </Container>
    );
  }
}

MyApp.getInitialProps = () => {
  let pageProps = {};

  if (!process.browser) {
    const redux = initRedux({});
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

export default MyApp;
