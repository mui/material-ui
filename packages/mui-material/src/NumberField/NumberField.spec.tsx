import * as React from 'react';
import { expectType } from '@mui/types';
import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import NumberField from '@mui/material/NumberField';
import type {
  NumberFieldProps,
  NumberFieldVariants,
  NumberFieldOwnerState,
  StandardNumberFieldProps,
  FilledNumberFieldProps,
  OutlinedNumberFieldProps,
} from '@mui/material/NumberField';

// Wrappers can name the constraint of the public variant generic.
function VariantWrapper<Variant extends NumberFieldVariants>(props: NumberFieldProps<Variant>) {
  return <NumberField {...props} />;
}
<VariantWrapper variant="filled" slotProps={{ input: { hiddenLabel: true } }} />;

<NumberField scrubAreaPosition="start" />;
<NumberField scrubAreaPosition="end" />;
<NumberField scrubAreaPosition={false} />;
// @ts-expect-error Placement is separate from the scrubArea slot.
<NumberField scrubArea="start" />;

<NumberField render={<section ref={React.createRef<HTMLElement>()} />} />;
<NumberField
  render={(props, state) => {
    expectType<BaseNumberField.Root.State, typeof state>(state);
    expectType<number | null, typeof state.value>(state.value);
    expectType<boolean, typeof state.scrubbing>(state.scrubbing);
    return <section {...props} />;
  }}
/>;
// @ts-expect-error render takes an element or a callback, not a tag name.
<NumberField render="section" />;
// @ts-expect-error Use render to change the root element.
<NumberField component="section" />;
// @ts-expect-error Root slot props do not expose component.
<NumberField slotProps={{ root: { component: 'section' } }} />;

<NumberField slotProps={{ input: { render: <section /> }, htmlInput: { render: <input /> } }} />;
<NumberField
  slotProps={{
    input: {
      render: (props, state) => {
        expectType<BaseNumberField.Group.State, typeof state>(state);
        return <section {...props} />;
      },
    },
    htmlInput: {
      render: (props, state) => {
        expectType<BaseNumberField.Input.State, typeof state>(state);
        return <input {...props} />;
      },
    },
  }}
