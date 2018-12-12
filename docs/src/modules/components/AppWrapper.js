/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import url from 'url';
import acceptLanguage from 'accept-language';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { lightTheme, darkTheme, setPrismTheme } from '@material-ui/docs/MarkdownElement/prism';
import getPageContext, { updatePageContext } from 'docs/src/modules/styles/getPageContext';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES } from 'docs/src/modules/constants';

acceptLanguage.languages(['en', 'zh']);

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

class AppWrapper extends React.Component {
  state = {};

  componentDidMount() {
    themeSideEffect(this.props.reduxTheme);

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production' &&
      window.location.host.indexOf('material-ui.com') <= 0
    ) {
      navigator.serviceWorker.register('/sw.js');
    }

    const { options, reduxTheme } = this.props;

    const paletteType = getCookie('paletteType');
    const paletteColors = getCookie('paletteColors');

    if (reduxTheme.paletteType !== paletteType || reduxTheme.paletteColors !== paletteColors) {
      this.props.dispatch({
        type: ACTION_TYPES.THEME_CHANGE,
        payload: {
          paletteType,
          paletteColors: paletteColors ? JSON.parse(paletteColors) : null,
        },
      });
    }

    const URL = url.parse(document.location.href, true);
    const userLanguage = acceptLanguage.get(
      URL.query.lang || getCookie('lang') || navigator.language || 'en',
    );

    const codeVariant = getCookie('codeVariant');

    if (options.userLanguage !== userLanguage || options.codeVariant !== codeVariant) {
      this.props.dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          userLanguage,
          codeVariant,
        },
      });
    }
  }

  componentDidUpdate() {
    themeSideEffect(this.props.reduxTheme);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.pageContext === 'undefined') {
      return {
        prevProps: nextProps,
        pageContext: nextProps.pageContext || getPageContext(),
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
    const { children, options } = this.props;
    const { pageContext } = this.state;

    return (
      <StylesProvider
        generateClassName={pageContext.generateClassName}
        jss={pageContext.jss}
        sheetsManager={pageContext.sheetsManager}
        sheetsRegistry={pageContext.sheetsRegistry}
      >
        <ThemeProvider theme={pageContext.theme}>
          {React.cloneElement(children, {
            lang: options.userLanguage === 'en' ? '' : `-${options.userLanguage}`,
          })}
        </ThemeProvider>
        <GoogleAnalytics />
      </StylesProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  pageContext: PropTypes.object,
  reduxTheme: PropTypes.object.isRequired,
};

export default connect(state => ({
  options: state.options,
  reduxTheme: state.theme,
}))(AppWrapper);
