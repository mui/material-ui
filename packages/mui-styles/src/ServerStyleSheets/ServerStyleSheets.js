import * as React from 'react';
import { SheetsRegistry } from 'jss';
import StylesProvider from '../StylesProvider';
import createGenerateClassName from '../createGenerateClassName';

export default class ServerStyleSheets {
  constructor(options = {}) {
    this.options = options;
  }

  collect(children) {
    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new Map();
    // This is needed in order to inject the critical CSS.
    this.sheetsRegistry = new SheetsRegistry();
    // A new class name generator
    const generateClassName = createGenerateClassName();

    return (
      <StylesProvider
        sheetsManager={sheetsManager}
        serverGenerateClassName={generateClassName}
        sheetsRegistry={this.sheetsRegistry}
        {...this.options}
      >
        {children}
      </StylesProvider>
    );
  }

  toString() {
    return this.sheetsRegistry ? this.sheetsRegistry.toString() : '';
  }

  getStyleElement(props) {
    return React.createElement('style', {
      id: 'jss-server-side',
      key: 'jss-server-side',
      dangerouslySetInnerHTML: { __html: this.toString() },
      ...props,
    });
  }
}
