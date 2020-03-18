import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { FormControlProps } from '../FormControl';
import { FormHelperTextProps } from '../FormHelperText';
import { InputProps as StandardInputProps } from '../Input';
import { FilledInputProps } from '../FilledInput';
import { OutlinedInputProps } from '../OutlinedInput';
import { InputLabelProps } from '../InputLabel';
import { SelectProps } from '../Select';

export interface BaseTextFieldProps
  extends StandardProps<
    FormControlProps,
    TextFieldClassKey,
    // event handlers are declared on derived interfaces
    'onChange' | 'onBlur' | 'onFocus' | 'defaultValue'
  > {
  autoComplete?: string;
  autoFocus?: boolean;
  color?: 'primary' | 'secondary';
  children?: React.ReactNode;
  defaultValue?: unknown;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  InputLabelProps?: Partial<InputLabelProps>;
  inputRef?: React.Ref<any>;
  label?: React.ReactNode;
  margin?: PropTypes.Margin;
  multiline?: boolean;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  size?: 'small' | 'medium';
  select?: boolean;
  SelectProps?: Partial<SelectProps>;
  type?: string;
  value?: unknown;
}

export interface StandardTextFieldProps extends BaseTextFieldProps {
  onBlur?: StandardInputProps['onBlur'];
  onChange?: StandardInputProps['onChange'];
  onFocus?: StandardInputProps['onFocus'];
  variant?: 'standard';
  InputProps?: Partial<StandardInputProps>;
  inputProps?: StandardInputProps['inputProps'];
}

export interface FilledTextFieldProps extends BaseTextFieldProps {
  onBlur?: FilledInputProps['onBlur'];
  onChange?: FilledInputProps['onChange'];
  onFocus?: FilledInputProps['onFocus'];
  variant: 'filled';
  InputProps?: Partial<FilledInputProps>;
  inputProps?: FilledInputProps['inputProps'];
}

export interface OutlinedTextFieldProps extends BaseTextFieldProps {
  onBlur?: OutlinedInputProps['onBlur'];
  onChange?: OutlinedInputProps['onChange'];
  onFocus?: OutlinedInputProps['onFocus'];
  variant: 'outlined';
  InputProps?: Partial<OutlinedInputProps>;
  inputProps?: OutlinedInputProps['inputProps'];
}

export type TextFieldProps = StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps;

export type TextFieldClassKey = 'root';

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 *
 * -   [FormControl](https://material-ui.com/api/form-control/)
 * -   [InputLabel](https://material-ui.com/api/input-label/)
 * -   [FilledInput](https://material-ui.com/api/filled-input/)
 * -   [OutlinedInput](https://material-ui.com/api/outlined-input/)
 * -   [Input](https://material-ui.com/api/input/)
 * -   [FormHelperText](https://material-ui.com/api/form-helper-text/)
 *
 * If you wish to alter the props applied to the `input` element, you can do so as follows:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 *
 * -   using the upper case props for passing values directly to the components
 * -   using the underlying components directly as shown in the demos
 * Demos:
 *
 * - [Autocomplete](https://material-ui.com/components/autocomplete/)
 * - [Pickers](https://material-ui.com/components/pickers/)
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [TextField API](https://material-ui.com/api/text-field/)
 * - inherits [FormControl API](https://material-ui.com/api/form-control/)
 */
declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
