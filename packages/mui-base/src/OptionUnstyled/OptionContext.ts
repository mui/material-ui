import * as React from 'react';
import { OptionState } from '../ListboxUnstyled';

export const OptionContext = React.createContext<OptionState | undefined>(undefined);

export function useOptionContext() {
  return React.useContext(OptionContext);
}
