---
productId: material-ui
title: React Number Field component
components: NumberField, FormControl, Input, FilledInput, OutlinedInput, InputLabel, FormHelperText, InputAdornment, IconButton
githubLabel: 'scope: number field'
githubSource: packages/mui-material/src/NumberField
---

# Number Field

<p class="description">Number Fields let users enter, format, and adjust numeric values.</p>

Number fields combine a numeric input with increment and decrement buttons.
Use them for quantities, prices, percentages, and other values that users need to adjust.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic NumberField

The `NumberField` component includes a label, an input, stepper buttons, and optional helper text.
It comes with three variants: outlined (default), filled, and standard.

{{"component": "file://./demos/basic/index.ts"}}

## Form props

Use `required`, `disabled`, and `readOnly` to control interaction with the field.
The `helperText` prop provides context about the expected input.

{{"component": "file://./demos/form-props/index.ts"}}

## Controlled and uncontrolled values

Use `defaultValue` for an uncontrolled field, or `value` with `onValueChange` for a controlled field.
Use `null` for a controlled empty field, or omit `defaultValue` to start an uncontrolled field empty.
Zero is a numeric value.

`onValueChange` receives the next number or `null`, followed by details about the interaction.
Use `onValueCommitted` to respond when an edit is committed.
Typing commits on blur, keyboard and wheel adjustments commit immediately, and pointer presses on the buttons and scrub area commit on release.
Both callbacks include a `details.reason` identifying the interaction.
Call `details.cancel()` in `onValueChange` to reject a proposed change.

{{"component": "file://./demos/state/index.ts"}}

## Validation

Use `error` to display an error state and `helperText` to explain how to correct the value.
The following example applies a custom validation rule to the controlled numeric value.

{{"component": "file://./demos/validation/index.ts"}}

## Minimum and maximum values

Use `min` and `max` to limit the value.
The increment and decrement buttons become disabled at their respective bounds.
The displayed text is clamped when the input loses focus.
Numeric values reported by `onValueChange` are clamped while editing.

Set `allowOutOfRange` to keep typed values outside the range.
Stepping with the buttons or keyboard still respects the bounds.

{{"component": "file://./demos/constraints/index.ts"}}

## Stepping

Use `step` to set the amount added or subtracted by the buttons and the <kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd> keys.
The default step is `1`.
Use `smallStep` and `largeStep` to set the step while holding <kbd>Alt</kbd> (<kbd>Option</kbd> on macOS) and <kbd>Shift</kbd>, respectively.
Their defaults are `0.1` and `10`.

When bounds are set, <kbd>Home</kbd> moves to `min` and <kbd>End</kbd> moves to `max`.

Set `snapOnStep` to snap to step intervals starting at `min`, or `0` if `min` is omitted.

{{"component": "file://./demos/steps/index.ts"}}

### Mouse wheel

Set `allowWheelScrub` to adjust the value with the mouse wheel while the input is focused and hovered.
Wheel stepping is disabled by default.

```jsx
<NumberField label="Quantity" defaultValue={5} allowWheelScrub />
```

## Formatting and localization

Use `format` to display currencies, percentages, units, or a specific number of decimal places.
It accepts the options supported by `Intl.NumberFormat`.
Use `locale` to control formatting and parsing independently of the browser's locale.

The value and value callbacks use unformatted numbers or `null`, regardless of the display format.
For example, a value of `0.125` is displayed as `12.5%` with percent formatting.

{{"component": "file://./demos/format/index.ts"}}

## Control placement

Set `controlsPosition` to `end` (default), `split`, or `stacked` to change the control layout.
Start and end follow the text direction.
Use `false` to render no buttons at all.

{{"component": "file://./demos/controls-position/index.ts"}}

Use `slots.controls` or `slotProps.controls` to customize the button groups.
With split controls, the same slot renders on both sides; use the callback's `ownerState.position` (`'start'` or `'end'`) to customize each side.

## Scrubbing

