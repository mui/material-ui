import * as React from 'react';
import { StandardProps } from '..';
import { FormGroupProps, FormGroupClassKey } from '../FormGroup';

export interface RadioGroupProps
  extends StandardProps<FormGroupProps, RadioGroupClassKey, 'onChange'> {
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  value?: any;
}

export type RadioGroupClassKey = FormGroupClassKey;

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [RadioGroup API](https://material-ui.com/api/radio-group/)
 * - inherits [FormGroup API](https://material-ui.com/api/form-group/)
 */
declare const RadioGroup: React.ComponentType<RadioGroupProps>;

export default RadioGroup;
