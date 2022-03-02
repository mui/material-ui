import * as React from 'react';

/**
 * @ignore - internal component.
 */
const Tablelvl2Context = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  Tablelvl2Context.displayName = 'Tablelvl2Context';
}

export default Tablelvl2Context;