Set `scrubAreaPosition` to `"start"` or `"end"` to add a handle that users can drag to adjust the value.
The default is `false`, which hides the handle.
Its position is independent of `controlsPosition`.

{{"component": "file://./demos/scrub-area-placement/index.ts"}}

Use `slots.scrubAreaAdornment` or `slotProps.scrubAreaAdornment` to customize the InputAdornment around the handle.
Slot-prop callbacks receive `ownerState.position` (`'start'` or `'end'`).

Material slot-prop callbacks also receive the live boolean `ownerState.scrubbing`.
Style the active state with `MuiNumberField.styleOverrides.scrubbing` or the root's `MuiNumberField-scrubbing` class.

### Direction and sensitivity

Dragging adjusts the value horizontally by default.
Set `slotProps.scrubArea.direction` to `"vertical"` for up/down dragging.
Increase `slotProps.scrubArea.pixelSensitivity` to require more pointer movement before the value changes.
Use `slotProps.scrubArea.teleportDistance` to set how far the cursor can move from the handle's center before wrapping back around.

{{"component": "file://./demos/scrub-area-options/index.ts"}}

### Custom handle and cursor

Use `slotProps.scrubArea` to customize the handle and `slotProps.scrubAreaCursor` to customize the cursor displayed during dragging.
Both slots support custom content through `children` and styles through `sx`.
The custom cursor appears during mouse dragging when pointer lock is available.
It is not shown in Safari or during touch interactions.

{{"component": "file://./demos/scrub-area-customization/index.ts"}}

The example also styles `scrubAreaAdornment`, the wrapper around the handle, using the live `ownerState.scrubbing` flag.

## Input adornments

Use `slotProps.input` to add an [`InputAdornment`](/material-ui/api/input-adornment/) alongside the built-in controls.
This example adds a button to clear the value.

{{"component": "file://./demos/adornments/index.ts"}}

## Sizes

Use `size="small"` for a more compact field.
The size applies to the input and both stepper buttons.

{{"component": "file://./demos/sizes/index.ts"}}

## Color

The `color` prop changes the highlight color when the field is focused.

{{"component": "file://./demos/color/index.ts"}}

## Full width

Use `fullWidth` to fill the width of the field's container.

{{"component": "file://./demos/full-width/index.ts"}}

## Form submission

Set `name` to include the numeric value in form submission.
The submitted value is the unformatted number, even when the input displays a currency or another format.
Use `form` to associate a field with a form outside its DOM ancestry.