/>;
// @ts-expect-error Use render to change the Material input root.
<NumberField slotProps={{ input: { component: 'section' } }} />;
// @ts-expect-error The native input slot does not expose component.
<NumberField slotProps={{ htmlInput: { component: 'input' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ input: { render: 'section' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ htmlInput: { render: 'input' } }} />;

// @ts-expect-error NumberField owns its content; use slot props to customize it.
<NumberField>Unsupported content</NumberField>;

// The default variant exposes OutlinedInput's slots.
<NumberField slotProps={{ input: { slotProps: { notchedOutline: { className: 'outline' } } } }} />;

<NumberField
  variant="outlined"
  slotProps={{ input: { slotProps: { notchedOutline: { className: 'outline' } } } }}
/>;

<NumberField variant="standard" slotProps={{ input: { disableUnderline: true } }} />;
<NumberField
  variant="filled"
  slotProps={{ input: { hiddenLabel: true, disableUnderline: true } }}
/>;

// A variant cannot use another variant's input slots.
// @ts-expect-error The standard input has no notchedOutline slot.
<NumberField variant="standard" slotProps={{ input: { slotProps: { notchedOutline: {} } } }} />;
// @ts-expect-error The filled input has no notchedOutline slot.
<NumberField variant="filled" slotProps={{ input: { slotProps: { notchedOutline: {} } } }} />;
// @ts-expect-error The outlined input has no underline to disable.
<NumberField variant="outlined" slotProps={{ input: { disableUnderline: true } }} />;

// FIXME: Union excess-property checking still accepts other variants' input props
// when variant is omitted, even though the runtime default is outlined.
<NumberField slotProps={{ input: { disableUnderline: true } }} />;

// Explicit generic arguments select the corresponding public interface.
const standardProps: NumberFieldProps<'standard'> = {
  variant: 'standard',
  slotProps: { input: { disableUnderline: true } },
};
expectType<StandardNumberFieldProps, typeof standardProps>(standardProps);
<NumberField {...standardProps} />;

const filledProps: NumberFieldProps<'filled'> = {
  variant: 'filled',
  slotProps: { input: { hiddenLabel: true } },
};
expectType<FilledNumberFieldProps, typeof filledProps>(filledProps);
<NumberField {...filledProps} />;

const outlinedProps: NumberFieldProps<'outlined'> = {
  slotProps: { input: { slotProps: { notchedOutline: { className: 'outline' } } } },
};
expectType<OutlinedNumberFieldProps, typeof outlinedProps>(outlinedProps);
<NumberField {...outlinedProps} />;

// @ts-expect-error A nondefault variant must be selected explicitly.
const missingStandardVariant: NumberFieldProps<'standard'> = {};
// @ts-expect-error A nondefault variant must be selected explicitly.
const missingFilledVariant: NumberFieldProps<'filled'> = {};
// @ts-expect-error The generic argument constrains the variant.
const mismatchedVariant: NumberFieldProps<'outlined'> = { variant: 'filled' };
// @ts-expect-error Only supported variants are accepted.
const invalidVariant: NumberFieldProps<'custom'> = {};

// Slot callbacks receive normalized NumberField owner state and retain variant-specific props.
<NumberField
  variant="outlined"
  slotProps={{
    input: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      expectType<boolean, typeof ownerState.autoFocus>(ownerState.autoFocus);
      expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
      expectType<boolean, typeof ownerState.error>(ownerState.error);
      expectType<boolean, typeof ownerState.fullWidth>(ownerState.fullWidth);
      expectType<boolean, typeof ownerState.required>(ownerState.required);
      expectType<boolean, typeof ownerState.scrubbing>(ownerState.scrubbing);
      return { slotProps: { notchedOutline: { className: 'outline' } } };
    },
    inputLabel: (ownerState) => ({ shrink: ownerState.required }),
  }}
/>;

<NumberField
  variant="filled"
  slotProps={{ input: (ownerState) => ({ hiddenLabel: ownerState.disabled }) }}
/>;

// Numeric callbacks have the same Base UI signatures for every variant.
function ValueCallbacks(props: NumberFieldProps) {
  return (
    <NumberField
      {...props}
      onValueChange={(value, details) => {
        expectType<number | null, typeof value>(value);
        expectType<BaseNumberField.Root.ChangeEventDetails, typeof details>(details);
      }}
      onValueCommitted={(value, details) => {
        expectType<number | null, typeof value>(value);
        expectType<BaseNumberField.Root.CommitEventDetails, typeof details>(details);
      }}
    />
  );
}

<ValueCallbacks />;
<ValueCallbacks variant="standard" />;
<ValueCallbacks variant="filled" />;
<ValueCallbacks variant="outlined" />;

<NumberField value={null} defaultValue={0} />;
// @ts-expect-error Numeric values cannot be strings.
<NumberField value="42" />;
// @ts-expect-error Numeric default values cannot be strings.
<NumberField defaultValue="42" />;
// @ts-expect-error Public changes use Base UI's numeric callbacks, not a DOM onChange.
<NumberField onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}} />;
// @ts-expect-error onValueChange receives a number or null, not a DOM event.
<NumberField onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {}} />;
// @ts-expect-error onValueCommitted receives a number or null, not a DOM event.
<NumberField onValueCommitted={(event: React.ChangeEvent<HTMLInputElement>) => {}} />;

// DOM change events remain available on the Material input slot.
<NumberField
  slotProps={{
    input: {
      onChange: (event) => {
        expectType<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
        expectType<string, typeof event.target.value>(event.target.value);
      },
    },
  }}
/>;

<NumberField
  onFocus={(event) => {
    expectType<React.FocusEvent<HTMLInputElement>, typeof event>(event);
  }}
  onBlur={(event) => {
    expectType<React.FocusEvent<HTMLInputElement>, typeof event>(event);
  }}
/>;

// Base UI numeric options retain their public input types through the Material wrapper.
<NumberField
  min={-10}
  max={10}
  step="any"
  smallStep={0.25}
  largeStep={5}
  allowOutOfRange
  allowWheelScrub
  snapOnStep
  locale={['de-DE', 'en-US']}
  format={{ style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }}
  controlsPosition="split"
  name="amount"
  form="order"
/>;

