import * as React from 'react';
import type { MuiPage } from 'docs/src/pages';

const PageContext = React.createContext<{
  activePage: MuiPage | null;
  pages: MuiPage[];
}>(undefined!);

if (process.env.NODE_ENV !== 'production') {
  PageContext.displayName = 'PageContext';
}

export default PageContext;
