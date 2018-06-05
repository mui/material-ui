import * as React from 'react';
import { StandardProps } from '..';
import { FormLabelProps, FormLabelClassKey } from '../FormLabel';
import { ClassNameMap } from '../styles/withStyles';

export interface InputLabelProps<C> extends StandardProps<FormLabelProps<C>, InputLabelClassKey> {
  disableAnimation?: boolean;
  disabled?: boolean;
  error?: boolean;
  FormLabelClasses?: Partial<ClassNameMap<FormLabelClassKey>>;
  focused?: boolean;
  required?: boolean;
  shrink?: boolean;
}

export type InputLabelClassKey = 'root' | 'formControl' | 'marginDense' | 'shrink' | 'animated';

declare class InputLabel<C> extends React.Component<C & InputLabelProps<C>> {}

export default InputLabel;
