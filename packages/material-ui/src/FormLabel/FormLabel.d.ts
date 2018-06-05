import * as React from 'react';
import { StandardProps } from '..';

export interface FormLabelProps<C = {}> extends StandardProps<FormLabelBaseProps<C>, FormLabelClassKey> {
  component?: React.ReactType<C>;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  required?: boolean;
}

export type FormLabelBaseProps<C> = React.LabelHTMLAttributes<C & HTMLLabelElement>;

export type FormLabelClassKey = 'root' | 'focused' | 'disabled' | 'error' | 'asterisk';

declare class FormLabel<C> extends React.Component<C & FormLabelProps<C>> {}

export default FormLabel;
