import { createContext } from 'react';

export interface ClientStyleContextData {
  reset: () => void;
}

export default createContext<ClientStyleContextData>({
  reset: () => {},
});
