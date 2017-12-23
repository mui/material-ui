import React from 'react';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import getContext from '../styles/getContext';

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

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

function withRoot(Component) {
  class WithRoot extends React.Component {
    static getInitialProps(ctx) {
      if (Component.getInitialProps) {
        return Component.getInitialProps(ctx);
      }

      return {};
    }

    componentWillMount() {
      this.styleContext = getContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppWrapper>
            <Component {...this.props} />
          </AppWrapper>
        </MuiThemeProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
