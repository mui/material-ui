import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface CheckboxProps
  extends StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon' | 'type'> {
  /**
   * If `true`, the component is checked.
   */
  checked?: SwitchBaseProps['checked'];
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
    /** Pseudo-class applied to the root element if `indeterminate={true}`. */
    indeterminate?: string;
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
   * If `true`, the checkbox will be disabled.
   */
  disabled?: SwitchBaseProps['disabled'];
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: SwitchBaseProps['disableRipple'];
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: SwitchBaseProps['id'];
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the input.
   */
  indeterminate?: boolean;
  /**
   * The icon to display when the component is indeterminate.
   */
  indeterminateIcon?: React.ReactNode;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: SwitchBaseProps['inputProps'];
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: SwitchBaseProps['onChange'];
  /**
   * If `true`, the `input` element will be required.
   */
  required?: SwitchBaseProps['required'];
  /**
   * The size of the checkbox.
   * `small` is equivalent to the dense checkbox styling.
   */
  size?: 'small' | 'medium';
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: SwitchBaseProps['value'];
}

export type CheckboxClassKey = keyof NonNullable<CheckboxProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [Checkbox API](https://material-ui.com/api/checkbox/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
export default function Checkbox(props: CheckboxProps): JSX.Element;
