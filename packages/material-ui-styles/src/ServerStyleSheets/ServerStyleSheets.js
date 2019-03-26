import React from 'react';
import { SheetsRegistry } from 'jss';
import StylesProvider from '../StylesProvider';

class ServerStyleSheets {
  constructor(options = {}) {
    this.options = options;
  }

  collect(children, options) {
    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new Map();
    // This is needed in order to inject the critical CSS.
    this.sheetsRegistry = new SheetsRegistry();

    return (
      <StylesProvider
        sheetsManager={sheetsManager}
        sheetsRegistry={this.sheetsRegistry}
        sheetsCache={this.options.sheetsCache}
        {...options}
      >
        {children}
      </StylesProvider>
    );
  }

  toString() {
    return this.sheetsRegistry.toString();
  }

  getStyleElement(props) {
    return React.createElement(
      'style',
      Object.assign(
        {
          id: 'jss-server-side',
          key: 'jss-server-side',
          dangerouslySetInnerHTML: { __html: this.toString() },
        },
        props,
      ),
    );
  }
}

export default ServerStyleSheets;
