// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';
import CheckBoxOutlineBlankIcon from '../svg-icons/check-box-outline-blank';
import CheckBoxIcon from '../svg-icons/check-box';
import Icon from '../Icon';

export const styleSheet = createStyleSheet('MuiSwitchBase', {
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
});

export default function createSwitch(
  {
    defaultIcon = <CheckBoxOutlineBlankIcon />,
    defaultCheckedIcon = <CheckBoxIcon />,
    inputType = 'checkbox',
    styleSheet: switchStyleSheet,
  } = {},
) {
  /**
   * @ignore - internal component.
   */
  class SwitchBase extends Component {
    static defaultProps = {
      icon: defaultIcon,
      checkedIcon: defaultCheckedIcon,
      disableRipple: false,
    };

    state = {};

    componentWillMount() {
      const { props } = this;

      this.isControlled = props.checked !== undefined;

      if (!this.isControlled) {
        // not controlled, use internal state
        this.setState({
          checked: props.defaultChecked !== undefined ? props.defaultChecked : false,
        });
      }
    }

    input = null;
    button = null;
    isControlled = null;

    handleInputChange = event => {
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
        classes,
        className: classNameProp,
        checkedClassName,
        checkedIcon,
        disabled,
        disabledClassName,
        icon: iconProp,
        inputProps,
        inputRef,
        name,
        onChange,
        tabIndex,
        value,
        ...other
      } = this.props;

      const checked = this.isControlled ? checkedProp : this.state.checked;
      const className = classNames(classes.root, classes.default, classNameProp, {
        [classNames(classes.checked, checkedClassName)]: checked,
        [classNames(classes.disabled, disabledClassName)]: disabled,
      });

      let icon = checked ? checkedIcon : iconProp;

      if (typeof icon === 'string') {
        icon = (
          <Icon>
            {icon}
          </Icon>
        );
      }

      return (
        <IconButton
          data-mui-test="SwitchBase"
          component="span"
          className={className}
          disabled={disabled}
          tabIndex={null}
          role={undefined}
          rootRef={node => {
            this.button = node;
          }}
          {...other}
        >
          {icon}
          <input
            ref={node => {
              this.input = node;
              if (inputRef) {
                inputRef(node);
              }
            }}
            type={inputType}
            name={name}
            checked={this.isControlled ? checkedProp : undefined}
            onChange={this.handleInputChange}
            className={classes.input}
            disabled={disabled}
            tabIndex={tabIndex}
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
     * If `true`, the component appears selected.
     */
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /**
     * The CSS class name of the root element when checked.
     */
    checkedClassName: PropTypes.string,
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
     * The CSS class name of the root element when disabled.
     */
    disabledClassName: PropTypes.string,
    /**
     * If `true`, the ripple will be disabled.
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
    /*
     * @ignore
     */
    name: PropTypes.string,
    /**
     * Callback fired when the  is changed.
     *
     * @param {object} event The event source of the callback
     * @param {boolean} checked The `checked` value of the switch
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    tabIndex: PropTypes.string,
    /**
     * The value of the component.
     */
    value: PropTypes.string,
  };

  return withStyles([switchStyleSheet, styleSheet])(SwitchBase);
}
