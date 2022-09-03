import * as React from 'react';
import { FormControlProps } from './FormControlProps';

const FormControlContext = React.createContext<
  | undefined
  | (Pick<FormControlProps, 'error' | 'disabled' | 'required' | 'variant' | 'color' | 'size'> & {
      htmlFor: string | undefined;
      'aria-describedby': string | undefined;
      setHelperText: (node: null | HTMLElement) => void;
    })
>(undefined);

export default FormControlContext;
