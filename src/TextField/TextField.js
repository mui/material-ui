// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Input, { InputLabel } from '../Input';
import FormControl from '../Form/FormControl';
import FormHelperText from '../Form/FormHelperText';

function TextField(props) {
  const {
    autoFocus,
    className,
    defaultValue,
    disabled,
    error,
    id,
    inputClassName,
    InputClassName,
    inputProps: inputPropsProp,
    InputProps,
    inputRef,
    label,
    labelClassName,
    InputLabelProps,
    helperText,
    helperTextClassName,
    FormHelperTextProps,
    required,
    type,
    multiline,
    name,
    placeholder,
    rootRef,
    rows,
    rowsMax,
    value,
    ...other
  } = props;

  let inputProps = inputPropsProp;

  if (inputClassName) {
    inputProps = {
      className: inputClassName,
      ...inputProps,
    };
  }

  return (
    <FormControl ref={rootRef} className={className} error={error} required={required} {...other}>
      {label &&
        <InputLabel className={labelClassName} {...InputLabelProps}>
          {label}
        </InputLabel>}
      <Input
        autoFocus={autoFocus}
        className={InputClassName}
        defaultValue={defaultValue}
        disabled={disabled}
        multiline={multiline}
        name={name}
        rows={rows}
        rowsMax={rowsMax}
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
    </FormControl>
  );
}

TextField.propTypes = {
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default value of the `Input` element.
   */
  defaultValue: PropTypes.string,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * Properties applied to the `FormHelperText` element.
   */
  FormHelperTextProps: PropTypes.object,
  /**
   * The helper text content.
   */
  helperText: PropTypes.node,
  /**
   * The CSS class name of the helper text element.
   */
  helperTextClassName: PropTypes.string,
  /*
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The CSS class name of the `input` element.
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
   * Properties applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Properties applied to the `Input` element.
   */
  InputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.func,
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * The CSS class name of the label element.
   */
  labelClassName: PropTypes.string,
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `Input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the label is displayed as required.
   */
  required: PropTypes.bool,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef: PropTypes.func,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maxium number of rows to display when multiline option is set to true.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Type attribute of the `Input` element. It should be a valid HTML5 input type.
   */
  type: PropTypes.string,
  /**
   * The value of the `Input` element, required for a controlled component.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextField.defaultProps = {
  required: false,
};

export default TextField;
