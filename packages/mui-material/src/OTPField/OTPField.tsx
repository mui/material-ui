'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import composeClasses from '@mui/utils/composeClasses';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useId from '@mui/utils/useId';
import { useDefaultProps } from '../DefaultPropsProvider';
import OTPFieldLayout from './OTPFieldLayout';
import OTPFieldInput from '../OTPFieldInput';
import type { OTPFieldOwnerState, OTPFieldProps } from './OTPField.types';
import { getOTPFieldUtilityClass } from './otpFieldClasses';

function useUtilityClasses(classes: OTPFieldProps['classes']) {
  const slots = {
    root: ['root'],
    label: ['label'],
    group: ['group'],
    input: ['input'],
    separator: ['separator'],
    formHelperText: ['formHelperText'],
  };

  return composeClasses(slots, getOTPFieldUtilityClass, classes);
}

function defaultGetInputAriaLabel(position: number, length: number) {
  return `Character ${position} of ${length}`;
}

/**
 * A field for entering a one-time password, one character per input.
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
    color = 'primary',
    defaultValue,
    disabled,
    error = false,
    form,
    fullWidth = false,
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
    render,
    required,
    size = 'medium',
    slotProps: slotPropsProp,
    slots,
    validationType,
    value,
    ...other
  } = props;
  const id = useId(idProp);
  const classes = useUtilityClasses(classesProp);
  // OTPField uses `render` for host customization, so useSlot must ignore `component`.
  const slotProps: OTPFieldProps['slotProps'] =
    slotPropsProp &&
    Object.fromEntries(
      Object.entries(slotPropsProp).map(([slotName, slotProp]) => [
        slotName,
        (state: OTPFieldOwnerState) => ({
          ...resolveComponentProps(slotProp, state),
          component: undefined,
        }),
      ]),
    );
  const externalForwardedProps = { ...other, slots, slotProps, component: undefined };
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
      render={(groupProps, baseState) => {
        // Base UI owns the group inside FormControl. Its resolved field state also drives the label and helper text.
        const ownerState: OTPFieldOwnerState = {
          ...props,
          autoFocus,
          color,
          disabled: baseState.disabled,
          error: error || baseState.valid === false,
          fullWidth,
          getInputAriaLabel,
          helperText,
          id,
          inputRef,
          label,
          length: baseState.length,
          readOnly: baseState.readOnly,
          render,
          required: baseState.required,
          size,
        };

        return (
          <OTPFieldLayout
            groupProps={groupProps}
            baseState={baseState}
            ownerState={ownerState}
            classes={classes}
            externalForwardedProps={externalForwardedProps}
            rootRef={ref}
          >
            {inputs}
          </OTPFieldLayout>
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
  /**
   * The theme palette color of the focused character's outline.
   * To use a [custom palette color](https://mui.com/material-ui/customization/palette/#custom-colors)
   * in TypeScript, augment `OTPFieldPropsColorOverrides`.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */
    .oneOfType([
      PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      PropTypes.string,
    ]),
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
   * If `true`, the field fills its container and the character inputs share the available width equally.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Accessible name for a character after the first. Positions start at one.
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
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
   * Replaces the outer field element while preserving its styles and behavior.
   * Accepts an element or a function that receives the root props and Base UI field state.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Require a complete code before form submission.
   */
  required: PropTypes.bool,
  /**
   * The size of the field. Augment `OTPFieldPropsSizeOverrides` to add a custom size.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */
    .oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),
  /**
   * Props for the Material slots and their corresponding Base UI parts.
   */
  slotProps: PropTypes.shape({
    formHelperText: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    group: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * Components used to render the field's slots.
   */
  slots: PropTypes.shape({
    formHelperText: PropTypes.elementType,
    group: PropTypes.elementType,
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
