import * as React from 'react';

const NestedListContext = React.createContext<boolean | string>(false);

if (process.env.NODE_ENV !== 'production') {
  NestedListContext.displayName = 'NestedListContext';
}

export default NestedListContext;
