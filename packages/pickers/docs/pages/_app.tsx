import sinon from 'sinon';
import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import getPageContext from '../utils/getPageContext';
import { PageWithContexts, ThemeType } from '../layout/PageWithContext';

if (process.env.VISUAL_TESTING) {
  const now = new Date('2019-01-01T09:41:00.000Z');
  sinon.useFakeTimers(now.getTime());
}

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

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
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
