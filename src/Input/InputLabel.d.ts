import * as React from 'react';
import { StyledComponent } from '..';
import { FormLabelProps } from '../Form/FormLabel';

export interface InputLabelProps extends FormLabelProps {
  disableAnimation?: boolean;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  required?: boolean;
  shrink?: boolean;
}

export type InputLabelClassKey =
  | 'root'
  | 'formControl'
  | 'labelDense'
  | 'shrink'
  | 'animated'
  | 'disabled'
  ;

declare const InputLabel: StyledComponent<InputLabelProps, InputLabelClassKey>;

export default InputLabel;
