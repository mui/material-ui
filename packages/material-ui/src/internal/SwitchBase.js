// @inheritedComponent IconButton

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withFormControlContext from '../FormControl/withFormControlContext';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';

export const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'none',
    '&:hover': {
      // Disable the hover effect for the IconButton.
      backgroundColor: 'transparent',
    },
  },
  checked: {},
  disabled: {},
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
};

/**
 * @ignore - internal component.
 */
class SwitchBase extends React.Component {
  constructor(props) {
    super();
    this.isControlled = props.checked != null;
    this.state = {};
    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.checked = props.defaultChecked !== undefined ? props.defaultChecked : false;
    }
  }

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    const { muiFormControl } = this.props;
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    const { muiFormControl } = this.props;
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  handleInputChange = event => {
    const checked = event.target.checked;

    if (!this.isControlled) {
      this.setState({ checked });
    }

    if (this.props.onChange) {
      this.props.onChange(event, checked);
    }
  };

  render() {
    const {
      autoFocus,
      checked: checkedProp,
      checkedIcon,
      classes,
      className: classNameProp,
      defaultChecked,
      disabled: disabledProp,
      icon,
      id,
      inputProps,
      inputRef,
      muiFormControl,
      name,
      onBlur,
      onChange,
      onFocus,
      readOnly,
      required,
      tabIndex,
      type,
      value,
      ...other
    } = this.props;

    let disabled = disabledProp;

    if (muiFormControl) {
      if (typeof disabled === 'undefined') {
        disabled = muiFormControl.disabled;
      }
    }

    const checked = this.isControlled ? checkedProp : this.state.checked;
    const hasLabelFor = type === 'checkbox' || type === 'radio';

    return (
      <IconButton
        component="span"
        className={clsx(
          classes.root,
          {
            [classes.checked]: checked,
            [classes.disabled]: disabled,
          },
          classNameProp,
        )}
        disabled={disabled}
        tabIndex={null}
        role={undefined}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...other}
      >
        {checked ? checkedIcon : icon}
        <input
          autoFocus={autoFocus}
          checked={checkedProp}
          defaultChecked={defaultChecked}
          className={classes.input}
          disabled={disabled}
          id={hasLabelFor && id}
          name={name}
          onChange={this.handleInputChange}
          readOnly={readOnly}
          ref={inputRef}
          required={required}
          tabIndex={tabIndex}
          type={type}
          value={value}
          {...inputProps}
        />
      </IconButton>
    );
  }
}

// NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.
SwitchBase.propTypes = {
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
   */
  icon: PropTypes.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Attributes applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * @ignore
   */
  muiFormControl: PropTypes.object,
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The input component property `type`.
   */
  type: PropTypes.string.isRequired,
  /**
   * The value of the component.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

export default withStyles(styles, { name: 'MuiPrivateSwitchBase' })(
  withFormControlContext(SwitchBase),
);
