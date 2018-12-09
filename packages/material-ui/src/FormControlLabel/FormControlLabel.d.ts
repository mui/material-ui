import * as React from 'react';
import { StandardProps } from '..';

export interface FormControlLabelProps
  extends StandardProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    FormControlLabelClassKey,
    'onChange'
  > {
  checked?: boolean | string;
  control: React.ReactElement<any>;
  disabled?: boolean;
  inputRef?: React.Ref<any>;
  label: React.ReactNode;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  value?: string;
}

export type FormControlLabelClassKey = 'root' | 'start' | 'disabled' | 'label';

declare const FormControlLabel: React.ComponentType<FormControlLabelProps>;

export default FormControlLabel;
