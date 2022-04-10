import * as React from 'react';

const RowListContext = React.createContext(false);

export const useRowList = () => React.useContext(RowListContext);

export default RowListContext;
