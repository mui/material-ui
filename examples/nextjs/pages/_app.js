//Group import statements by their packages
//Related to React
import React from 'react';

//Related to Nextjs
import App, { Container } from 'next/app';
import Head from 'next/head';

//Related to Mui
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getPageContext from '../src/getPageContext';

//Related to JSS
import JssProvider from 'react-jss/lib/JssProvider';


export default class extends App {
  pageContext = getPageContext();

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side'),
          jssStylesParent = jssStyles.parentNode;
    if (jssStyles && jssStylesParent) {
      jssStylesParent.removeChild(jssStyles);
    }
  }

  render() {
    const {
      theme, 
      sheetsRegistry, 
      sheetsManager, 
      generateClassName 
    } = this.pageContext,
    { 
      Component, 
      pageProps 
    } = this.props;
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={theme}
            sheetsManager={sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Component 
              pageContext={this.pageContext} 
              {...pageProps} 
            />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default MyApp;
