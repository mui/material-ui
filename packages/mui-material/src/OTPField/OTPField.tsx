'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import composeClasses from '@mui/utils/composeClasses';
import useId from '@mui/utils/useId';
import { useDefaultProps } from '../DefaultPropsProvider';
import OTPFieldLayout from './OTPFieldLayout';
import OTPFieldInput from '../OTPFieldInput';
import type { OTPFieldProps } from './OTPField.types';
import { getOTPFieldUtilityClass } from './otpFieldClasses';

function useUtilityClasses(classes: OTPFieldProps['classes']) {
  const slots = {
    root: ['root'],
    label: ['label'],
    group: ['group'],
    input: ['input'],
    separator: ['separator'],
    helperText: ['helperText'],
  };

  return composeClasses(slots, getOTPFieldUtilityClass, classes);
}

function defaultGetInputAriaLabel(position: number, length: number) {
  return `Character ${position} of ${length}`;
}
/**
 *
 * Demos:
 *
 * - [OTP Field](https://next.mui.com/material-ui/react-otp-field/)
 *
 * API:
 *
 * - [OTPField API](https://next.mui.com/material-ui/api/otp-field/)
 */
const OTPField = React.forwardRef(function OTPField(
  inProps: OTPFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiOTPField' });
  const {
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    autoComplete,
    autoFocus,
    autoSubmit,
    children,
    classes: classesProp,
    // FormControl interprets the legacy HTML color attribute as a theme palette key.
    color,
    defaultValue,
    disabled,
    error = false,
    form,
    getInputAriaLabel = defaultGetInputAriaLabel,
    helperText,
    id: idProp,
    inputMode,
    inputRef,
    label,
    length = 6,
    mask,
    name,
    normalizeValue,
    onValueChange,
    onValueComplete,
    onValueInvalid,
    readOnly,
    required,
    size = 'medium',
    slotProps,
    slots,
    validationType,
    value,
    ...other
  } = props;
  const id = useId(idProp);
  const classes = useUtilityClasses(classesProp);
  const externalForwardedProps = { slots, slotProps, ...other };
  const inputs =
    children === undefined && Number.isInteger(length) && length > 0
      ? Array.from({ length }, (_, index) => <OTPFieldInput key={index} />)
      : children;

  return (
    <BaseOTPField.Root
      id={id}
      length={length}
      autoComplete={autoComplete}
      autoSubmit={autoSubmit}
      defaultValue={defaultValue}
      disabled={disabled}
      form={form}
      inputMode={inputMode}
      mask={mask}
      name={name}
      normalizeValue={normalizeValue}
      onValueChange={onValueChange}
      onValueComplete={onValueComplete}
      onValueInvalid={onValueInvalid}
      readOnly={readOnly}
      required={required}
      validationType={validationType}
      value={value}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      render={(groupProps, state) => (
        <OTPFieldLayout
          groupProps={groupProps}
          state={state}
          size={size}
          error={error || state.valid === false}
          classes={classes}
          externalForwardedProps={externalForwardedProps}
          rootRef={ref}
          id={id}
          label={label}
          helperText={helperText}
          autoFocus={autoFocus}
          inputRef={inputRef}
          getInputAriaLabel={getInputAriaLabel}
        >
          {inputs}
        </OTPFieldLayout>
      )}
    />
  );
});

OTPField.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby': PropTypes.string,
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label': PropTypes.string,
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * The autocomplete hint for the first character input and the form input.
   * @default 'one-time-code'
   */
  autoComplete: PropTypes.string,
  /**
   * Focus the first character input on mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Submit the associated form when the code becomes complete.
   * @default false
   */
  autoSubmit: PropTypes.bool,
  /**
   * Character inputs and optional decorative separators. When omitted, the field renders one OTPFieldInput per character.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the outer root element.
   */
  className: PropTypes.string,
  color: PropTypes.string,
  /**
   * The initial code for an uncontrolled field.
   * @default ''
   */
  defaultValue: PropTypes.string,
  /**
   * Disable all the character inputs and omit the code from form submission.
   */
  disabled: PropTypes.bool,
  /**
   * Display the field in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * The ID of the form that owns the field.
   */
  form: PropTypes.string,
  /**
   * Accessible name for a character after the first. Positions start at one.
   * @default function defaultGetInputAriaLabel(position: number, length: number) {
   *   return `Character ${position} of ${length}`;
   * }
   */
  getInputAriaLabel: PropTypes.func,
  /**
   * The supporting or error text displayed below the inputs.
   */
  helperText: PropTypes.node,
  /**
   * The ID of the first character input. Subsequent input IDs are derived from it.
   */
  id: PropTypes.string,
  /**
   * The virtual keyboard hint. Defaults to the keyboard for the validation type.
   */
  inputMode: PropTypes.oneOf([
    'decimal',
    'email',
    'none',
    'numeric',
    'search',
    'tel',
    'text',
    'url',
  ]),
  /**
   * A ref to the first visible character input.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  /**
   * The label associated with the first character input.
   */
  label: PropTypes.node,
  /**
   * The number of characters in the code. When passing children, match the number of OTPFieldInput elements.
   * @default 6
   */
  length: PropTypes.number,
  /**
   * Mask the characters as they are entered.
   * @default false
   */
  mask: PropTypes.bool,
  /**
   * The name used to submit the field value as one string.
   */
  name: PropTypes.string,
  /**
   * Normalize the filtered code before it is stored. The function should be idempotent.
   */
  normalizeValue: PropTypes.func,
  /**
   * Called with the new code and the change details. The change can be canceled.
   */
  onValueChange: PropTypes.func,
  /**
   * Called when the code becomes complete or a complete code is pasted, before optional form submission.
   */
  onValueComplete: PropTypes.func,
  /**
   * Called with the attempted input when filtering or normalization rejects characters.
   */
  onValueInvalid: PropTypes.func,
  /**
   * Keep the field focusable while preventing edits.
   */
  readOnly: PropTypes.bool,
  /**
   * Require a complete code before form submission.
   */
  required: PropTypes.bool,
  /**
   * The size of the field.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Props for the Material slots and their corresponding Base UI parts.
   */
  slotProps: PropTypes.shape({
    group: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    helperText: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * Components used to render the field's slots.
   */
  slots: PropTypes.shape({
    group: PropTypes.elementType,
    helperText: PropTypes.elementType,
    label: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * System styles for the outer root element.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The set of characters accepted in the code.
   * @default 'numeric'
   */
  validationType: PropTypes.oneOf(['alpha', 'alphanumeric', 'none', 'numeric']),
  /**
   * The code when controlling the field. Use an empty string for an empty field.
   */
  value: PropTypes.string,
} as any;

export default OTPField;
