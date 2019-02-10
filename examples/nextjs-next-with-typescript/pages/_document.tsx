import { MuiThemeProviderProps } from '@material-ui/core/styles/MuiThemeProvider';
import Document, { AnyPageProps, Head, Main, NextScript, PageProps } from 'next/document';
import React, { ComponentType } from 'react';
import flush from 'styled-jsx/server';
import { PageContext } from '../src/getPageContext';

class MyDocument extends Document<{
  pageContext: MuiThemeProviderProps;
}> {
  render() {
    const { pageContext } = this.props;

    const theme =
      typeof pageContext.theme === 'function' ? pageContext.theme(null) : pageContext.theme;
    const themeColor = theme.palette.primary.main;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={themeColor} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

interface PagePropsWithPageContext extends AnyPageProps {
  pageContext: PageContext;
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  let pageContext: PageContext | undefined;
  const page = ctx.renderPage((Component: ComponentType<PagePropsWithPageContext>) => {
    const WrappedComponent: ComponentType<{ pageContext: PageContext } & PageProps> = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    return WrappedComponent;
  });

  let css;
  // It might be undefined, e.g. after an error.
  if (pageContext) {
    css = (pageContext as PageContext).sheetsRegistry.toString();
  }

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: css as string }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
