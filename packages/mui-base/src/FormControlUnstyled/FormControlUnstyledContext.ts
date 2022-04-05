import * as React from 'react';
import { Simplify } from '@mui/types';
import { FormControlUnstyledProps } from './FormControlUnstyled.types';

type ContextFromPropsKey = 'disabled' | 'error' | 'onChange' | 'required' | 'value';

export type FormControlUnstyledState = Simplify<
  Pick<FormControlUnstyledProps, ContextFromPropsKey> & {
    filled: boolean;
    focused: boolean;
    onBlur: () => void;
    onFocus: () => void;
  }
>;

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
