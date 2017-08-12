// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import pure from 'recompose/pure';
import wrapDisplayName from 'recompose/wrapDisplayName';
import AppWrapper from 'docs/src/modules/components/AppWrapper';
import initRedux from 'docs/src/modules/redux/initRedux';
import findPages from /* preval */ 'docs/src/modules/utils/findPages';

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
        pathname: '/getting-started/examples',
      },
      {
        pathname: '/getting-started/supported-components',
      },
      {
        pathname: '/getting-started/supported-platforms',
      },
    ],
  },
  {
    pathname: '/customization',
    children: [
      {
        pathname: '/customization/overrides',
      },
      {
        pathname: '/customization/themes',
      },
      {
        pathname: '/customization/css-in-js',
        title: 'CSS in JS',
      },
      {
        pathname: '/customization/api',
        title: 'API',
      },
    ],
  },
  {
    pathname: '/guides',
    children: [
      {
        pathname: '/guides/composition',
      },
      {
        pathname: '/guides/minimizing-bundle-size',
      },
      {
        pathname: '/guides/server-rendering',
      },
      {
        pathname: '/guides/testing',
      },
    ],
  },
  {
    pathname: '/style',
    children: [
      {
        pathname: '/style/color',
      },
      {
        pathname: '/style/icons',
      },
      {
        pathname: '/style/typography',
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
        pathname: '/layout/hidden',
      },
      {
        pathname: '/layout/css-in-js',
        title: 'CSS in JS',
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
    pathname: '/discover-more',
    children: [
      {
        pathname: '/discover-more/vision',
      },
      {
        pathname: '/discover-more/community',
      },
      {
        pathname: '/discover-more/showcase',
      },
      {
        pathname: '/discover-more/related-projects',
      },
    ],
  },
  {
    pathname: '/',
    title: false,
  },
];

function findActivePage(currentPages, url) {
  const activePage = currentPages.find(page => {
    if (page.children) {
      return url.pathname.indexOf(page.pathname) !== -1;
    }

    // Should be an exact match if no children
    return url.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== url.pathname) {
    return findActivePage(activePage.children, url);
  }

  return activePage;
}

function withRoot(BaseComponent) {
  // Prevent rerendering
  const PureBaseComponent = pure(BaseComponent);

  class WithRoot extends Component {
    static getInitialProps(ctx) {
      let initialProps = {};
      const redux = initRedux({});

      if (BaseComponent.getInitialProps) {
        const baseComponentInitialProps = BaseComponent.getInitialProps({ ...ctx, redux });
        initialProps = {
          ...baseComponentInitialProps,
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
    }

    constructor(props) {
      super(props);
      this.redux = initRedux(this.props.reduxServerState);
    }

    getChildContext() {
      return {
        url: this.props.url ? this.props.url : null,
        pages,
        activePage: findActivePage(pages, this.props.url),
      };
    }

    redux = null;

    render() {
      return (
        <Provider store={this.redux}>
          <AppWrapper>
            <PureBaseComponent initialProps={this.props} />
          </AppWrapper>
        </Provider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  WithRoot.propTypes = {
    reduxServerState: PropTypes.object,
    url: PropTypes.object.isRequired,
  };

  WithRoot.childContextTypes = {
    url: PropTypes.object,
    pages: PropTypes.array,
    activePage: PropTypes.object,
  };

  return WithRoot;
}

export default withRoot;
