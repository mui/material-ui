// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'recompose/shallowEqual';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import keycode from 'keycode';
import customPropTypes from '../utils/customPropTypes';
import SelectFieldInput from './SelectFieldInput';
import FormControl from '../Form/FormControl';
import InputLabel from '../Input/InputLabel';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';

export const styleSheet = createStyleSheet('MuiSelectField', () => {
  return {
    label: {
      paddingLeft: 0,
    },
    menu: {
    },
    icon: {
      right: 0,
    },
    hideDropDownUnderline: {
      borderTop: 'none',
    },
    dropDownMenu: {
      display: 'block',
    },
  };
});

/**
 * ```jsx
 * <SelectField />
 * ```
 */
class SelectField extends Component {
  static propTypes = {
    /**
     * The `MenuItem` elements to populate the select field with.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Custom compare function.
     */
    compareFunction: PropTypes.func,
    /**
     * If `true`, the select field will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Whether the label should be displayed in an error state.
     */
    error: PropTypes.bool,
    /**
     * Whether the label should be hidden when option is selected.
     */
    hideLabel: PropTypes.bool,
    /*
     * @ignore
     */
    id: PropTypes.string,
    /**
     * The CSS class name of the input element.
     */
    inputClassName: PropTypes.string,
    /**
     * Properties applied to the internal `<Input />` component.
     */
    inputProps: PropTypes.object,
    /**
     * The label text.
     */
    label: PropTypes.node,
    /**
     * The CSS class name of the label element.
     */
    labelClassName: PropTypes.string,
    /**
     * The CSS class name of the `Menu` element.
     */
    menuClassName: PropTypes.string,
    /**
     * Properties applied to the internal `<Menu />` component.
     */
    menuProps: PropTypes.object,
    /** @ignore */
    onBlur: PropTypes.func,
    /**
     * Callback function fired when a menu item is selected.
     *
     * @param {object} event TouchTap event targeting the menu item
     * that was selected.
     * @param {number} key The index of the selected menu item.
     * @param {any} payload The `value` prop of the selected menu item.
     */
    onChange: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /**
     * Whether the label should be displayed as required (asterisk).
     */
    required: PropTypes.bool,
    /**
     * Type of the input element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    compareFunction: (currentValue, itemValue) => currentValue === itemValue,
    disabled: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    anchorEl: undefined,
    ignoreFocusOnce: false,
    open: false,
    selectedIndex: undefined,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context.styleManager.theme, nextContext.styleManager.theme)
    );
  }

  handleMouseDown = (event) => event.preventDefault();

  handleKeyDown = (event) => {
    if (keycode(event) === 'space' || keycode(event) === 'enter') {
      event.preventDefault();
      this.setState({ open: true, anchorEl: event.currentTarget });
    }
  };

  handleClick = (event) => {
    event.currentTarget.focus();
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => this.setState({ open: false });

  handleSelectFocus = (event) => {
    if (this.state.ignoreFocusOnce) {
      event.stopPropagation();
      this.setState({ ignoreFocusOnce: false });
    }
  };

  handleSelectBlur = (event) => {
    if (this.state.open) {
      event.stopPropagation();
    }
  };

  handleItemClick = (event, index, value) => {
    event.persist();
    this.setState({
      open: false,
      ignoreFocusOnce: true,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(event, index, value);
      }
    });
  };

  render() {
    const {
      children,
      className,
      compareFunction,
      disabled,
      error,
      hideLabel,
      inputClassName,
      inputProps,
      label,
      labelClassName,
      onChange, // eslint-disable-line no-unused-vars
      menuClassName,
      menuProps,
      required,
      type,
      value,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const initialShrink = value !== '' && typeof value !== 'undefined';

    return (
      <FormControl
        className={className}
        error={error}
        required={required}
        {...other}
      >
        {label && !(hideLabel && value) && (
          <InputLabel className={labelClassName} shrink={initialShrink}>
            {label}
          </InputLabel>
        )}
        <Input
          className={inputClassName}
          value={value}
          type={type}
          disabled={disabled}
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
          onSelectFocus={this.handleSelectFocus}
          onSelectBlur={this.handleSelectBlur}
          component={SelectFieldInput}
          label={label}
          options={children}
          {...inputProps}
        />
        <Menu
          anchorEl={this.state.anchorEl}
          className={classNames(classes.menu, menuClassName)}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          {...menuProps}
        >
          {React.Children.map(children, (child, index) =>
            (typeof child.props.value === 'undefined' ? child : React.cloneElement(child, {
              selected: compareFunction(value, child.props.value),
              onClick: (event) => this.handleItemClick(event, index, child.props.value),
            })),
          )}
        </Menu>
      </FormControl>
    );
  }
}

export default SelectField;
