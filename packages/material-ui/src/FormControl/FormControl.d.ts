import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormControlTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    hiddenLabel?: boolean;
    margin?: PropTypes.Margin;
    required?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: FormControlClassKey;
}

declare const FormControl: OverridableComponent<FormControlTypeMap>;

export type FormControlClassKey = 'root' | 'marginNormal' | 'marginDense' | 'fullWidth';

export type FormControlProps<
  D extends React.ElementType = FormControlTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormControlTypeMap<P, D>, D>;

export default FormControl;
