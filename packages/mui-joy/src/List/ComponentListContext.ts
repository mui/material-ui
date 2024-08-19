import * as React from 'react';

const ComponentListContext = React.createContext<string | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ComponentListContext.displayName = 'ComponentListContext';
}

export default ComponentListContext;
