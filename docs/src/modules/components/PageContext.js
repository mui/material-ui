import * as React from 'react';

/**
 * @type {React.Context<{ activePage: { pathname: string }, pages: Array<import('docs/src/pages').MuiPage>, versions: unknown[] }>}
 */
const PageContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  PageContext.displayName = 'PageContext';
}

export default PageContext;
