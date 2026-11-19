'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import composeClasses from '@mui/utils/composeClasses';
import useId from '@mui/utils/useId';
import { useDefaultProps } from '../DefaultPropsProvider';
import FormControl from '../FormControl';
import FormHelperText from '../FormHelperText';
import FormLabel from '../FormLabel';
import { styled } from '../zero-styled';
import type { OTPFieldOwnerState, OTPFieldProps } from './OTPField.types';
import { getOTPFieldUtilityClass } from './otpFieldClasses';

function useUtilityClasses(classes: OTPFieldProps['classes']) {
  const slots = {
    root: ['root'],
    label: ['label'],
    group: ['group'],
    input: ['input'],
    helperText: ['helperText'],
  };

  return composeClasses(slots, getOTPFieldUtilityClass, classes);
}

const OTPFieldGroup = styled('div', { name: 'MuiOTPField', slot: 'Group' })(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  'label + &': { marginTop: theme.spacing(0.5) },
}));

const OTPFieldInput = styled('input', { name: 'MuiOTPField', slot: 'Input' })<{
  ownerState: OTPFieldOwnerState;
}>(({ theme, ownerState }) => {
  const { palette, shape } = theme.vars || theme;
  const small = ownerState.size === 'small';

  return {
    ...theme.typography.body1,
    boxSizing: 'border-box',
    width: theme.spacing(small ? 5 : 6),
    minWidth: 0,
    height: theme.spacing(small ? 5 : 7),
    padding: 0,
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
    color: palette.text.primary,
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: ownerState.error ? palette.error.main : palette.text.secondary,
    borderRadius: shape.borderRadius,
    '&:focus': {
      outline: '2px solid',
      outlineColor: ownerState.error ? palette.error.main : palette.primary.main,
      outlineOffset: -2,
    },
    '&:disabled': {
      color: palette.text.disabled,
      borderColor: palette.action.disabled,
    },
  };
});

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
    classes: classesProp,
    className,
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
    renderSeparator,
    required,
    size = 'medium',
    slotProps,
    slots,
    validationType,
    value,
    ...other
  } = props;
  const id = useId(idProp);
  const hasLabel = label != null && label !== '';
  const hasHelperText = helperText != null && helperText !== '';
  const labelId = hasLabel && id ? `${id}-label` : undefined;
  const helperTextId = hasHelperText && id ? `${id}-helper-text` : undefined;
  const describedBy = [ariaDescribedBy, helperTextId].filter(Boolean).join(' ') || undefined;
  const classes = useUtilityClasses(classesProp);

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
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy ?? labelId}
      render={(groupProps, state) => {
        const ownerState: OTPFieldOwnerState = {
          length: state.length,
          disabled: state.disabled,
          readOnly: state.readOnly,
          required: state.required,
          error: error || state.valid === false,
          size,
        };

        return (
          <FormControl
            {...other}
            ref={ref}
            className={clsx(classes.root, className)}
            disabled={ownerState.disabled}
            error={ownerState.error}
            required={ownerState.required}
            size={ownerState.size}
          >
            {hasLabel && (
              <FormLabel className={classes.label} id={labelId} htmlFor={id}>
                {label}
              </FormLabel>
            )}
            <OTPFieldGroup {...groupProps} className={classes.group}>
              {Number.isInteger(length) &&
                length > 0 &&
                Array.from({ length }, (_, index) => (
                  <BaseOTPField.Input
                    key={index}
                    ref={index === 0 ? inputRef : undefined}
                    autoFocus={index === 0 && autoFocus}
                    className={classes.input}
                    aria-label={index === 0 ? undefined : getInputAriaLabel(index + 1, length)}
                    aria-labelledby={index === 0 ? ariaLabelledBy : undefined}
                    aria-describedby={groupProps['aria-describedby']}
                    aria-invalid={ownerState.error && !ownerState.disabled ? true : undefined}
                    render={
                      <OTPFieldInput
                        ownerState={ownerState}
                        {...(index === 0 && ariaLabel && { 'aria-label': ariaLabel })}
                      />
                    }
                  />
                ))}
            </OTPFieldGroup>
            {hasHelperText && (
              <FormHelperText className={classes.helperText} id={helperTextId}>
                {helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
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
