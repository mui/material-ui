import * as React from 'react';

export interface ScrollableTabsContextValue {
  tabsListRef: any;
  getScrollButtonProps: any;
}

/**
 * @ignore - internal component.
 */
const Context = React.createContext<ScrollableTabsContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'ScrollableTabsContext';
}

export function useScrollableTabsContext() {
  const context = React.useContext(Context);
  if (context == null) {
    throw new Error('No ScrollableTabsContext provided');
  }

  return context;
}

export default Context;
