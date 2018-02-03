import React from 'react';
import config from 'docs/src/config';

class GoogleTag extends React.Component {
  componentDidMount() {
    // Wait for the title to be updated.
    this.googleTimer = setTimeout(() => {
      window.gtag('config', config.google.id, {
        page_path: window.location.pathname,
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.googleTimer);
  }

  googleTimer = null;

  render() {
    return null;
  }
}

export default GoogleTag;
