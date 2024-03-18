import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverrideProps, PartiallyRequired } from '@mui/types';
import { Theme } from '../styles';
import { CircularProgressClasses } from './circularProgressClasses';

export interface CircularProgressPropsColorOverrides {}

export interface CircularProgressOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CircularProgressClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
    CircularProgressPropsColorOverrides
  >;
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink?: boolean;
  /**
   * If `true`, the component render indeterminate mode using four colors instead of one.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  fourColor?: boolean;
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 48
   */
  size?: number | string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The thickness of the circle.
   * @default 4
   */
  thickness?: number;
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value?: number;
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant?: 'determinate' | 'indeterminate';
}

export interface CircularProgressTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'span',
> {
  props: CircularProgressOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type CircularProgressProps<
  RootComponentType extends React.ElementType = CircularProgressTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CircularProgressTypeMap<AdditionalProps, RootComponentType>, RootComponentType>;

export interface CircularProgressOwnerState
  extends PartiallyRequired<
    CircularProgressProps,
    'color' | 'disableShrink' | 'fourColor' | 'size' | 'thickness' | 'value' | 'variant'
  > {}