// @ts-expect-error Only numeric steps and the "any" keyword are supported.
<NumberField step="auto" />;
// @ts-expect-error Bounds are numeric values.
<NumberField min="0" />;
// @ts-expect-error The uncontrolled default is a number; null is a controlled empty value.
<NumberField defaultValue={null} />;
// @ts-expect-error Controls have three supported positions.
<NumberField controlsPosition="top" />;
<NumberField controlsPosition="stacked" />;
// @ts-expect-error Placing both controls at the start is not supported.
<NumberField controlsPosition="start" />;

// Root and visible-input refs expose different DOM elements.
<NumberField
  ref={(node) => {
    expectType<HTMLDivElement | null, typeof node>(node);
  }}
  inputRef={(node) => {
    expectType<HTMLInputElement | null, typeof node>(node);
  }}
/>;

// @ts-expect-error The root ref does not expose a button.
<NumberField ref={React.createRef<HTMLButtonElement>()} />;
// @ts-expect-error inputRef must target the visible native input.
<NumberField inputRef={React.createRef<HTMLDivElement>()} />;

// Slot props expose the corresponding Material component API. Root/button handlers
// need explicit event annotations with the current Material SlotProps types.
<NumberField
  render={<section />}
  slotProps={{
    root: {
      ref: React.createRef<HTMLDivElement>(),
      onClick: (event: React.MouseEvent<HTMLDivElement>) => event.currentTarget.focus(),
    },
    input: {
      ref: React.createRef<HTMLDivElement>(),
      startAdornment: <span>$</span>,
      onKeyDown: (event) => {
        expectType<React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(
          event,
        );
      },
    },
    htmlInput: { ref: React.createRef<HTMLInputElement>(), inputMode: 'decimal' },
    inputLabel: { shrink: true, htmlFor: 'amount', ref: React.createRef<HTMLLabelElement>() },
    formHelperText: { render: <div /> },
    incrementButton: {
      ref: React.createRef<HTMLButtonElement>(),
      children: '+',
      size: 'large',
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget.focus(),
    },
    decrementButton: {
      render: <button type="button" aria-label="Decrease" />,
      disableRipple: true,
      onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => event.currentTarget.focus(),
    },
  }}
/>;

// Each render callback receives its Base UI button state.
<NumberField
  slotProps={{
    incrementButton: {
      render: (props, state) => {
        expectType<BaseNumberField.Increment.State, typeof state>(state);
        return <button {...props} type="button" />;
      },
    },
    decrementButton: {
      render: (props, state) => {
        expectType<BaseNumberField.Decrement.State, typeof state>(state);
        return <button {...props} type="button" />;
      },
    },
  }}