Uncontrolled fields do not yet support native form reset. See [Base UI issue #1346](https://github.com/mui/base-ui/issues/1346).
The example below uses a controlled value and restores it in `onReset` so the Reset button returns the field to its initial value.

{{"component": "file://./demos/form/index.ts"}}

## Controlling the input

Use `slotProps.htmlInput` for native input attributes, event handlers, and refs.
Use `slotProps.input` for Material input customization, such as adornments, wrapper styles, or the outlined variant's `notchedOutline` slot.
NumberField displays its formatted value in a single-line text input.
Set `value` or `defaultValue` on NumberField itself.

```jsx
<NumberField
  label="Quantity"
  slotProps={{
    input: { sx: { borderRadius: 2 } },
    htmlInput: { enterKeyHint: 'done' },
  }}
/>
```

To handle an arrow key yourself, call `event.preventBaseUIHandler()` in `slotProps.htmlInput.onKeyDown` to skip NumberField's default step for that key.
The field's resolved `disabled`, `readOnly`, and `required` states take precedence over conflicting slot props.

The forwarded `ref` points to the root element.
Use `inputRef` to access or focus the visible input.

## Customization

### Rendering custom elements

Use `render` to change the root element while preserving Material styling and field behavior.
Other slots accept `render` through `slotProps`, such as `slotProps.htmlInput.render` or `slotProps.formHelperText.render`.

The prop accepts a React element or a callback receiving the generated props and live Base UI state.
Spread the generated props onto the rendered element to preserve its ref, event handlers, styles, and accessibility attributes.
Custom components must forward the ref to their DOM element.

The following example renders the root as a `<section>` and uses the helper text's render callback to show the current value:

{{"component": "file://./demos/render/index.ts"}}

For a button rendered as an element other than `<button>`, also set that slot's `nativeButton` prop to `false`.

Use `slots` to replace a Material component and provide your own styling.
A `slots` replacement takes precedence over `render` for the same slot.
See the [API reference](/material-ui/api/number-field/#slots) for the available slots.

Use `slotProps.input.render` to change the Material input's root element.
That element also provides Base UI's NumberField Group semantics with `role="group"`.

### Theme overrides

Use `MuiNumberField` in the theme to set default props or override the `root`, `input`, `htmlInput`, `inputLabel`, `formHelperText`, `controls`, `incrementButton`, `decrementButton`, `scrubArea`, `scrubAreaAdornment`, and `scrubAreaCursor` styles.
The following example sets small, stacked controls and a scrub handle as theme defaults.
It gives the buttons different colors and adds an outline while scrubbing through `styleOverrides.scrubbing`.

{{"component": "file://./demos/theme/index.ts"}}

See [themed components](/material-ui/customization/theme-components/) for more details.

### Data attributes

NumberField exposes Base UI's state attributes on the following slots.
Import the corresponding constants from `@mui/material/NumberField` to use them in selectors or tests.

| Slot              | Export                                     |
| :---------------- | :----------------------------------------- |
| `root`            | `NumberFieldRootDataAttributes`            |
| `input`           | `NumberFieldGroupDataAttributes`           |
| `htmlInput`       | `NumberFieldInputDataAttributes`           |
| `incrementButton` | `NumberFieldIncrementDataAttributes`       |
| `decrementButton` | `NumberFieldDecrementDataAttributes`       |
| `scrubArea`       | `NumberFieldScrubAreaDataAttributes`       |
| `scrubAreaCursor` | `NumberFieldScrubAreaCursorDataAttributes` |

Each namespace includes `data-scrubbing`, `data-disabled`, `data-readonly`, and `data-required`.
When wrapped in Base UI's `Field.Root`, the slots can also expose `data-valid`, `data-invalid`, `data-touched`, `data-dirty`, `data-filled`, and `data-focused`.
For example, `NumberFieldRootDataAttributes.scrubbing` is the attribute name `data-scrubbing`, which is present while the user drags the scrub handle.

## Anatomy

NumberField combines Material UI components with Base UI's numeric input behavior.
The following shows its slots with a scrub handle at the start and controls at the end:

```text
root (FormControl)
├── inputLabel (InputLabel, optional)
├── input (OutlinedInput, FilledInput, or Input)
│   ├── scrubAreaAdornment (InputAdornment, optional)
│   │   └── scrubArea (span)
│   ├── htmlInput (input)
│   └── controls (InputAdornment, optional)
│       ├── decrementButton (IconButton)
│       └── incrementButton (IconButton)
└── formHelperText (FormHelperText, optional)
```

The Material input root also serves as Base UI's Group, without an extra wrapper.
With split controls, the `controls` slot renders once on each side of the input.
The `scrubAreaCursor` slot renders in a portal while scrubbing.

## Accessibility

NumberField renders a native text input with the implicit `textbox` role.

Provide a `label` to name the input.
NumberField links the label and helper text to the input automatically and generates an ID when `id` is omitted.
For a field without a visible label, provide an accessible name through `slotProps.htmlInput`:

```jsx
<NumberField slotProps={{ htmlInput: { 'aria-label': 'Quantity' } }} />
```

The stepper buttons use `tabIndex={-1}` by default to avoid redundant tab stops.
Keyboard users can adjust the value from the input with the [keyboard shortcuts described above](#stepping).
The buttons remain exposed to screen readers, including on touch devices.

NumberField uses [Base UI](https://base-ui.com/react/components/number-field) for numeric input behavior and Material UI components for its appearance.
