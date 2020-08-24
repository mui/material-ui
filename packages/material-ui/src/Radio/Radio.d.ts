import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

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
   */
  color?: 'primary' | 'secondary' | 'default';
  /**
   * If `true`, the radio will be disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The size of the radio.
   * `small` is equivalent to the dense radio styling.
   */
  size?: 'small' | 'medium';
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
