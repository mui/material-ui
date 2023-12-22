import * as React from 'react';
import { SxProps } from '@mui/system';
import { FormControlOwnProps as BaseFormControlOwnProps } from '@mui/base/FormControl';
import { OverridableStringUnion, OverrideProps, Simplify } from '@mui/types';
import { Theme } from '../styles';
import { FormControlClasses } from './formControlClasses';

export interface FormControlPropsSizeOverrides {}
export interface FormControlPropsColorOverrides {}

export interface FormControlOwnProps extends BaseFormControlOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormControlClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'success' | 'warning',
    FormControlPropsColorOverrides
  >;
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused?: boolean;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin?: 'dense' | 'normal' | 'none';
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', FormControlPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled';
}

export interface FormControlTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: FormControlOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type FormControlProps<
  RootComponentType extends React.ElementType = FormControlTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormControlTypeMap<AdditionalProps, RootComponentType>, RootComponentType> & {
  component?: React.ElementType;
};

type MaterialDesignOwnerStateKeys =
  | 'classes'
  | 'color'
  | 'margin'
  | 'size'
  | 'fullWidth'
  | 'hiddenLabel'
  | 'variant';

export type FormControlOwnerState = Simplify<
  Required<Pick<FormControlOwnProps, MaterialDesignOwnerStateKeys>> & FormControlProps
>;
