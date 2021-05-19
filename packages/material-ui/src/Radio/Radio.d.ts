import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface RadioPropsSizeOverrides {}

export interface RadioPropsColorOverrides {}

export interface RadioProps
  extends StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon' | 'type'> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Pseudo-class applied to the root element if `checked={true}`. */
    checked?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary?: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary?: string;
  };
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<'primary' | 'secondary' | 'default', RadioPropsColorOverrides>;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
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

export type RadioClassKey = keyof NonNullable<RadioProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 *
 * API:
 *
 * - [Radio API](https://material-ui.com/api/radio/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
export default function Radio(props: RadioProps): JSX.Element;
