'use client';
import * as React from 'react';

/**
 * Whether the root popup sets its own `finalFocus`. The root reads it when an item press closes the menu.
 */
const Menu2FinalFocusContext = React.createContext<{ current: boolean } | null>(null);

if (process.env.NODE_ENV !== 'production') {
  Menu2FinalFocusContext.displayName = 'Menu2FinalFocusContext';
}

export default Menu2FinalFocusContext;
