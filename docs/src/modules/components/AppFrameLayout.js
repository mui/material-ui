import * as React from 'react';
import AppFrame from './AppFrame';

export const Context = React.createContext(false);

export default function AppFrameLayout({ children }) {
  return (
    <Context.Provider value>
      <AppFrame>{children}</AppFrame>
    </Context.Provider>
  );
}
