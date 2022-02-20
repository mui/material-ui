import * as React from 'react';

const ListItemContext = React.createContext<{ nestedLevel: number | undefined }>({
  nestedLevel: undefined,
});

export const useListItemContext = () => React.useContext(ListItemContext);

export default ListItemContext;
