import React from 'react';
import { SheetsRegistry } from 'jss';
import StylesProvider from '../StylesProvider';
import createGenerateClassName from '../createGenerateClassName';

class ServerStyleSheets {
  constructor(options = {}) {
    this.options = options;
  }

  collect(children) {
    // This is needed in order to inject the critical CSS.
    this.sheetsRegistry = new SheetsRegistry();
    // A new class name generator
    const generateClassName = createGenerateClassName();

    this.sheetsRegistry.foo = 'foo';

    return (
      <StylesProvider
        generateClassName={generateClassName}
        sheetsRegistry={this.sheetsRegistry}
        {...this.options}
      >
        {children}
      </StylesProvider>
    );
  }

  toString() {
    return this.sheetsRegistry
      ? this.sheetsRegistry.registry.map(sheet => sheet.toString()).join('\n')
      : '';
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
