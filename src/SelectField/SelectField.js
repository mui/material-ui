// @flow weak

import React, { Component } from 'react';
import type { Element } from 'react';
import keycode from 'keycode';
import SelectFieldInput from './SelectFieldInput';
import FormControl from '../Form/FormControl';
import FormHelperText from '../Form/FormHelperText';
import InputLabel from '../Input/InputLabel';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';

const OPEN_MENU_KEYS = ['enter', 'space', 'up', 'down'];

type DefaultProps = {
  compareFunction: Function,
  disabled: boolean,
};

export type Props = {
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus?: boolean,
  /**
   * The `MenuItem` elements to populate the select field with.
   */
  children?: Element<*>,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Custom compare function.
   */
  compareFunction?: Function,
  /**
   * The default value of the `Input` element.
   */
  defaultValue?: string,
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean,
  /**
   * Properties applied to the `FormHelperText` element.
   */
  FormHelperTextProps?: Object,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean,
  /**
   * The helper text content.
   */
  helperText?: string | Element<*>,
  /**
   * The CSS class name of the helper text element.
   */
  helperTextClassName?: string,
  /**
   * If `true`, the label will be hidden when option is selected.
   */
  hideLabel?: boolean,
  /**
   * The id of the `input` element.
   */
  id?: string,
  /**
   * The CSS class name of the `input` element.
   */
  inputClassName?: string,
  /**
   * The CSS class name of the `Input` element.
   */
  InputClassName?: string,
  /**
   * Properties applied to the `InputLabel` element.
   */
  InputLabelProps?: Object,
  /**
   * Properties applied to the `input` element.
   */
  inputProps?: Object,
  /**
   * Properties applied to the `Input` element.
   */
  InputProps?: Object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: Function,
  /**
   * The label content.
   */
  label?: string | Element<*>,
  /**
   * The CSS class name of the label element.
   */
  labelClassName?: string,
  /**
   * The CSS class name of the `Menu` element.
   */
  menuClassName?: string,
  /**
   * Properties applied to the internal `<Menu />` component.
   */
  menuProps?: Object,
  /**
   * Name attribute of the `Input` element.
   */
  name?: string,
  /** @ignore */
  onBlur?: Function,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event TouchTap event targeting the menu item
   * that was selected.
   * @param {number} key The index of the selected menu item.
   * @param {any} payload The `value` prop of the selected menu item.
   */
  onChange?: Function,
  /** @ignore */
  onClean?: Function,
  /** @ignore */
  onDirty?: Function,
  /** @ignore */
  onFocus?: Function,
  placeholder?: string,
  /**
   * If `true`, the label is displayed as required.
   */
  required?: boolean,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
  /**
   * Type attribute of the `Input` element. It should be a valid HTML5 input type.
   */
  type?: string,
  /**
   * The value of the `Input` element, required for a controlled component.
   */
  value?: string | number,
};

type AllProps = DefaultProps & Props;

type State = {
  anchorEl: Object,
  ignoreFocusOnce: boolean,
  open: boolean,
  selectedIndex: number,
};

class SelectField extends Component<DefaultProps, AllProps, State> {
  props: AllProps;
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
