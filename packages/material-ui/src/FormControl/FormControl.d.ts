import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const FormControl: OverridableComponent<{
  props: {
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    margin?: PropTypes.Margin;
    onBlur?: React.EventHandler<any>;
    onFocus?: React.EventHandler<any>;
    required?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: 'div';
  classKey: FormControlClassKey;
}>;

export type FormControlClassKey = 'root' | 'marginNormal' | 'marginDense' | 'fullWidth';

export type FormControlProps = SimplifiedPropsOf<typeof FormControl>;

export default FormControl;
