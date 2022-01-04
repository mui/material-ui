import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { UseSwitchProps } from '@mui/base/SwitchUnstyled';
import { SwitchClasses } from './switchClasses';
import { ColorPaletteProp, SxProps } from '../styles';

export interface SwitchPropsColorOverrides {}

export interface SwitchPropsSizeOverrides {}

export interface SwitchProps extends UseSwitchProps {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
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
    Exclude<ColorPaletteProp, 'context' | 'neutral'>,
    SwitchPropsColorOverrides
  >;
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SwitchPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
}
