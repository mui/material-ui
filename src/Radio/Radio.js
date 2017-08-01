// @flow weak

import React from 'react';
import type { Element } from 'react';
import createStyleSheet from '../styles/createStyleSheet';
import createSwitch from '../internal/SwitchBase';
import RadioButtonCheckedIcon from '../svg-icons/radio-button-checked';
import RadioButtonUncheckedIcon from '../svg-icons/radio-button-unchecked';

export const styleSheet = createStyleSheet('MuiRadio', theme => ({
  default: {
    color: theme.palette.text.secondary,
  },
  checked: {
    color: theme.palette.primary[500],
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
}));

const Radio = createSwitch({
  styleSheet,
  inputType: 'radio',
  defaultIcon: <RadioButtonUncheckedIcon />,
  defaultCheckedIcon: <RadioButtonCheckedIcon />,
});

Radio.displayName = 'Radio';

export default Radio;

export type Props = {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean | string,
  /**
   * The CSS class name of the root element when checked.
   */
  checkedClassName?: string,
  /**
   * The icon to display when the component is checked.
   * If a string is provided, it will be used as a font ligature.
   */
  checkedIcon?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  defaultChecked?: boolean,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled?: boolean,
  /**
   * The CSS class name of the root element when disabled.
   */
  disabledClassName?: string,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean,
  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon?: Element<*>,
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate?: boolean,
  /**
   * The icon to display when the component is indeterminate.
   * If a string is provided, it will be used as a font ligature.
   */
  indeterminateIcon?: string | Element<*>,
  /**
   * Properties applied to the `input` element.
   */
  inputProps?: Object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: Function,
  /*
   * @ignore
   */
  name?: string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange?: Function,
  /**
   * @ignore
   */
  tabIndex?: string,
  /**
   * The value of the component.
   */
  value?: string,
};

// FIXME: here just to generate docs?? -rosskevin
export const RadioDocs = (props: Props) => <span />; // eslint-disable-line no-unused-vars
