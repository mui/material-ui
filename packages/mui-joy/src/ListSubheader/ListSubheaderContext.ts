import * as React from 'react';

const ListSubheaderContext = React.createContext<
  undefined | React.Dispatch<React.SetStateAction<string>>
>(undefined);

export default ListSubheaderContext;
