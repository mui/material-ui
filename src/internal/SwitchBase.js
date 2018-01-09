import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';
import Icon from '../Icon';

export const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'none',
  },
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
  default: {},
  checked: {},
  disabled: {},
};

/**
 * @ignore - internal component.
 */
class SwitchBase extends React.Component {
  state = {};

  componentWillMount() {
    const { props } = this;

    this.isControlled = props.checked != null;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.setState({
        checked: props.defaultChecked !== undefined ? props.defaultChecked : false,
      });
    }
  }

  input = null;
  isControlled = null;

  handleInputChange = (event: SyntheticInputEvent<*>) => {
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
      checked: checkedProp,
      checkedIcon,
      classes,
      className: classNameProp,
      disabled: disabledProp,
      icon: iconProp,
      inputProps,
      inputRef,
      inputType,
      name,
      onChange,
      tabIndex,
      value,
      ...other
    } = this.props;

    const { muiFormControl } = this.context;
    let disabled = disabledProp;

    if (muiFormControl) {
      if (typeof disabled === 'undefined') {
        disabled = muiFormControl.disabled;
      }
    }

    const checked = this.isControlled ? checkedProp : this.state.checked;
    const className = classNames(classes.root, classes.default, classNameProp, {
      [classes.checked]: checked,
      [classes.disabled]: disabled,
    });

    let icon = checked ? checkedIcon : iconProp;

    if (typeof icon === 'string') {
      icon = <Icon>{icon}</Icon>;
    }

    return (
      <IconButton
        data-mui-test="SwitchBase"
        component="span"
        className={className}
        disabled={disabled}
        tabIndex={null}
        role={undefined}
        {...other}
      >
        {icon}
        <input
          type={inputType}
          name={name}
          checked={checkedProp}
          onChange={this.handleInputChange}
          className={classes.input}
          disabled={disabled}
          tabIndex={tabIndex}
          value={value}
          ref={inputRef}
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
   * If `true`, the component appears indeterminate.
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   * If a string is provided, it will be used as a font ligature.
   */
  indeterminateIcon: PropTypes.node,
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

SwitchBase.defaultProps = {
  checkedIcon: <CheckBoxIcon />,
  disableRipple: false,
  icon: <CheckBoxOutlineBlankIcon />,
  inputType: 'checkbox',
};

SwitchBase.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiSwitchBase' })(SwitchBase);
