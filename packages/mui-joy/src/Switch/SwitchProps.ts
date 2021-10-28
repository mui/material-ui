import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { UseSwitchProps } from '@mui/core/SwitchUnstyled';
import { SwitchClasses } from './switchClasses';

export interface SwitchPropsSizeOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchProps extends UseSwitchProps {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: React.ElementType;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SwitchClasses>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
    SwitchPropsColorOverrides
  >;
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium' | 'large', SwitchPropsSizeOverrides>;
}
