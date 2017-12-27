// @flow

import React from 'react';
import type { ComponentType } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import createContext from '../styles/createContext';

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
});

let AppWrapper = (props: Object) => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

function withRoot(Component: ComponentType<*>) {
  class WithRoot extends React.Component<{}> {
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <JssProvider
          registry={context.sheetsRegistry}
          jss={context.jss}
          generateClassName={context.generateClassName}
        >
          <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
            <AppWrapper>
              <Component />
            </AppWrapper>
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
