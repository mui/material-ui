import * as React from 'react';
import { FormControlProps } from './FormControlProps';

type RequiredExcept<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]-?: T[P];
} & {
  [P in K]: T[K];
};

const FormControlContext = React.createContext<
  | undefined
  | (RequiredExcept<
      Pick<FormControlProps, 'error' | 'disabled' | 'required' | 'variant' | 'color' | 'size'>,
      'variant'
    > & {
      htmlFor: string | undefined;
      'aria-describedby': string | undefined;
      setHelperText: (node: null | HTMLElement) => void;
    })
>(undefined);

export default FormControlContext;
