import React from 'react';
import App from 'next/app';
import { PageWithContexts, ThemeType } from '../layout/PageWithContext';
import getPageContext from '../utils/getPageContext';
import cookies from 'next-cookies';

class MyApp extends App<{ theme: ThemeType }> {
  pageContext = getPageContext();

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    const { theme } = cookies(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { theme, pageProps };
  }

  render() {
    const { Component, pageProps, theme } = this.props;

    return (
      <PageWithContexts initialTheme={theme} pageContext={this.pageContext}>
        <Component pageContext={this.pageContext} {...pageProps} />
      </PageWithContexts>
    );
  }
}

export default MyApp;
