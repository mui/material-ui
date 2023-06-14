import * as React from 'react';

export interface ScrollableTabsContextValue {
  hideScrollbar: boolean;
  scrollableX: boolean;
  scrollableY: boolean;
  tabListRef: any;
}

/**
 * @ignore - internal component.
 */
const Context = React.createContext<ScrollableTabsContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'ScrollableTabsContext';
}

export function useScrollableTabsContext() {
  return React.useContext(Context);
}

export default Context;
