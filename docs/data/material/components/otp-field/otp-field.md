---
productId: material-ui
title: React OTP Field component
components: OTPField, OTPFieldInput, OTPFieldSeparator
githubSource: packages/mui-material/src/OTPField
---

# OTP Field

<p class="description">An OTP field lets users enter a one-time password or verification code, one character per input.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic usage

The field accepts six digits by default.
Type one digit to move focus to the next input, or paste the whole code into the first input.
Use the `label` prop to name the field and `helperText` to tell users where to find the code.

{{"component": "file://./demos/basic/index.ts"}}

## Form props

Use `required`, `disabled`, and `readOnly` to control how users interact with the field.
Pass `defaultValue` to `OTPField` to set the initial code for an uncontrolled field. Use a string to preserve leading zeroes.

{{"component": "file://./demos/form-props/index.ts"}}

## Grouped recovery code

Pass `OTPFieldInput` and `OTPFieldSeparator` as children to group the characters.
Place `<OTPFieldSeparator />` wherever you want a hyphen (`-`). Pass children to display a different separator.
Set `length` to the number of character inputs when it differs from six. Separators are decorative by default and do not count toward the length.

Use `value` and `onValueChange` to control the field as a single string.
This example accepts letters and digits with `validationType="alphanumeric"` and converts letters to uppercase with `normalizeValue`.
It uses a middle dot between groups. The `slotProps.group` callback reads the field's resolved `size` to reduce the gap for small inputs.

{{"component": "file://./demos/controlled/index.ts"}}

## Form submission

Set `name` to include the code in the form data and `required` to require a complete code.
If the field is outside the form, pass the form's `id` to the `form` prop.
This example uses `length={4}` for a four-digit PIN.
Try submitting `0012` to see how the string value preserves its leading zeroes.
After an incorrect PIN, the form uses `inputRef` to focus the first character so you can try again.

{{"component": "file://./demos/form/index.ts"}}

## Customization

### Rendering custom elements

Use `render` on `OTPField` to change its outer element and keep its Material styles and `FormControl` context.
The `group`, `label`, and `helperText` slots also accept `render` through `slotProps`.
When using a render callback, supply IDs, accessible names, and text direction through the field or its `slotProps`, and forward the callback props to the element.
Pass props and refs for an individual character directly to its `OTPFieldInput`.

This example renders the field as a `<section>`. The helper text reads `state.complete` to announce when the last digit has been entered.
The group's `className` and `style` callbacks can also read this live field state.

{{"component": "file://./demos/render/index.ts"}}

Use `slots` to replace a Material component. An explicit replacement takes precedence over `render` for that slot.
This field renders its helper text in a native `<small>` element and links each input to it.

```jsx
<OTPField
  label="Verification code"
  helperText="Check your text messages."
  slots={{ helperText: 'small' }}
/>
```

### Theme overrides

Use `components.MuiOTPField` in the theme to set default props and override slot styles.
The `root` key styles the outer container, `group` styles the row of inputs, and `input` styles each character.
This example makes the inputs small and round. When all four digits are present, the group's `data-complete` attribute changes their border color.

{{"component": "file://./demos/theme/index.ts"}}

## Accessibility

Each character input has an accessible name.
The first input uses the field label, and subsequent inputs announce their position, such as "Character 2 of 6."
The [theme locale](/material-ui/guides/localization/#locale-text) supplies the position labels. For example, the German locale (`deDE`) announces "Zeichen 2 von 6."
To customize the wording across your app, set `components.MuiOTPField.defaultProps.getInputAriaLabel` in the theme. To override it for one field, pass `getInputAriaLabel` directly. The callback receives the one-based position and the field length.

A replacement label should forward its props to a native label so clicking it focuses the first input.
The `ref` prop points to the outer field container. Use `inputRef` to focus the first character input programmatically.
Users can tab into the field, move between characters with the arrow keys, and tab out to the next control.
If the code should read left to right in a right-to-left form, set `dir` on the group so arrow-key navigation follows the displayed order.

```jsx
<OTPField label="Verification code" slotProps={{ group: { dir: 'ltr' } }} />
```
