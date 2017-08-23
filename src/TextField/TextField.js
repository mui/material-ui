// @flow
// @inheritedComponent FormControl

import * as React from 'react';
import Input, { InputLabel } from '../Input';
import FormControl from '../Form/FormControl';
import FormHelperText from '../Form/FormHelperText';

export type Props = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusion, it's more like an autofill.
   * You can learn about it with that article
   * https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
   */
  autoComplete?: string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus?: boolean,
  /**
   * @ignore
   */
  className?: string,
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
  helperText?: React.Node,
  /**
   * The CSS class name of the helper text element.
   */
  helperTextClassName?: string,
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
  label?: React.Node,
  /**
   * The CSS class name of the label element.
   */
  labelClassName?: string,
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline?: boolean,
  /**
   * Name attribute of the `Input` element.
   */
  name?: string,
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
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number,
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax?: string | number,
  /**
   * Type attribute of the `Input` element. It should be a valid HTML5 input type.
   */
  type?: string,
  /**
   * The value of the `Input` element, required for a controlled component.
   */
  value?: string | number,
  /**
   * If `dense` | `normal`, will adjust vertical spacing of this and contained components.
   */
  margin?: 'none' | 'dense' | 'normal',
};

function TextField(props: Props) {
  const {
    autoComplete,
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
    fullWidth,
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
    <FormControl
      fullWidth={fullWidth}
      ref={rootRef}
      className={className}
      error={error}
      required={required}
      {...other}
    >
      {label &&
        <InputLabel htmlFor={id} className={labelClassName} {...InputLabelProps}>
          {label}
        </InputLabel>}
      <Input
        autoComplete={autoComplete}
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

TextField.defaultProps = {
  required: false,
};

export default TextField;
