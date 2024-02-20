import * as React from 'react';

const ListSubheaderContext = React.createContext<
  undefined | React.Dispatch<React.SetStateAction<string>>
>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ListSubheaderContext.displayName = 'ListSubheaderContext';
}

export default ListSubheaderContext;
