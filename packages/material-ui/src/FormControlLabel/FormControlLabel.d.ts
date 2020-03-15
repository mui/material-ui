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
 *
 * Demos:
 * - {@link https://material-ui.com/components/checkboxes/ Checkboxes}
 * - {@link https://material-ui.com/components/radio-buttons/ Radio Buttons}
 * - {@link https://material-ui.com/components/switches/ Switches}
 *
 * API:
 * - {@link https://material-ui.com/api/FormControlLabel FormControlLabel API}
 *
 */
declare const FormControlLabel: React.ComponentType<FormControlLabelProps>;

export default FormControlLabel;
