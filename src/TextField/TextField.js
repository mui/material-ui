// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Input, { InputLabel } from '../Input';
import FormControl from '../Form/FormControl';

function TextField(props) {
  const {
    className,
    defaultValue,
    disabled,
    error,
    id,
    inputClassName,
    inputProps,
    InputProps,
    inputRef,
    label,
    labelClassName,
    name,
    required,
    type,
    multiline,
    rows,
    rowsMax,
    value,
    ...other
  } = props;

  return (
    <FormControl
      className={className}
      error={error}
      required={required}
      {...other}
    >
      {label && (
        <InputLabel className={labelClassName}>
          {label}
        </InputLabel>
      )}
      <Input
        className={inputClassName}
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
        {...InputProps}
      />
    </FormControl>
  );
}

TextField.propTypes = {
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
  /*
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The CSS class name of the `Input` element.
   */
  inputClassName: PropTypes.string,
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
   * If `true`, the label is displayed as required.
   */
  required: PropTypes.bool,
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
