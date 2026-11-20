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

## Grouped recovery code

Pass `OTPFieldInput` and `OTPFieldSeparator` as children to group the characters.
Place `<OTPFieldSeparator />` wherever you want a hyphen (`-`). Pass children to display a different separator.
Set `length` to the number of character inputs when it differs from six. Separators are decorative and do not count toward the length.

Use `value` and `onValueChange` to control the field as a single string.
This example accepts letters and digits with `validationType="alphanumeric"` and converts letters to uppercase with `normalizeValue`.

{{"component": "file://./demos/controlled/index.ts"}}

## Form submission

Set `name` to include the code in the form data and `required` to require a complete code.
If the field is outside the form, pass the form's `id` to the `form` prop.
This example uses `length={4}` for a four-digit PIN.
Try submitting `0012` to see how the string value preserves its leading zeroes.

{{"component": "file://./demos/form/index.ts"}}

## Accessibility

Each character input has an accessible name.
The first input uses the field label, and subsequent inputs announce their position, such as "Character 2 of 6."
Use `getInputAriaLabel` to translate the position labels.
Pass props and refs for an individual character directly to its `OTPFieldInput`.
To customize the label or helper text, use `slots.label`, `slots.helperText`, or their corresponding `slotProps`. A replacement label should forward its props to a native label so clicking it focuses the first input.
The `ref` prop points to the outer field container. Use `inputRef` to focus the first character input programmatically.
Users can tab into the field, move between characters with the arrow keys, and tab out to the next control.
