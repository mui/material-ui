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

`OTPField` includes a label, a row of character inputs, and optional helper text.
It accepts a six-digit code by default. Use `length` to change the number of inputs.
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

Use `error` to mark a field as invalid and `helperText` to explain how to correct it.
`onValueInvalid(attempt, details)` receives the original typed or pasted text when characters are rejected.
In this example, type a letter to display an error, then enter a digit to clear it.

{{"component": "file://./demos/validation/index.ts"}}

## Accepted characters

Use `validationType` to accept digits (`numeric`, the default), letters A–Z and a–z (`alpha`), or both (`alphanumeric`). Choose `none` for a code with other characters.
The field strips whitespace, filters the input, and limits the result to `length` characters. Use `inputMode` to choose the mobile keyboard independently.

Use `normalizeValue` to transform the filtered string. A normalizer should return the same result when applied twice.

### Grouped recovery code

Try pasting `ab1-cd2` into the first input. With `validationType="alphanumeric"`, the field drops the hyphen. Its `normalizeValue` callback converts the letters to uppercase, giving the value `"AB1CD2"`.

Compose `OTPFieldInput` and `OTPFieldSeparator` as children to display the code as `AB1-CD2`. Set `length` to the number of character inputs.
The separator displays a hyphen by default and accepts children for a custom separator.

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
Base UI renders a visually hidden input alongside the Material field for native validation and submission.
If the field is outside the form, pass the form's `id` to the `form` prop.

Try an incorrect four-digit PIN, then enter the sample PIN `0012`.
The form uses `error` and `helperText` to explain how to correct a rejected PIN and `inputRef` to focus the first character.

{{"component": "file://./demos/form/index.ts"}}

Use `onValueComplete(code, details)` to respond when the user finishes entering a code or pastes a complete one. Set `autoSubmit` to submit the associated form after this callback runs.

## Controlling the input

Set `value` or `defaultValue` on `OTPField` for the whole code. To pass native attributes, event handlers, or a ref to an individual character, supply them on an `OTPFieldInput` child.
Use `slotProps.group` for the row that contains those inputs.

```jsx
import OTPField, { OTPFieldInput } from '@mui/material/OTPField';

<OTPField label="Check code" length={2} slotProps={{ group: { sx: { gap: 2 } } }}>
  <OTPFieldInput />
  <OTPFieldInput aria-label="Check digit" />
</OTPField>;
```

The field's `ref` points to the outer container. Use `inputRef` to focus the first input programmatically or `autoFocus` to focus it on mount.

## Customization

### Rendering custom elements

Use `render` on `OTPField` to change its outer element and keep its Material styles and `FormControl` context.
The `group`, `label`, and `formHelperText` slots also accept `render` through `slotProps`.

A `slotProps` callback receives Material field props such as `size` and `error`. A slot's `render(props, state)` callback receives live Base UI state such as `complete`. The group's `className` and `style` callbacks also receive that live state.
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

### Data attributes

Base UI exposes state on the following elements. Import the attribute constants from `@mui/material/OTPField` if you use them in CSS selectors.

| Part                | Export                            |
| :------------------ | :-------------------------------- |
| `group` slot        | `OTPFieldRootDataAttributes`      |
| `OTPFieldInput`     | `OTPFieldInputDataAttributes`     |
| `OTPFieldSeparator` | `OTPFieldSeparatorDataAttributes` |

`data-complete` appears on the group when all characters are entered. Use `&[data-filled]` in `styleOverrides.input` to style each filled character. A separator exposes `data-orientation`, which defaults to `vertical`.
See the [Base UI OTP Field reference](https://base-ui.com/react/components/otp-field#api-reference) for the full list of attributes.

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

The `group` slot hosts Base UI's `OTPField.Root`. By default, the field renders one `OTPFieldInput` per character.
Supply inputs and separators as children to change their arrangement.

## Accessibility

### Labels and descriptions

The group and first input share the field label. Clicking the label focuses the first input.
Set `id` on `OTPField` to choose the first input's ID. The field generates one when omitted and links the label's `htmlFor` to it.
The helper text describes the group and each character input. Use `aria-describedby` on the field to add another description.
When customizing a label or helper, set its ID through `slotProps.label.id` or `slotProps.formHelperText.id` and forward the supplied attributes so these links stay intact.

Subsequent inputs announce their position, such as "Character 2 of 6."
When there is no visible label, put `aria-label` or `aria-labelledby` on `OTPField`. To name a particular character after the first, pass `aria-label` to its `OTPFieldInput`.
The [theme locale](/material-ui/guides/localization/#locale-text) supplies the position labels. For example, the German locale (`deDE`) announces "Zeichen 2 von 6."
To customize the wording across your app, set `components.MuiOTPField.defaultProps.getInputAriaLabel` in the theme. To override it for one field, pass `getInputAriaLabel` directly. The callback receives the one-based position and the field length.

### Keyboard and focus

The field is one tab stop. Typing advances focus, and pasting fills consecutive inputs from the current position.
Use the left and right arrow keys to move in the visual direction, <kbd>Home</kbd> to reach the first character, and <kbd>End</kbd> to reach the first empty input or the last input when the code is complete.
Press <kbd>Tab</kbd> or <kbd>Shift</kbd>+<kbd>Tab</kbd> to leave the field.

If the code should read left to right in a right-to-left form, set `dir` on the group so arrow-key navigation follows the displayed order.

```jsx
<OTPField label="Verification code" slotProps={{ group: { dir: 'ltr' } }} />
```
