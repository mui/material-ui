import * as React from 'react';

/**
 * @ignore - internal component.
 */
const MenuListContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  MenuListContext.displayName = 'MenuListContext';
}

export default MenuListContext;
