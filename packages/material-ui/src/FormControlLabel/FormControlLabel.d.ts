import * as React from 'react';
import { StandardProps } from '..';

export interface FormControlLabelProps
  extends StandardProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    FormControlLabelClassKey,
    'onChange'
  > {
  checked?: boolean;
  control: React.ReactElement;
  disabled?: boolean;
  inputRef?: React.Ref<any>;
  label: React.ReactNode;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  value?: unknown;
}

export type FormControlLabelClassKey =
  | 'root'
  | 'labelPlacementStart'
  | 'labelPlacementTop'
  | 'labelPlacementBottom'
  | 'disabled'
  | 'label';

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [FormControlLabel API](https://material-ui.com/api/form-control-label/)
 */
declare const FormControlLabel: React.ComponentType<FormControlLabelProps>;

export default FormControlLabel;
