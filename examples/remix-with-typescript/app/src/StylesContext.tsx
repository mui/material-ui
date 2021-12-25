import { createContext } from 'react';

export interface StyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

export default createContext<null | StyleContextData[]>(null);
