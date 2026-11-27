---
productId: material-ui
title: React OTP Field component
components: OTPField, OTPFieldInput, OTPFieldSeparator, FormControl, FormLabel, FormHelperText
githubSource: packages/mui-material/src/OTPField
---

# OTP Field

<p class="description">An OTP field lets users enter a one-time password or verification code, one character per input.</p>

Use an OTP field for fixed-length codes, such as a sign-in code sent by text message or a recovery code printed on a card.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic OTPField

`OTPField` accepts six digits by default and renders one input per digit. Use `length` to change the number of inputs.
Users can type the digits one at a time, paste the whole code, or autofill it in browsers that support `autoComplete="one-time-code"` (the default).
Use `label` to name the field and `helperText` to tell users where to find the code.

{{"component": "file://./demos/basic/index.ts"}}

## Form props

Use `required` to require a complete code. Users can focus and submit a `readOnly` field. Setting `disabled` removes it from the tab order and form data.
Set `mask` to hide the characters as the user enters them. The value still contains the original characters.

{{"component": "file://./demos/form-props/index.ts"}}

## Controlled and uncontrolled values

The code is a single string, so a value like `"0123"` keeps its leading zero.
Use `defaultValue` for the initial code in an uncontrolled field. To control the field, pass `value` and update it in `onValueChange`. Use `''` for an empty code.

`onValueChange(code, details)` receives the proposed code. Use `details.reason` to distinguish typing, pasting, and deletion, or call `details.cancel()` to reject the change.

{{"component": "file://./demos/state/index.ts"}}

## Validation

Use `validationType` to accept digits (`numeric`, the default), letters A–Z and a–z (`alpha`), or both (`alphanumeric`). Choose `none` for a code with other characters.
The field strips whitespace, silently filters out unsupported characters, and limits the code to `length` characters. Use `inputMode` to choose the mobile keyboard independently.

To give feedback, use `onValueInvalid(attempt, details)` to set `error` and show a message with `helperText`. The callback receives the original typed or pasted text.
In this example, typing a letter leaves the code unchanged and displays a message. Enter a digit to clear the message.

{{"component": "file://./demos/validation/index.ts"}}

### Grouped recovery code

Paste `ab1-cd2` into the first input. With `validationType="alphanumeric"`, the field drops the hyphen, then `normalizeValue` converts the letters to uppercase. The resulting value is `"AB1CD2"`.
When writing a normalizer, make sure applying it twice gives the same result as applying it once.

Place an `OTPFieldSeparator` between `OTPFieldInput` children to display the code as `AB1-CD2`. The separator displays a hyphen by default and accepts custom content as children.
Set `length` to the number of character inputs.

{{"component": "file://./demos/grouped/index.ts"}}

## Sizes

Use `size="small"` for more compact character inputs. The default size is `medium`.

{{"component": "file://./demos/sizes/index.ts"}}

## Color

The `color` prop changes the focused input's outline. The default is `primary`, and the `error` state takes precedence.
Focus an input in each field to see its color.

{{"component": "file://./demos/color/index.ts"}}

## Full width

Use `fullWidth` to fill the width of the field's container. The character inputs share the available space equally and separators keep their natural width.

{{"component": "file://./demos/full-width/index.ts"}}

## Form submission

Set `name` on `OTPField` to submit the whole code under one form key. For example, `name="pin"` lets the submit handler read `new FormData(form).get('pin')`.
If the field is outside the form, pass the form's `id` to the `form` prop.

Submit an incorrect four-digit PIN to see the error message and return focus to the first input. Then try the sample PIN `0012`.

{{"component": "file://./demos/form/index.ts"}}

Use `onValueComplete(code, details)` to respond when the user finishes entering a code or pastes a complete one. Set `autoSubmit` to submit the associated form after this callback runs.

