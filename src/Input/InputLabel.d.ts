import * as React from 'react';
import { StandardProps } from '../MuiProps';
import { FormLabelProps, FormLabelClassKey } from '../Form/FormLabel';

export interface InputLabelProps extends StandardProps<FormLabelProps, InputLabelClassKey> {
  disableAnimation?: boolean;
  disabled?: boolean;
  error?: boolean;
  FormControlClasses?: object;
  focused?: boolean;
  required?: boolean;
  shrink?: boolean;
}

export type InputLabelClassKey =
  | FormLabelClassKey
  | 'formControl'
  | 'labelDense'
  | 'shrink'
  | 'animated';

declare const InputLabel: React.ComponentType<InputLabelProps>;

export default InputLabel;
