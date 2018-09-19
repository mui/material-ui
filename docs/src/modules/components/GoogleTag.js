import React from 'react';

class GoogleTag extends React.Component {
  googleTimer = null;

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Wait for the title to be updated.
    this.googleTimer = setTimeout(() => {
      window.ga('send', {
        hitType: 'pageview',
        page: window.location.pathname,
      });
    }, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.googleTimer);
  }

  render() {
    return null;
  }
}

export default GoogleTag;
