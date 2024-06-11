import * as React from 'react';

const RowListContext = React.createContext(false);

if (process.env.NODE_ENV !== 'production') {
  RowListContext.displayName = 'RowListContext';
}

export default RowListContext;
