import * as React from 'react';
import { FormGroupProps } from '../FormGroup';

export interface RadioGroupProps extends Omit<FormGroupProps, 'onChange'> {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: any;
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name?: string;
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {string} value The value of the selected radio button.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value?: any;
}

export type RadioGroupClassKey = keyof NonNullable<RadioGroupProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://mui.com/material-ui/react-radio-button/)
 *
 * API:
 *
 * - [RadioGroup API](https://mui.com/material-ui/api/radio-group/)
 * - inherits [FormGroup API](https://mui.com/material-ui/api/form-group/)
 */
export default function RadioGroup(props: RadioGroupProps): JSX.Element;
