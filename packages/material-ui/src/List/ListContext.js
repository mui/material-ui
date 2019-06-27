import React, { useContext } from 'react';

/**
 * @ignore - internal component.
 */
const ListContext = React.createContext({});

export const useListContext = () => useContext(ListContext);

export default ListContext;
