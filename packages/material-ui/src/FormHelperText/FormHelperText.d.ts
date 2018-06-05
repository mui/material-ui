import * as React from 'react';
import { StandardProps } from '..';

export interface FormHelperTextProps<C>
  extends StandardProps<React.HTMLAttributes<HTMLParagraphElement>, FormHelperTextClassKey> {
  disabled?: boolean;
  error?: boolean;
  component?: React.ReactType<C>;
  margin?: 'dense';
}

export type FormHelperTextClassKey = 'root' | 'error' | 'disabled' | 'marginDense';

declare class FormHelperText<C> extends React.Component<C & FormHelperTextProps<C>> {}

export default FormHelperText;
