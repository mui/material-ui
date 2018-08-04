import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import AppWrapper from 'docs/src/modules/components/AppWrapper';
import initRedux from 'docs/src/modules/redux/initRedux';
import findPages from /* preval */ 'docs/src/modules/utils/findPages';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

if (process.browser) {
  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#insertion-point-jss'),
  );
  loadCSS(
    'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css',
    document.querySelector('#insertion-point-jss'),
  );
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
        pathname: '/getting-started/supported-components',
      },
      {
        pathname: '/getting-started/supported-platforms',
      },
      {
        pathname: '/getting-started/example-projects',
      },
      {
        pathname: '/getting-started/faq',
        title: 'Frequently Asked Questions',
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
      {
        pathname: '/guides/csp',
        title: 'Content Security Policy',
      },
    ],
  },
  {
    pathname: '/premium-themes',
    title: 'Premium Themes',
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
      findPages[2].children[1],
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
      return router.pathname.indexOf(page.pathname) === 0;
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

function withRoot(Component) {
  class WithRoot extends React.Component {
    redux = null;

    constructor(props) {
      super(props);

      this.redux = initRedux(this.props.reduxServerState || {});
    }

    getChildContext() {
      const { router } = this.props;

      let pathname = router.pathname;
      if (pathname !== '/') {
        // The leading / is only added to support static hosting (resolve /index.html).
        // We remove it to normalize the pathname.
        pathname = pathname.replace(/\/$/, '');
      }

      return {
        pages,
        activePage: findActivePage(pages, { ...router, pathname }),
      };
    }

    render() {
      const { pageContext, ...other } = this.props;

      return (
        <React.StrictMode>
          <Provider store={this.redux}>
            <AppWrapper pageContext={pageContext}>
              <Component initialProps={other} />
            </AppWrapper>
          </Provider>
        </React.StrictMode>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.object,
    reduxServerState: PropTypes.object,
    router: PropTypes.object.isRequired,
  };

  WithRoot.childContextTypes = {
    pages: PropTypes.array,
    activePage: PropTypes.object,
  };

  WithRoot.getInitialProps = ctx => {
    let initialProps = {};
    const redux = initRedux({});

    if (Component.getInitialProps) {
      const componentInitialProps = Component.getInitialProps({ ...ctx, redux });
      initialProps = {
        ...componentInitialProps,
        ...initialProps,
      };
    }

    if (process.browser) {
      return initialProps;
    }

    return {
      ...initialProps,
      // No need to include other initial Redux state because when it
      // initialises on the client-side it'll create it again anyway
      reduxServerState: redux.getState(),
    };
  };

  return withRouter(WithRoot);
}

export default withRoot;
