import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverrideProps, PartiallyRequired } from '@mui/types';
import { Theme } from '../styles';
import { LinearProgressClasses } from './linearProgressClasses';

export interface LinearProgressPropsColorOverrides {}

export interface LinearProgressOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<LinearProgressClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
    LinearProgressPropsColorOverrides
  >;
  /**
   * If `true`, the component render indeterminate or query mode using four colors instead of one.
   * This only works if variant is `indeterminate` or `query`.
   * @default false
   */
  fourColor?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value?: number;
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer?: number;
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

export interface LinearProgressTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'span',
> {
  props: LinearProgressOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type LinearProgressProps<
  RootComponentType extends React.ElementType = LinearProgressTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<LinearProgressTypeMap<AdditionalProps, RootComponentType>, RootComponentType>;

export interface LinearProgressOwnerState
  extends PartiallyRequired<LinearProgressProps, 'color' | 'variant'> {}
