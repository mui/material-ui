/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import url from 'url';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import acceptLanguage from 'accept-language';
import { lightTheme, darkTheme, setPrismTheme } from '@material-ui/docs/MarkdownElement/prism';
import { updatePageContext } from 'docs/src/modules/styles/getPageContext';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';

// Inject the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

function themeSideEffect(reduxTheme) {
  setPrismTheme(reduxTheme.paletteType === 'light' ? lightTheme : darkTheme);
  document.body.dir = reduxTheme.direction;
}

acceptLanguage.languages(['en', 'zh']);

class SideEffectsRaw extends React.Component {
  componentDidMount() {
    const { options } = this.props;

    const URL = url.parse(document.location.href, true);
    const userLanguage = acceptLanguage.get(
      URL.query.lang || getCookie('lang') || navigator.language,
    );
    const codeVariant = getCookie('codeVariant');

    if (
      (userLanguage && options.userLanguage !== userLanguage) ||
      (codeVariant && options.codeVariant !== codeVariant)
    ) {
      window.ga('set', 'dimension1', codeVariant);
      window.ga('set', 'dimension2', userLanguage);
      this.props.dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          userLanguage,
          codeVariant,
        },
      });
    } else {
      window.ga('set', 'dimension1', CODE_VARIANTS.JS);
      window.ga('set', 'dimension2', 'en');
    }
  }

  render() {
    return null;
  }
}

SideEffectsRaw.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

const SideEffects = connect(state => ({
  options: state.options,
}))(SideEffectsRaw);

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

class AppWrapper extends React.Component {
  state = {};

  componentDidMount() {
    themeSideEffect(this.props.reduxTheme);

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const { reduxTheme } = this.props;

    const paletteType = getCookie('paletteType');
    const paletteColors = getCookie('paletteColors');

    if (
      (paletteType && reduxTheme.paletteType !== paletteType) ||
      (paletteColors && JSON.stringify(reduxTheme.paletteColors) !== paletteColors)
    ) {
      this.props.dispatch({
        type: ACTION_TYPES.THEME_CHANGE,
        payload: {
          paletteType,
          paletteColors: paletteColors ? JSON.parse(paletteColors) : null,
        },
      });
    }

    registerServiceWorker();
  }

  componentDidUpdate() {
    themeSideEffect(this.props.reduxTheme);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.pageContext === 'undefined') {
      return {
        prevProps: nextProps,
        pageContext: nextProps.pageContext,
      };
    }

    const { prevProps } = prevState;

    if (
      nextProps.reduxTheme.paletteType !== prevProps.reduxTheme.paletteType ||
      nextProps.reduxTheme.paletteColors !== prevProps.reduxTheme.paletteColors ||
      nextProps.reduxTheme.direction !== prevProps.reduxTheme.direction
    ) {
      return {
        prevProps: nextProps,
        pageContext: updatePageContext(nextProps.reduxTheme),
      };
    }

    return null;
  }

  render() {
    const { children } = this.props;
    const { pageContext } = this.state;

    return (
      <StylesProvider
        generateClassName={pageContext.generateClassName}
        jss={pageContext.jss}
        sheetsManager={pageContext.sheetsManager}
        sheetsRegistry={pageContext.sheetsRegistry}
      >
        <MuiThemeProvider theme={pageContext.theme}>{children}</MuiThemeProvider>
        <SideEffects />
      </StylesProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  pageContext: PropTypes.object,
  reduxTheme: PropTypes.object.isRequired,
};

export default connect(state => ({
  reduxTheme: state.theme,
}))(AppWrapper);
