import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getPageContext from './getPageContext';

function withRoot(Component) {
  class WithRoot extends React.Component {
    muiPageContext = null;

    constructor(props) {
      super(props);
      this.muiPageContext = props.muiPageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#server-side-jss');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.muiPageContext.theme}
          sheetsManager={this.muiPageContext.sheetsManager}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.propTypes = {
    muiPageContext: PropTypes.object,
  };

  return WithRoot;
}

export default withRoot;
