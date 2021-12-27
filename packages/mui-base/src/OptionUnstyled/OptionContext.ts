import * as React from 'react';
import { OptionState } from '../ListboxUnstyled';

/**
 * @ignore - internal component.
 */
export const OptionContext = React.createContext<OptionState | undefined>(undefined);

export function useOptionContext() {
  return React.useContext(OptionContext);
}
