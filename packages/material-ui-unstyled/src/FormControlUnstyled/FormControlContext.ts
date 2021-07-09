import * as React from 'react';
import { FormControlState } from './FormControlState';

/**
 * @ignore - internal component.
 */
const FormControlContext = React.createContext<FormControlState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  FormControlContext.displayName = 'FormControlContext';
}

export function useFormControl() {
  return React.useContext(FormControlContext);
}

export default FormControlContext;
