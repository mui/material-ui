'use client';

import * as React from 'react';
import PropTypes from 'prop-types';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import useId from '@mui/utils/useId';
import resolveComponentProps from '@mui/utils/resolveComponentProps';

import { useDefaultProps } from '../DefaultPropsProvider';
import type { NumberFieldProps } from './NumberField.types';
import RootSlot from './NumberFieldRootSlot';
import InputSlot from './NumberFieldInputSlot';
import { useUtilityClasses } from './utils';
/**
 *
 * Demos:
 *
 * - [Number Field](https://next.mui.com/material-ui/react-number-field/)
 *
 * API:
 *
 * - [NumberField API](https://next.mui.com/material-ui/api/number-field/)
 * - inherits [FormControl API](https://next.mui.com/material-ui/api/form-control/)
 */
const NumberField = React.forwardRef(function NumberField(
  inProps: NumberFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps<NumberFieldProps>({ props: inProps, name: 'MuiNumberField' });
  const {
    allowOutOfRange = false,
    allowWheelScrub = false,
    autoFocus = false,
    className,
    color = 'primary',
    controlsPosition = 'end',
    defaultValue,
    disabled = false,
    error = false,
    form,
    format,
    fullWidth = false,
    helperText,
    id: idProp,
    inputRef,
    label,
    locale,
    largeStep,
    max,
    min,
    name,
    onBlur,
    onFocus,
    onValueChange,
    onValueCommitted,
    placeholder,
    readOnly = false,
    required = false,
    scrubArea = false,
    size = 'medium',
    slots = {},
    slotProps = {},
    smallStep,
    step,
    snapOnStep = false,
    value,
    variant = 'outlined',
    ...other
  } = props;

  const id = useId(idProp);

  const ownerState = {
    ...props,
    allowOutOfRange,
    allowWheelScrub,
    autoFocus,
    color,
    controlsPosition,
    disabled,
    error,
    fullWidth,
    id,
    placeholder,
    readOnly,
    required,
    scrubArea,
    size,
    snapOnStep,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
    ...other,
  };

  return (
    <BaseNumberField.Root
      allowOutOfRange={allowOutOfRange}
      allowWheelScrub={allowWheelScrub}
      defaultValue={defaultValue}
      disabled={disabled}
      form={form}
      format={format}
      id={id}
      locale={locale}
      largeStep={largeStep}
      max={max}
      min={min}
      name={name}
      onValueChange={onValueChange}
      onValueCommitted={onValueCommitted}
      readOnly={readOnly}
      required={required}
      render={(baseProps, baseState) => {
        const resolvedOwnerState = {
          ...ownerState,
          disabled: baseState.disabled,
          required: baseState.required,
          readOnly: baseState.readOnly,
        };

        // Share these props between the root's label/adornment setup and the input's
        // rendering so each callback runs once with Base UI's resolved flags.
        const resolvedExternalForwardedProps = {
          ...externalForwardedProps,
          slotProps: {
            ...slotProps,
            input: resolveComponentProps(slotProps.input, resolvedOwnerState),
            inputLabel: resolveComponentProps(slotProps.inputLabel, resolvedOwnerState),
          },
        };

        return (
          <RootSlot
            baseProps={baseProps}
            baseState={baseState}
            classes={classes}
            materialProps={resolvedOwnerState}
            ref={ref}
            externalForwardedProps={resolvedExternalForwardedProps}
          >
            <BaseNumberField.Input
              form={form}
              render={(inputBaseProps, inputBaseState) => (
                <InputSlot
                  baseProps={inputBaseProps}
                  baseState={inputBaseState}
                  classes={classes}
                  materialProps={resolvedOwnerState}
                  externalForwardedProps={resolvedExternalForwardedProps}
                />
              )}
            />
          </RootSlot>
        );
      }}
      smallStep={smallStep}
      snapOnStep={snapOnStep}
      step={step}
      value={value}
    />
  );
});

