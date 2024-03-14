import * as React from 'react';

const WrapListContext = React.createContext(false);

if (process.env.NODE_ENV !== 'production') {
  WrapListContext.displayName = 'WrapListContext';
}

export default WrapListContext;