/>;
// @ts-expect-error Use render to change the increment button element.
<NumberField slotProps={{ incrementButton: { component: 'span' } }} />;
// @ts-expect-error Use render to change the decrement button element.
<NumberField slotProps={{ decrementButton: { component: 'span' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ incrementButton: { render: 'button' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ decrementButton: { render: 'button' } }} />;

// @ts-expect-error InputLabel's shrink prop is boolean.
<NumberField slotProps={{ inputLabel: { shrink: 'true' } }} />;

<NumberField
  scrubAreaPosition="start"
  slotProps={{
    inputLabel: {
      render: (props, state) => {
        expectType<BaseNumberField.Root.State, typeof state>(state);
        return (
          <label {...props} htmlFor="amount">
            Amount
          </label>
        );
      },
    },
    formHelperText: {
      render: (props, state) => {
        expectType<BaseNumberField.Root.State, typeof state>(state);
        return <p {...props} />;
      },
    },
    scrubArea: {
      direction: 'vertical',
      render: (props, state) => {
        expectType<BaseNumberField.ScrubArea.State, typeof state>(state);
        return <div {...props} />;
      },
    },
    scrubAreaCursor: {
      render: (props, state) => {
        expectType<BaseNumberField.ScrubAreaCursor.State, typeof state>(state);
        return <div {...props} />;
      },
    },
  }}
/>;
// @ts-expect-error Use render to change the input label element.
<NumberField slotProps={{ inputLabel: { component: 'span' } }} />;
// @ts-expect-error Use render to change the helper text element.
<NumberField slotProps={{ formHelperText: { component: 'div' } }} />;
// @ts-expect-error Use render to change the scrub area element.
<NumberField slotProps={{ scrubArea: { component: 'div' } }} />;
// @ts-expect-error Use render to change the scrub cursor element.
<NumberField slotProps={{ scrubAreaCursor: { component: 'div' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ inputLabel: { render: 'label' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ formHelperText: { render: 'p' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ scrubArea: { render: 'span' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ scrubAreaCursor: { render: 'span' } }} />;

// Both stepper slots expose Base UI's native-button mode, including callback props.
<NumberField
  slots={{ incrementButton: 'span', decrementButton: 'span' }}
  slotProps={{
    incrementButton: { nativeButton: false },
    decrementButton: () => ({ nativeButton: false }),
  }}
/>;
// @ts-expect-error nativeButton must be boolean.
<NumberField slotProps={{ incrementButton: { nativeButton: 'false' } }} />;
// @ts-expect-error nativeButton must be boolean for the decrement slot too.
<NumberField slotProps={{ decrementButton: { nativeButton: 'false' } }} />;

<NumberField slots={{ controls: 'div' }} />;
<NumberField slotProps={{ controls: { render: <section />, sx: { gap: 1 } } }} />;
<NumberField
  controlsPosition="split"
  slotProps={{
    controls: (ownerState) => {
      expectType<'start' | 'end', typeof ownerState.position>(ownerState.position);
      expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
      return {
        ref: React.createRef<HTMLDivElement>(),
        render: (props, state) => {
          expectType<BaseNumberField.Root.State, typeof state>(state);
          return <section {...props} />;
        },
      };
    },
  }}
/>;
// @ts-expect-error Use render to change the controls element.
<NumberField slotProps={{ controls: { component: 'section' } }} />;
// @ts-expect-error The controls position is supplied by controlsPosition.
<NumberField slotProps={{ controls: { position: 'start' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ controls: { render: 'section' } }} />;
// @ts-expect-error Input classes belong to slotProps.input.classes.
<NumberField classes={{ input: 'input' }} />;

<NumberField classes={{ scrubbing: 'active-scrub' }} />;
// @ts-expect-error Scrubbing is derived owner state, not a public prop.
<NumberField scrubbing />;

<NumberField slots={{ scrubAreaAdornment: 'div' }} />;
<NumberField slotProps={{ scrubAreaAdornment: { render: <section />, sx: { gap: 1 } } }} />;
<NumberField
  scrubAreaPosition="end"
  slotProps={{
    scrubAreaAdornment: (ownerState) => {
      expectType<'start' | 'end', typeof ownerState.position>(ownerState.position);
      expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
      return {
        ref: React.createRef<HTMLDivElement>(),
        render: (props, state) => {
          expectType<BaseNumberField.Root.State, typeof state>(state);
          return <section {...props} />;
        },
      };
    },
  }}
/>;
// @ts-expect-error Use render to change the scrub area's adornment element.
<NumberField slotProps={{ scrubAreaAdornment: { component: 'section' } }} />;
// @ts-expect-error The adornment position is supplied by scrubAreaPosition.
<NumberField slotProps={{ scrubAreaAdornment: { position: 'start' } }} />;
// @ts-expect-error render takes an element or callback, not a tag name.
<NumberField slotProps={{ scrubAreaAdornment: { render: 'section' } }} />;

// Every callback receives NumberField owner state rather than an individual Base UI state.
<NumberField
  slotProps={{
    root: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      return { fullWidth: ownerState.fullWidth };
    },
    input: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      expectType<boolean, typeof ownerState.readOnly>(ownerState.readOnly);
      return { notched: ownerState.required };
    },
    htmlInput: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      return { readOnly: ownerState.readOnly };
    },
    inputLabel: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      return { shrink: ownerState.required };
    },
    formHelperText: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      return { error: ownerState.error };
    },
    incrementButton: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      expectType<'stacked' | 'end' | 'split' | false, typeof ownerState.controlsPosition>(
        ownerState.controlsPosition,
      );
      return { disabled: ownerState.disabled };
    },
    decrementButton: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      expectType<number | null | undefined, typeof ownerState.value>(ownerState.value);
      return { disabled: ownerState.disabled };
    },
  }}
/>;
