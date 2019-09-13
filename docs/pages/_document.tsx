import React from 'react';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';
import flush from 'styled-jsx/server';
import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';
import { prismThemes } from '../utils/prism';
import { ThemeType } from 'layout/PageWithContext';
import { PageContext } from '../utils/getPageContext';

class MyDocument extends Document<{ theme?: ThemeType }> {
  static getInitialProps = (ctx: NextDocumentContext) => {
    // Render app and page and get the context of the page with collected side effects.
    let pageContext: PageContext | undefined;

    const { theme } = cookies(ctx as any);
    const page = ctx.renderPage(Component => {
      const WrappedComponent = (props: any) => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired,
      };

      return WrappedComponent;
    });

    let css: string;
    // It might be undefined, e.g. after an error.
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString();
    }

    return {
      ...page,
      theme,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css! }} />
          {flush() || null}
        </React.Fragment>
      ),
    };
  };

  render() {
    const { theme = 'light' } = this.props;
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link data-prism="true" href={prismThemes[theme]} rel="stylesheet" />

          <meta name="theme-color" content="#3da044" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/android-icon-192x192.png"
          />

          {process.env.NODE_ENV === 'production' && (
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-115548316-2" />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-115548316-2');
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
