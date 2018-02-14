/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext, { getTheme } from 'docs/src/modules/styles/getPageContext';
import AppFrame from 'docs/src/modules/components/AppFrame';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/modules/utils/prism';
import GoogleTag from 'docs/src/modules/components/GoogleTag';

// Inject the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends React.Component {
  componentWillMount() {
    this.pageContext = this.props.pageContext || getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (this.props.uiTheme.paletteType === 'light') {
      setPrismTheme(lightTheme);
    } else {
      setPrismTheme(darkTheme);
    }

    if (document.body) {
      document.body.dir = this.props.uiTheme.direction;
    }

    if (
      'serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    ) {
      navigator.serviceWorker.register('/sw.js');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uiTheme.paletteType !== this.props.uiTheme.paletteType ||
      nextProps.uiTheme.direction !== this.props.uiTheme.direction
    ) {
      this.pageContext.theme = getTheme(nextProps.uiTheme);

      if (nextProps.uiTheme.paletteType === 'light') {
        setPrismTheme(lightTheme);
      } else {
        setPrismTheme(darkTheme);
      }

      if (document.body) {
        document.body.dir = nextProps.uiTheme.direction;
      }
    }
  }

  context = null;

  render() {
    const { children } = this.props;

    return (
      <JssProvider
        jss={this.pageContext.jss}
        registry={this.pageContext.sheetsRegistry}
        generateClassName={this.pageContext.generateClassName}
      >
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <Reboot />
          <AppFrame>{children}</AppFrame>
          <GoogleTag />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.object,
  uiTheme: PropTypes.object.isRequired,
};

export default connect(state => ({
  uiTheme: state.theme,
}))(AppWrapper);
