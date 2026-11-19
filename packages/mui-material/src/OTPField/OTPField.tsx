'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import FormControl from '../FormControl';
import type { OTPFieldProps } from './OTPField.types';
import { getOTPFieldUtilityClass } from './otpFieldClasses';

const OTPField = React.forwardRef(function OTPField(
  props: OTPFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, className } = props;
  const rootClasses = composeClasses({ root: ['root'] }, getOTPFieldUtilityClass, classes);

  return <FormControl ref={ref} className={clsx(rootClasses.root, className)} />;
});

OTPField.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the outer root element.
   */
  className: PropTypes.string,
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
   */
  error: PropTypes.bool,
  /**
   * The ID of the form that owns the field.
   */
  form: PropTypes.string,
  /**
   * Accessible name for a character after the first. Positions start at one.
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
   * The number of characters in the code. Must be a positive integer.
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
   * Return decorative content between adjacent character inputs, or null to leave the gap empty.
   * Positions range from 1 to `length - 1`.
   */
  renderSeparator: PropTypes.func,
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
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * Components used to render the field's slots.
   */
  slots: PropTypes.shape({
    group: PropTypes.elementType,
    helperText: PropTypes.elementType,
    input: PropTypes.elementType,
    label: PropTypes.elementType,
    root: PropTypes.elementType,
    separator: PropTypes.elementType,
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
