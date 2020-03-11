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
 *
 * Demos:
 * - {@link https://material-ui.com/components/radio-buttons Radio Buttons}
 *
 * API:
 * - {@link https://material-ui.com/api/RadioGroup RadioGroup API}
 * - inherits {@link https://material-ui.com/api//api/form-group FormGroup API}
 */
declare const RadioGroup: React.ComponentType<RadioGroupProps>;

export default RadioGroup;
