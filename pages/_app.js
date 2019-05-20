import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import App, { Container } from 'next/app';
import find from 'lodash/find';
import { Provider as ReduxProvider } from 'react-redux';
import pages from 'docs/src/pages';
import AppWrapper from 'docs/src/modules/components/AppWrapper';
import initRedux from 'docs/src/modules/redux/initRedux';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import PageContext from 'docs/src/modules/components/PageContext';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import loadScript from 'docs/src/modules/utils/loadScript';
import NextHead from 'next/head';

// Add the strict mode back once the number of warnings is manageable.
// We might miss important warnings by keeping the strict mode 🌊🌊🌊.
const USE_STRICT_MODE = false;
const ReactMode = USE_STRICT_MODE ? React.StrictMode : React.Fragment;

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    document.querySelector('#material-icon-font'),
  );
  loadScript('https://www.google-analytics.com/analytics.js', document.querySelector('head'));
}

if (process.browser) {
  // eslint-disable-next-line no-console
  console.log(
    `%c

███╗   ███╗ █████╗ ████████╗███████╗██████╗ ██╗ █████╗ ██╗      ██╗   ██╗██╗
████╗ ████║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗██║      ██║   ██║██║
██╔████╔██║███████║   ██║   █████╗  ██████╔╝██║███████║██║█████╗██║   ██║██║
██║╚██╔╝██║██╔══██║   ██║   ██╔══╝  ██╔══██╗██║██╔══██║██║╚════╝██║   ██║██║
██║ ╚═╝ ██║██║  ██║   ██║   ███████╗██║  ██║██║██║  ██║███████╗ ╚██████╔╝██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝  ╚═════╝ ╚═╝

Tip: you can access the documentation \`theme\` object directly in the console.
`,
    'font-family:monospace;color:#1976d2;font-size:12px;',
  );
}

function findActivePage(currentPages, pathname) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      if (pathname.indexOf(`${page.pathname}/`) === 0) {
        // Check if one of the children matches (for /components)
        return findActivePage(page.children, pathname);
      }
    }

    // Should be an exact match if no children
    return pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== pathname) {
    return findActivePage(activePage.children, pathname);
  }

  return activePage;
}

class MyApp extends App {
  constructor(props) {
    super();
    this.redux = initRedux(props.pageProps.reduxServerState);
  }

  componentDidMount() {
    loadDependencies();
  }

  render() {
    const { Component, pageProps, router } = this.props;

    let pathname = router.pathname;
    // Add support for leading / in development mode.
    if (pathname !== '/') {
      // The leading / is only added to support static hosting (resolve /index.html).
      // We remove it to normalize the pathname.
      // See `_rewriteUrlForNextExport` on Next.js side.
      pathname = pathname.replace(/\/$/, '');
    }
    // console.log(pages, { ...router, pathname })
    const activePage = findActivePage(pages, pathname);

    let fonts = ['https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap'];
    if (pathname.match(/onepirate/)) {
      fonts = [
        'https://fonts.googleapis.com/css?family=Roboto+Condensed:700|Work+Sans:300,400&display=swap',
      ];
    } else if (pathname.match(/blog/)) {
      fonts.push('https://fonts.googleapis.com/css?family=Roboto+Slab:300&display=swap');
    }

    return (
      <ReactMode>
        <NextHead>
          {fonts.map(font => (
            <link rel="stylesheet" href={font} key={font} />
          ))}
        </NextHead>
        <Container>
          <ReduxProvider store={this.redux}>
            <PageContext.Provider value={{ activePage, pages }}>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </PageContext.Provider>
          </ReduxProvider>
          <GoogleAnalytics key={router.route} />
        </Container>
      </ReactMode>
    );
  }
}

MyApp.getInitialProps = ({ ctx }) => {
  let pageProps = {};

  if (!process.browser) {
    const redux = initRedux({
      options: {
        userLanguage: ctx.query.userLanguage,
      },
    });
    pageProps = {
      // No need to include other initial Redux state because when it
      // initialises on the client-side it'll create it again anyway
      reduxServerState: redux.getState(),
    };
  }

  return {
    pageProps,
  };
};

export default MyApp;
