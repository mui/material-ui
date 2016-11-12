// @flow weak
import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import IconButton from '../IconButton';
export const styleSheet = createStyleSheet('SwitchBase', () => {
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    ripple: {
      left: -18
    },
    switch: {
      cursor: 'pointer',
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
    },
    disabled: {
      opacity: 0.5,
      switch: {
        cursor: 'not-allowed',
      },
    },
  };
});
export default class SwitchBase extends Component {
  static propTypes = {
    /**
     * SwitchBase is checked if true.
     */
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    checkedClassName: PropTypes.string,
    checkedIcon: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    defaultChecked: PropTypes.bool,
    /**
     * If true, the switch will be disabled.
     */
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    /**
     * Callback function that is fired when the switch is changed.
     *
     * @param {object} event `change` event
     * @param {boolean} checked The `checked` value of the switch
     */
    onChange: PropTypes.func,
    /**
     * If false, the ripple effect will be disabled.
     */
    ripple: PropTypes.bool,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    value: PropTypes.string,
  };
  static defaultProps = {
    // icon: 'check_box_outline_blank',
    // checkedIcon: 'check_box',
    type: 'checkbox',
  };
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };
  state = {};
  
  componentWillMount() {
    const { props } = this;
    this.isControlled = props.checked !== undefined;
    if (!this.isControlled) { // not controlled, use internal state
      this.setState({ checked: props.defaultChecked !== undefined ? props.defaultChecked : false });
    }
  }
  
  input = undefined;
  input2 = undefined;
  isControlled = undefined;
  handleInputChange = (event) => {
    console.log("handleInputChange")
    event.preventDefault();
    let newChecked;
    if (this.isControlled) {
      newChecked = !this.props.checked;
    } else {
      newChecked = !this.state.checked;
      if (event.target && event.target.checked !== newChecked) {
        event.target.checked = newChecked;
      }
      this.setState({ checked: !this.state.checked });
    }
    if (this.props.onClick) {
      this.props.onClick(event);
    } else if (this.props.onChange) {
      this.props.onChange(event, newChecked);
    }
  };
  handleMouseLeave = (event) => {
    if (!this.isControlled) {
      if (event.target && event.target.checked !== true) {
        event.target.checked = false;
      }
      this.setState({ checked: false });
    }
  };
  // Handle button interactions when
  // IconButton is interacted with using space/enter
  handleClick = (event) => {
    console.log("click")
    if (this.input) {
      if (event.target !== this.input) {
        console.log("handleclick")
        this.input.click();
      }
    } else {
      this.handleInputChange(event);
    }
  }
  handleLeave = (event) => {
    if (this.input2) {
      this.handleMouseLeave(event);
    }
  }
  
  render() {
    const {
      checked: checkedProp,
      className: classNameProp,
      checkedClassName,
      disabled,
      onChange, // eslint-disable-line no-unused-vars
      ripple,
      onClick,
      onMouseLeave,
      onMouseDown,
      isform,
      type,
      value,
      children,
      ...other
    } = this.props;
    let addcls;
    const classes = this.context.styleManager.render(styleSheet);
    const checked = this.isControlled ? checkedProp : this.state.checked;
    const className = classNames(classes.root, {
      [classes.disabled]: disabled,
      [classNameProp]: !checked,
      [checkedClassName]: checkedClassName && checked,
    });
    if (isform)
      addcls = classes.ripple;
    return (
      <IconButton
        data-mui-test="SwitchBase"
        component="span"
        className={className}
        classNameRipple={addcls}
        disabled={disabled}
        ripple={ripple}
        onClick={this.handleClick}
        onMouseLeave={this.handleLeave}
        role={type}
        checked={checked}
        aria-checked={checked}
        passchild={children}
        {...other}
      >
        {(isform) && <input
          aria-hidden="true"
          tabIndex="-1"
          ref={(c) => {
            this.input = c;
          }}
          type={type}
          checked={this.isControlled ? checkedProp : undefined}
          onChange={this.handleInputChange}
          className={classes.switch}
          disabled={disabled}
          value={value}
        />}
        {(!isform) && <input
          type="hidden"
          ref={(c) => {
            this.input2 = c;
          }}
          checked={this.isControlled ? checkedProp : undefined}
          className='hidden'
          disabled={disabled}
          value={value}
        />}
      </IconButton>
    );
  }
}
