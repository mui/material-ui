import * as React from 'react';

const ListSubheaderDispatch = React.createContext<
  undefined | React.Dispatch<React.SetStateAction<string>>
>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ListSubheaderDispatch.displayName = 'ListSubheaderDispatch';
}

export default ListSubheaderDispatch;
