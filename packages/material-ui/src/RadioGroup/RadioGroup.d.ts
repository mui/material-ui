import * as React from 'react';
import { StandardProps } from '..';
import { FormGroupProps, FormGroupClassKey } from '../FormGroup';

export interface RadioGroupProps
  extends StandardProps<FormGroupProps, RadioGroupClassKey, 'onChange'> {
  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue?: FormGroupProps['defaultValue'];
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name?: string;
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value?: any;
}

export type RadioGroupClassKey = FormGroupClassKey;

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://mui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [RadioGroup API](https://mui.com/api/radio-group/)
 * - inherits [FormGroup API](https://mui.com/api/form-group/)
 */
export default function RadioGroup(props: RadioGroupProps): JSX.Element;
