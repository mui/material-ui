import React from 'react';
import PropTypes from 'prop-types';
import SwitchBase from '../internal/SwitchBase';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
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

function Radio(props) {
  return (
    <SwitchBase
      inputType="radio"
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon />}
      {...props}
    />
  );
}

Radio.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * The icon to display when the component is checked.
   * If a string is provided, it will be used as a font ligature.
   */
  checkedIcon: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon: PropTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.func,
  /**
   * The input component property `type`.
   */
  inputType: PropTypes.string,
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The value of the component.
   */
  value: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiRadio' })(Radio);
