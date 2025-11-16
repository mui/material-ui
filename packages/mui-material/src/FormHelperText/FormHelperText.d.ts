import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { FormHelperTextClasses } from './formHelperTextClasses';

export interface FormHelperTextPropsVariantOverrides {}

export interface FormHelperTextOwnProps {
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormHelperTextClasses>;
  // ... (all other existing props)
  /**
   * The variant to use.
   */
  variant?: OverridableStringUnion<
    'standard' | 'outlined' | 'filled',
    FormHelperTextPropsVariantOverrides
  >;

  // FIX FOR ISSUE #47230: Allow data-* attributes on the component's root element
  [dataAttr: `data-${string}`]: any; // <--- ADD THIS LINE HERE

}

export interface FormHelperTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'p',
> {
  props: AdditionalProps & FormHelperTextOwnProps; // <--- The problem is here!
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Number Field](https://mui.com/material-ui/react-number-field/)
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormHelperText API](https://mui.com/material-ui/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

export type FormHelperTextProps<
  RootComponent extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormHelperTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default FormHelperText;
