import * as React from 'react';
import { FormControlState } from './FormControl.types';

/**
 * @ignore - internal component.
 */
const FormControlContext = React.createContext<FormControlState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  FormControlContext.displayName = 'FormControlContext';
}

export { FormControlContext };
