import * as React from 'react';

/**
 * @type {React.Context<{ activePage: import('docs/src/pages').MuiPage>, pages: Array<import('docs/src/pages').MuiPage>, versions: unknown[] }>}
 */
const PageContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  PageContext.displayName = 'PageContext';
}

export default PageContext;
