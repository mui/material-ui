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
  };
});

export function createSwitch({
  defaultIcon = 'check_box_outline_blank',
  defaultCheckedIcon = 'check_box',
  inputType = 'checkbox',
  styleSheet: switchStyleSheet,
} = {}) {
  return class SwitchBase extends Component {
    static propTypes = {
      /**
       * SwitchBase is checked if true.
       */
      checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      /**
       * The CSS class name of the root element when checked.
       */
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
       * If `true`, the switch will be disabled.
       */
      disabled: PropTypes.bool,
      /**
       * The CSS class name of the root element when disabled.
       */
      disabledClassName: PropTypes.string,
      icon: PropTypes.node,
      /*
       * @ignore
       */
      name: PropTypes.string,
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
      /**
       * @ignore
       */
      tabIndex: PropTypes.string,
      value: PropTypes.string,
    };

    static defaultProps = {
      icon: defaultIcon,
      checkedIcon: defaultCheckedIcon,
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
    button = undefined;
    isControlled = undefined;

    focus = () => this.input.focus();

    handleInputChange = (event) => {
      let newChecked;

      if (this.isControlled) {
        newChecked = !this.props.checked;
      } else {
        newChecked = !this.state.checked;
        if (this.input && this.input.checked !== newChecked) {
          this.input.checked = newChecked;
        }
        this.setState({ checked: !this.state.checked });
      }

      if (this.props.onChange) {
        this.props.onChange(event, newChecked);
      }
    };

    render() {
      const {
        checked: checkedProp,
        className: classNameProp,
        checkedClassName,
        checkedIcon,
        disabled,
        disabledClassName,
        icon: iconProp,
        name,
        onChange, // eslint-disable-line no-unused-vars
        ripple,
        tabIndex,
        value,
        ...other
      } = this.props;


      const checked = this.isControlled ? checkedProp : this.state.checked;
      const classes = this.context.styleManager.render(styleSheet);
      const switchClasses = switchStyleSheet ? this.context.styleManager.render(switchStyleSheet) : {};

      const className = classNames(classes.root, switchClasses.default, classNameProp, {
        [classNames(switchClasses.checked, checkedClassName)]: checked,
        [classNames(switchClasses.disabled, disabledClassName)]: disabled,
      });

      let icon = checked ? checkedIcon : iconProp;

      if (typeof icon === 'string') {
        icon = <span className="material-icons" aria-hidden="true">{icon}</span>;
      }

      return (
        <IconButton
          data-mui-test="SwitchBase"
          component="span"
          buttonRef={(c) => { this.button = c; }}
          className={className}
          disabled={disabled}
          ripple={ripple}
          tabIndex={null}
          role={undefined}
          {...other}
        >
          {icon}
          <input
            ref={(c) => { this.input = c; }}
            type={inputType}
            name={name}
            checked={this.isControlled ? checkedProp : undefined}
            onChange={this.handleInputChange}
            className={classes.input}
            disabled={disabled}
            tabIndex={tabIndex}
            value={value}
          />
        </IconButton>
      );
    }
  };
}
