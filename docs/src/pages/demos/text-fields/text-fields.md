---
title: Text Field React component
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Fields

<p class="description">Text fields let users enter and edit text.</p>

[Text fields](https://material.io/design/components/text-fields.html) allow users to enter text into a UI. They typically appear in forms and dialogs.

## TextField

The `TextField` wrapper component is a complete form control including a label, input and help text.

{{"demo": "pages/demos/text-fields/TextFields.js"}}

## Outlined

`TextField` supports outlined styling.

{{"demo": "pages/demos/text-fields/OutlinedTextFields.js"}}

## Filled

`TextField` supports filled styling.

{{"demo": "pages/demos/text-fields/FilledTextFields.js"}}

## Components

`TextField` is composed of smaller components (
[`FormControl`](/api/form-control/),
[`Input`](/api/input/),
[`FilledInput`](/api/filled-input/),
[`InputLabel`](/api/input-label/),
[`OutlinedInput`](/api/outlined-input/),
and [`FormHelperText`](/api/form-helper-text/)
) that you can leverage directly to significantly customize your form inputs.

You might also have noticed that some native HTML input properties are missing from the `TextField` component.
This is on purpose.
The component takes care of the most used properties, then it's up to the user to use the underlying component shown in the following demo. Still, you can use `inputProps` (and `InputProps`, `InputLabelProps` properties) if you want to avoid some boilerplate.

{{"demo": "pages/demos/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/demos/text-fields/Inputs.js"}}

## Layout

`TextField`, `FormControl` allow the specification of `margin` to alter the vertical spacing of inputs. Using
`none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will as well as alter
other styles to meet the specification.

{{"demo": "pages/demos/text-fields/TextFieldMargins.js"}}

## Input Adornments

`Input` allows the provision of `InputAdornment`.
These can be used to add a prefix, a suffix or an action to an input.
For instance, you can use an icon button to hide or reveal the password.

{{"demo": "pages/demos/text-fields/InputAdornments.js"}}

## Filled Input Adornments

{{"demo": "pages/demos/text-fields/FilledInputAdornments.js"}}

## Outlined Input Adornments

{{"demo": "pages/demos/text-fields/OutlinedInputAdornments.js"}}

## Formatted inputs

You can use third-party libraries to format an input.
You have to provide a custom implementation of the `<input>` element with the `inputComponent` property.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries.

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

## Customized inputs

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in, here's an example of how you can change the main color of an Input.

{{"demo": "pages/demos/text-fields/CustomizedInputs.js"}}

## With icon

Icons can be specified as prepended or appended.

{{"demo": "pages/demos/text-fields/InputWithIcon.js"}}

## Limitations

The input label "shrink" state isn't always correct.
The input label is supposed to shrink as soon as the input is displaying something.
In some circumstances, we can't determine the "shrink" state (number input, datetime input, Stripe input). You might notice an overlap.

![shrink](/static/images/text-fields/shrink.png)

To workaround the issue, you can force the "shrink" state of the label.
```jsx
<TextField InputLabelProps={{ shrink: true }} />
```
or
```jsx
<InputLabel shrink>Count</InputLabel>
```
