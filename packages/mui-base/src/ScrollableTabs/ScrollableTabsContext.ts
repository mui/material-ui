import * as React from 'react';
import { TabsContextValue } from '@mui/base';

export interface ScrollableTabsContextValue extends TabsContextValue {
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
    throw new Error('No TabsContext provided');
  }

  return context;
}

export default Context;
