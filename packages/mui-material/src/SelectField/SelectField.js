'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { refType, unstable_useId as useId } from '@mui/utils';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Input from '../Input';
import FilledInput from '../FilledInput';
import OutlinedInput from '../OutlinedInput';
import InputLabel from '../InputLabel';
import FormControl from '../FormControl';
import FormHelperText from '../FormHelperText';
import Select from '../Select';
import { getSelectFieldUtilityClass } from './selectFieldClasses';

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSelectFieldUtilityClass, classes);
};

const SelectFieldRoot = styled(FormControl, {
  name: 'MuiSelectField',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});

/**
 * The `SelectField` is extracted out of `<TextField select />`
 */
const SelectField = React.forwardRef(function SelectField(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSelectField' });
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = 'primary',
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps: FormHelperTextPropsFromProps,
    fullWidth = false,
    helperText,
    id: idOverride,
    InputLabelProps: InputLabelPropsFromProps,
    inputProps: inputPropsFromProps,
    InputProps: InputPropsFromProps,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    SelectProps: SelectPropsFromProps,
    type,
    value,
    variant = 'outlined',
    // slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select: true,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  if (process.env.NODE_ENV !== 'production') {
    if (!children) {
      console.error('MUI: `children` must be passed when using the `SelectField` component.');
    }
  }

  const InputMore = {};

  const InputLabelProps = slotProps.inputLabel?.root ?? InputLabelPropsFromProps;

  if (variant === 'outlined') {
    if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
      InputMore.notched = InputLabelProps.shrink;
    }
    InputMore.label = label;
  }

  const SelectProps = slotProps.select?.root ?? SelectPropsFromProps;

  // unset defaults from textbox inputs
  if (!SelectPropsFromProps || !SelectPropsFromProps.native) {
    InputMore.id = undefined;
  }
  InputMore['aria-describedby'] = undefined;

  const InputProps = slotProps.input?.root ?? InputPropsFromProps;
  const inputProps = slotProps.input?.input ?? inputPropsFromProps;

  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;
  const InputComponent = variantComponent[variant];
  const InputElement = (
    <InputComponent // this will be <FilledInput or <OutlinedInput
      aria-describedby={helperTextId}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      multiline={multiline}
      name={name}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      type={type}
      value={value}
      id={id}
      inputRef={inputRef}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      inputProps={inputProps}
      {...InputMore}
      {...InputProps}
    />
  );

  const FormHelperTextProps = slotProps.formHelperText?.root ?? FormHelperTextPropsFromProps;

  return (
    <SelectFieldRoot // slots.root
      className={clsx(classes.root, className)}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      ref={ref}
      required={required}
      color={color}
      variant={variant}
      ownerState={ownerState}
      {...other}
    >
      {label != null &&
        label !== '' && ( // slots.inputLabel.root, slots.inputLabel.asterisk (private)
          <InputLabel htmlFor={id} id={inputLabelId} {...InputLabelProps}>
            {label}
          </InputLabel>
        )}

      <Select // slots.select.root, slots.select.listbox, slots.select.popper
        aria-describedby={helperTextId}
        id={id}
        labelId={inputLabelId}
        value={value}
        input={InputElement} // slots.input.root, slots.input.input
        {...SelectProps}
      >
        {children}
      </Select>

      {helperText && ( // slots.formHelperText.root
        <FormHelperText id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </SelectFieldRoot>
  );
});

SelectField.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps: PropTypes.object,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: PropTypes.string,
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps: PropTypes.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Render a [`Select`](/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select: PropTypes.bool,
  /**
   * Props applied to the [`Select`](/material-ui/api/select/) element.
   */
  SelectProps: PropTypes.object,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default SelectField;
