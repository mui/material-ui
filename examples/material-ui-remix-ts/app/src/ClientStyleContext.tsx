import * as React from 'react';

export interface ClientStyleContextData {
  reset: () => void;
}

export default React.createContext<ClientStyleContextData>({
  reset: () => {},
});
