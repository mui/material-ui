// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import SelectFieldInput from './SelectFieldInput';
import FormControl from '../Form/FormControl';
import FormHelperText from '../Form/FormHelperText';
import InputLabel from '../Input/InputLabel';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';

const OPEN_MENU_KEYS = ['enter', 'space', 'up', 'down'];

/**
 * ```jsx
 * <SelectField />
 * ```
 */
class SelectField extends Component {
  static propTypes = {
    /**
     * If `true`, the input will be focused during the first mount.
     */
    autoFocus: PropTypes.bool,
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
     * The default value of the `Input` element.
     */
    defaultValue: PropTypes.string,
    /**
     * If `true`, the select field will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Whether the label should be displayed in an error state.
     */
    error: PropTypes.bool,
    /**
     * Properties applied to the `FormHelperText` element.
     */
    FormHelperTextProps: PropTypes.object,
    /**
     * If `true`, the input will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * The helper text content.
     */
    helperText: PropTypes.node,
    /**
     * The CSS class name of the helper text element.
     */
    helperTextClassName: PropTypes.string,
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
     * The CSS class name of the `Input` element.
     */
    InputClassName: PropTypes.string,
    /**
     * Properties applied to the `InputLabel` element.
     */
    InputLabelProps: PropTypes.object,
    /**
     * Passed as `inputProps` to the internal `<Input />` component.
     */
    inputProps: PropTypes.object,
    /**
     * Properties applied to the internal `<Input />` component.
     */
    InputProps: PropTypes.object,
    /**
     * Use that property to pass a ref callback to the native input component.
     */
    inputRef: PropTypes.func,
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
    /**
     * Name attribute of the `Input` element.
     */
    name: PropTypes.string,
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
    onClean: PropTypes.func,
    /** @ignore */
    onDirty: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /**
     * Whether the label should be displayed as required (asterisk).
     */
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    /**
     * Use that property to pass a ref callback to the root component.
     */
    rootRef: PropTypes.func,
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

  state = {
    anchorEl: undefined,
    ignoreFocusOnce: false,
    open: false,
    selectedIndex: undefined,
  };

  handleMouseDown = event => event.preventDefault();

  handleKeyDown = event => {
    if (OPEN_MENU_KEYS.includes(keycode(event))) {
      event.preventDefault();
      this.setState({ open: true, anchorEl: event.currentTarget });
    }
  };

  handleClick = event => {
    event.currentTarget.focus();
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => this.setState({ open: false });

  handleSelectFocus = event => {
    if (this.state.ignoreFocusOnce) {
      event.stopPropagation();
      this.setState({ ignoreFocusOnce: false });
    }
  };

  handleSelectBlur = event => {
    if (this.state.open) {
      event.stopPropagation();
    }
  };

  handleItemClick = (event, index, value) => {
    event.persist();
    this.setState(
      {
        open: false,
        ignoreFocusOnce: true,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(event, index, value);
        }
      },
    );
  };

  render() {
    const {
      children,
      autoFocus,
      className,
      compareFunction,
      defaultValue,
      disabled,
      error,
      hideLabel,
      id,
      inputClassName,
      InputClassName,
      inputProps: inputPropsProp,
      InputProps,
      inputRef,
      label,
      labelClassName,
      onDirty,
      onClean,
      onChange, // eslint-disable-line no-unused-vars
      menuClassName,
      menuProps,
      InputLabelProps,
      helperText,
      helperTextClassName,
      FormHelperTextProps,
      fullWidth,
      required,
      type,
      name,
      placeholder,
      rootRef,
      value,
      ...other
    } = this.props;
    const initialShrink = value !== '' && typeof value !== 'undefined';

    let inputProps = {
      onClick: this.handleClick,
      onMouseDown: this.handleMouseDown,
      onSelectFocus: this.handleSelectFocus,
      onSelectBlur: this.handleSelectBlur,
      options: children,
      label,
      ...inputPropsProp,
    };

    if (inputClassName) {
      inputProps = {
        className: inputClassName,
        ...inputProps,
      };
    }

    return (
      <FormControl
        fullWidth={fullWidth}
        ref={rootRef}
        className={className}
        error={error}
        required={required}
        {...other}
      >
        {label &&
          !(hideLabel && value) &&
          <InputLabel
            htmlFor={id}
            className={labelClassName}
            shrink={initialShrink}
            {...InputLabelProps}
          >
            {label}
          </InputLabel>}
        <Input
          autoFocus={autoFocus}
          className={InputClassName}
          component={SelectFieldInput}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          onKeyDown={this.handleKeyDown}
          type={type}
          value={value}
          id={id}
          inputProps={inputProps}
          inputRef={inputRef}
          placeholder={placeholder}
          {...InputProps}
        />
        {helperText &&
          <FormHelperText className={helperTextClassName} {...FormHelperTextProps}>
            {helperText}
          </FormHelperText>}
        <Menu
          anchorEl={this.state.anchorEl}
          className={menuClassName}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          {...menuProps}
        >
          {React.Children.map(children, (child, index) => {
            return typeof child.props.value === 'undefined'
              ? child
              : React.cloneElement(child, {
                  ...child.props,
                  selected: compareFunction(value, child.props.value),
                  onClick: event => this.handleItemClick(event, index, child.props.value),
                });
          })}
        </Menu>
      </FormControl>
    );
  }
}

export default SelectField;
