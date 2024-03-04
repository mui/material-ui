'use client';
import * as React from 'react';

const TabsListContext = React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  TabsListContext.displayName = 'TabsListContext';
}

export default TabsListContext;