An uncontrolled field keeps its current code when the form resets, even if you supplied `defaultValue`.
For a [controlled field](#controlled-and-uncontrolled-values) that starts at `'01'`, set `onReset={() => setCode('01')}` on the form to restore that value.

## Customization

### Individual inputs

Pass native attributes, event handlers, or a ref directly to an `OTPFieldInput` child.
Use `slotProps.group` for the row that contains those inputs.

```jsx
import OTPField, { OTPFieldInput } from '@mui/material/OTPField';

<OTPField label="Check code" length={2} slotProps={{ group: { sx: { gap: 2 } } }}>
  <OTPFieldInput />
  <OTPFieldInput aria-label="Check digit" />
</OTPField>;
```

The field's `ref` points to the outer container. Use `inputRef` to focus the first input programmatically or `autoFocus` to focus it on mount.

### Rendering custom elements

Use `render` on `OTPField` to change its outer element and keep its Material styles and `FormControl` context.
The `group`, `label`, and `formHelperText` slots also accept `render` through `slotProps`.

A `slotProps` callback receives Material owner state such as `size` and `error`. A slot's `render(props, state)` callback receives live field state such as `complete`.
Spread the render callback's props onto the returned element and forward its ref. Both composed children also accept `render` directly. For `OTPFieldInput`, forward the props and ref to a native `<input>` to preserve focus, editing, and paste.

This example renders the outer element as a `<section>` and uses the helper text's render callback to announce when the code is complete.

{{"component": "file://./demos/render/index.ts"}}

Use `slots` to replace an entire Material slot. A replacement takes precedence over `render` for that slot.
If you replace `slots.root`, forward its props and ref to a `FormControl` to keep its label and helper text in sync with the field state.
For outer spacing, use `sx` or set the `FormControl` margin through `slotProps.root.margin`. See the [available slots](/material-ui/api/otp-field/#slots).

### Theme overrides

Use `components.MuiOTPField.defaultProps` to set defaults across your app.
The `root`, `label`, `group`, and `formHelperText` keys in `styleOverrides` style the layout slots. Use `input` and `separator` to style the composed children.
For a CSS selector, use the corresponding class from `otpFieldClasses`, such as `otpFieldClasses.input` (`MuiOTPField-input`).
This theme sets the size to small, changes the focus color to secondary, and uses `styleOverrides.input` to round each character input.

{{"component": "file://./demos/theme/index.ts"}}

See [themed components](/material-ui/customization/theme-components/) for more details.

## Anatomy

The following tree shows a four-character field with a separator between the two pairs of inputs.

```text
root (FormControl)
├── label (FormLabel, optional)
├── group (div, role="group")
│   ├── OTPFieldInput (input)
│   ├── OTPFieldInput (input)
│   ├── OTPFieldSeparator (div, optional)
│   ├── OTPFieldInput (input)
│   └── OTPFieldInput (input)
└── formHelperText (FormHelperText, optional)
```

The `group` slot hosts the character inputs. A visually hidden input alongside the outer container submits the whole code as one form value.

## Accessibility

### Labels and descriptions

The group and first input share the field label. Clicking the label focuses the first input. When there is no visible label, set `aria-label` or `aria-labelledby` on `OTPField`.
Set `id` on `OTPField` to choose the first input's ID. The field generates one when omitted and links the label's `htmlFor` to it.
The helper text describes the group and each character input. Use `aria-describedby` on the field to add another description.
When customizing a label or helper, set its ID through `slotProps.label.id` or `slotProps.formHelperText.id` and forward the supplied attributes so these links stay intact.

Subsequent inputs announce their position, such as "Character 2 of 6." The [theme locale](/material-ui/guides/localization/#locale-text) supplies these labels.
Use `getAriaLabel(position, length)` to customize them for one field, or set `components.MuiOTPField.defaultProps.getAriaLabel` across your app. Positions start at one.
To name just one character after the first, pass `aria-label` to its `OTPFieldInput`.

### Keyboard and focus

The field is one tab stop. Typing advances focus, and pasting fills consecutive inputs from the current position.
Use the left and right arrow keys to move in the visual direction, <kbd>Home</kbd> to reach the first character, and <kbd>End</kbd> to reach the first empty input or the last input when the code is complete.
Press <kbd>Tab</kbd> or <kbd>Shift</kbd>+<kbd>Tab</kbd> to leave the field.

If the code should read left to right in a right-to-left form, set `dir` on the group so arrow-key navigation follows the displayed order.

```jsx
<OTPField label="Verification code" slotProps={{ group: { dir: 'ltr' } }} />
```
