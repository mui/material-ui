import * as React from 'react';
import { FormControlUnstyledState } from './FormControlUnstyled.types';

/**
 * @ignore - internal component.
 */
const FormControlUnstyledContext = React.createContext<FormControlUnstyledState | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  FormControlUnstyledContext.displayName = 'FormControlUnstyledContext';
}

export default FormControlUnstyledContext;
