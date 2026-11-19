---
productId: material-ui
title: React OTP Field component
components: OTPField
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

## Controlled recovery code

Use `value` and `onValueChange` to control the field as a single string.
This example accepts letters and digits with `validationType="alphanumeric"` and converts letters to uppercase with `normalizeValue`.

{{"component": "file://./demos/controlled/index.ts"}}

## Form submission

Set `name` to include the code in the form data and `required` to require a complete code.
This example uses `length={4}` for a four-digit PIN.
Try submitting `0012` to see how the string value preserves its leading zeroes.

{{"component": "file://./demos/form/index.ts"}}

## Accessibility

Each character input has an accessible name.
The first input uses the field label, and subsequent inputs announce their position, such as "Character 2 of 6."
Use `getInputAriaLabel` to translate the position labels.
Users can tab into the field, move between characters with the arrow keys, and tab out to the next control.
