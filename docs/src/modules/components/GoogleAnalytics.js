import React from 'react';

class GoogleAnalytics extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Wait for the title to be updated.
    this.timer = setTimeout(() => {
      window.ga('set', {
        page: window.location.pathname,
      });
      window.ga('send', { hitType: 'pageview' });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return null;
  }
}

export default GoogleAnalytics;