NumberField.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, values entered by typing or pasting are not clamped to `min` and `max`.
   * Stepping with the buttons, keyboard, mouse wheel, or scrub area still respects the bounds.
   * @default false
   */
  allowOutOfRange: PropTypes.bool,
  /**
   * If `true`, the mouse wheel adjusts the value while the input is focused and hovered.
   * @default false
   */
  allowWheelScrub: PropTypes.bool,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: PropTypes.bool,
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
  color: PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
  /**
   * The arrangement of the control buttons.
   * Use `'end'` for horizontal minus/plus buttons at the end, `'split'` for a minus button
   * at the start and a plus button at the end, `'stacked'` for up/down chevrons at the end,
   * or `false` for no control buttons.
   * @default 'end'
   */
  controlsPosition: PropTypes.oneOf(['end', 'split', 'stacked', false]),
  /**
   * The initial numeric value for an uncontrolled field.
   * Omit this prop to start with an empty field.
   * Use `value` for a controlled field.
   */
  defaultValue: PropTypes.number,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the field is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * The `id` of the form that owns the field.
   * Use this prop when the field is rendered outside the form.
   */
  form: PropTypes.string,
  /**
   * Options passed to `Intl.NumberFormat` to format the displayed value.
   * The `value` prop and value callbacks use numbers or `null`, regardless of the display format.
   *
   * See [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
   */
  format: PropTypes.shape({
    compactDisplay: PropTypes.oneOf(['long', 'short']),
    currency: PropTypes.string,
    currencyDisplay: PropTypes.oneOf(['code', 'name', 'narrowSymbol', 'symbol']),
    currencySign: PropTypes.oneOf(['accounting', 'standard']),
    localeMatcher: PropTypes.oneOf(['best fit', 'lookup']),
    maximumFractionDigits: PropTypes.number,
    maximumSignificantDigits: PropTypes.number,
    minimumFractionDigits: PropTypes.number,
    minimumIntegerDigits: PropTypes.number,
    minimumSignificantDigits: PropTypes.number,
    notation: PropTypes.oneOf(['compact', 'engineering', 'scientific', 'standard']),
    numberingSystem: PropTypes.string,
    signDisplay: PropTypes.oneOf(['always', 'auto', 'exceptZero', 'never']),
    style: PropTypes.oneOf(['currency', 'decimal', 'percent', 'unit']),
    unit: PropTypes.string,
    unitDisplay: PropTypes.oneOf(['long', 'narrow', 'short']),
    useGrouping: PropTypes.bool,
  }),
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
   * The `id` of the visible input, used to associate its label and helper text.
   * If omitted, an ID is generated.
   */
  id: PropTypes.string,
  /**
   * A ref to the visible `<input>` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * The amount to increment or decrement while holding the Shift key.
   * @default 10
   */
  largeStep: PropTypes.number,
  /**
   * The locale or locales used to format and parse the value.
   * Defaults to the runtime's locale.
   *
   * See [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
   */
  locale: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          baseName: PropTypes.string.isRequired,
          calendar: PropTypes.string,
          caseFirst: PropTypes.oneOf(['false', 'lower', 'upper']),
          collation: PropTypes.string,
          hourCycle: PropTypes.oneOf(['h11', 'h12', 'h23', 'h24']),
          language: PropTypes.string.isRequired,
          maximize: PropTypes.func.isRequired,
          minimize: PropTypes.func.isRequired,
          numberingSystem: PropTypes.string,
          numeric: PropTypes.bool,
          region: PropTypes.string,
          script: PropTypes.string,
          toString: PropTypes.func.isRequired,
        }),
        PropTypes.string,
      ]).isRequired,
    ),
    PropTypes.shape({
      baseName: PropTypes.string.isRequired,
      calendar: PropTypes.string,
      caseFirst: PropTypes.oneOf(['false', 'lower', 'upper']),
      collation: PropTypes.string,
      hourCycle: PropTypes.oneOf(['h11', 'h12', 'h23', 'h24']),
      language: PropTypes.string.isRequired,
      maximize: PropTypes.func.isRequired,
      minimize: PropTypes.func.isRequired,
      numberingSystem: PropTypes.string,
      numeric: PropTypes.bool,
      region: PropTypes.string,
      script: PropTypes.string,
      toString: PropTypes.func.isRequired,
    }),
    PropTypes.string,
  ]),
  /**
   * The upper bound for the numeric value.
   * The increment button is disabled at or above this value.
   */
  max: PropTypes.number,
  /**
   * The lower bound for the numeric value.
   * The decrement button is disabled at or below this value.
   */
  min: PropTypes.number,
  /**
   * Identifies the field when a form is submitted.
   * The submitted value is the unformatted number.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the input loses focus.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the input receives focus.
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the numeric value changes.
   * Call `eventDetails.cancel()` to reject the proposed change.
   *
   * @param {number|null} value The new numeric value, or `null` when the input is empty.
   * @param {object} eventDetails The interaction details, including the native `event` and a `reason`:
   * `"input-change"`, `"input-clear"`, `"input-blur"`, `"input-paste"`, `"keyboard"`,
   * `"increment-press"`, `"decrement-press"`, `"wheel"`, `"scrub"`, or `"none"`.
   */
  onValueChange: PropTypes.func,
  /**
   * Callback fired when the value is committed.
   * Direct text entry commits on blur.
   * Pointer presses on the stepper buttons and scrub interactions commit on pointer release.
   * Keyboard and wheel changes commit immediately.
   *
   * @param {number|null} value The committed numeric value, or `null` when the input is empty.
   * @param {object} eventDetails The interaction details, including the native `event` and a `reason`:
   * `"input-blur"`, `"input-clear"`, `"keyboard"`, `"increment-press"`, `"decrement-press"`,
   * `"wheel"`, `"scrub"`, or `"none"`.
   */
  onValueCommitted: PropTypes.func,
  /**
   * The short hint displayed in the input when it is empty.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the value cannot be changed through user interaction.
   * The input can still receive focus.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, a value is required for form submission and the label is marked as required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The placement of the drag handle used to adjust the value.
   * Use `'start'` or `'end'` to show the handle, or `false` to hide it.
   * Its position is independent of `controlsPosition`.
   * @default false
   */
  scrubArea: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    decrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    formHelperText: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    htmlInput: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    incrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    inputLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scrubArea: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scrubAreaCursor: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    decrementButton: PropTypes.elementType,
    formHelperText: PropTypes.elementType,
    htmlInput: PropTypes.elementType,
    incrementButton: PropTypes.elementType,
    input: PropTypes.elementType,
    inputLabel: PropTypes.elementType,
    root: PropTypes.elementType,
    scrubArea: PropTypes.elementType,
    scrubAreaCursor: PropTypes.elementType,
  }),
  /**
   * The amount to increment or decrement while holding the Alt key (Option on macOS).
   * @default 0.1
   */
  smallStep: PropTypes.number,
  /**
   * If `true`, stepping snaps the value to intervals starting at `min`, or `0` if `min` is omitted.
   * Modifier keys use the corresponding `smallStep` or `largeStep` intervals.
   * @default false
   */
  snapOnStep: PropTypes.bool,
  /**
   * The amount to increment or decrement with the buttons, arrow keys, mouse wheel, or scrub area.
   * Set `min` explicitly to enable step validation on form submission.
   * Set to `"any"` to disable step validation; interactive stepping then uses `1`,
   * while the Alt and Shift keys still use `smallStep` and `largeStep`.
   * @default 1
   */
  step: PropTypes.oneOfType([PropTypes.oneOf(['any']), PropTypes.number]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The controlled numeric value.
   * Use `null` to display an empty field and `onValueChange` to update the value.
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
} as any;

export default NumberField;
