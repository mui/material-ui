// @flow weak
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { JssProvider } from 'react-jss';
import { getContext } from 'docs/src/modules/styles/context';
import { connect } from 'react-redux';
import AppFrame from 'docs/src/modules/components/AppFrame';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/modules/utils/prism';

// Injected the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends React.Component<any, any> {
  componentWillMount() {
    this.styleContext = getContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (this.props.dark) {
      setPrismTheme(darkTheme);
    } else {
      setPrismTheme(lightTheme);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dark !== this.props.dark) {
      this.styleContext.theme = createMuiTheme({
        palette: createPalette({
          primary: blue,
          accent: pink,
          type: nextProps.dark ? 'dark' : 'light',
        }),
      });

      if (nextProps.dark) {
        setPrismTheme(darkTheme);
      } else {
        setPrismTheme(lightTheme);
      }
    }
  }

  styleContext = null;

  render() {
    const { children } = this.props;

    return (
      <JssProvider registry={this.styleContext.sheetsRegistry} jss={this.styleContext.jss}>
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppFrame>
            {children}
          </AppFrame>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool.isRequired,
};

export default connect(state => state.theme)(AppWrapper);
