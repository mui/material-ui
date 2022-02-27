import * as React from 'react';

const NestedListContext = React.createContext(false);

export const useNestedList = () => React.useContext(NestedListContext);

export default NestedListContext;
