import * as React from 'react';

const ListSubheaderDispatch = React.createContext<
  undefined | React.Dispatch<React.SetStateAction<string>>
>(undefined);

export default ListSubheaderDispatch;
