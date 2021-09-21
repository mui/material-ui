import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';
import { RadioClasses } from './radioClasses';

export interface RadioPropsSizeOverrides {}

export interface RadioPropsColorOverrides {}

export interface RadioProps
  extends StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon' | 'type'> {
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<RadioClasses>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
    RadioPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon?: React.ReactNode;
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', RadioPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://mui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [Radio API](https://mui.com/api/radio/)
 * - inherits [ButtonBase API](https://mui.com/api/button-base/)
 */
export default function Radio(props: RadioProps): JSX.Element;
