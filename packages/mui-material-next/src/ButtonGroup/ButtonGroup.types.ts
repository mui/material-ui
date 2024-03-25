import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverrideProps, PartiallyRequired } from '@mui/types';
import { Theme } from '../styles';
import { ButtonGroupClasses } from './buttonGroupClasses';

export interface ButtonGroupPropsColorOverrides {}
export interface ButtonGroupPropsVariantOverrides {}
export interface ButtonGroupPropsSizeOverrides {}

export interface ButtonGroupOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonGroupClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'tertiary',
    ButtonGroupPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation?: boolean;
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple?: boolean;
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonGroupPropsSizeOverrides>;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'filled' | 'filledTonal' | 'elevated',
    ButtonGroupPropsVariantOverrides
  >;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface ButtonGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ButtonGroupOwnProps;
  defaultComponent: RootComponent;
}

export type ButtonGroupProps<
  RootComponent extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ButtonGroupTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface ButtonGroupOwnerState
  extends PartiallyRequired<
    ButtonGroupProps,
    | 'color'
    | 'disabled'
    | 'disableElevation'
    | 'disableRipple'
    | 'disableTouchRipple'
    | 'fullWidth'
    | 'orientation'
    | 'size'
    | 'variant'
  > {}
