import * as React from 'react';

const GroupListContext = React.createContext<undefined | 'menu' | 'select'>(undefined);

if (process.env.NODE_ENV !== 'production') {
  GroupListContext.displayName = 'GroupListContext';
}

export default GroupListContext;
