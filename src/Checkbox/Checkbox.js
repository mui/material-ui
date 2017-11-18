// @flow

import React from 'react';
import type { Node } from 'react';
import withStyles from '../styles/withStyles';
import SwitchBase from '../internal/SwitchBase';
import IndeterminateCheckBoxIcon from '../svg-icons/IndeterminateCheckBox';

export const styles = (theme: Object) => ({
  default: {
    color: theme.palette.text.secondary,
  },
  checked: {
    color: theme.palette.primary[500],
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
});

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * Other base element props.
   */
  [otherProp: string]: any,
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean | string,
  /**
   * The icon to display when the component is checked.
   * If a string is provided, it will be used as a font ligature.
   */
  checkedIcon?: Node,
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
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean,
  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon?: Node,
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate: boolean,
  /**
   * The icon to display when the component is indeterminate.
   * If a string is provided, it will be used as a font ligature.
   */
  indeterminateIcon: Node,
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
  tabIndex?: number | string,
  /**
   * The value of the component.
   */
  value?: string,
};

class Checkbox extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    indeterminate: false,
    indeterminateIcon: (<IndeterminateCheckBoxIcon />: Node),
  };

  render() {
    const { checkedIcon, icon, indeterminate, indeterminateIcon, ...other } = this.props;

    return (
      <SwitchBase
        checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
        icon={indeterminate ? indeterminateIcon : icon}
        {...other}
      />
    );
  }
}

export default withStyles(styles, { name: 'MuiCheckbox' })(Checkbox);
