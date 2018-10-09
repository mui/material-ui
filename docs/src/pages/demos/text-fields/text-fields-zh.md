---
title: Text Field React component
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---
# Text Fields

<p class="description">用户可以在文本框内输入或编辑文字</p>

[文本框](https://material.io/design/components/text-fields.html)允许用户在界面中输入文本，通常，我们会在表单或者对话框中使用它们。

## TextField

The `TextField` wrapper component is a complete form control including a label, input and help text.

{{"demo": "pages/demos/text-fields/TextFields.js"}}

## Outlined

边框样式的`文本框`

{{"demo": "pages/demos/text-fields/OutlinedTextFields.js"}}

## Filled

填充样式的`文本框`

{{"demo": "pages/demos/text-fields/FilledTextFields.js"}}

## Components

`TextField`是由这些基本组件组合而成( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`InputLabel`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), 和 [`FormHelperText`](/api/form-helper-text/) ) 您可以利用这一点，完成自己需要的组合来自定义自己的表单输入。

您可能注意到了， `TextField`组件相对于原生的 HTML input 组件中缺少了一些属性。 这是故意为之的， 该组件只负责处理最常用的一些属性，如果有需求，需要由用户自己使用下面 Demo 中演示的基础组件。 但是同时, 为了避免过于模版化，您仍然可以使用 `inputProps` (和 `inputProps`, `InputLabelProps` 属性) 来控制原生组件的属性。

{{"demo": "pages/demos/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/demos/text-fields/Inputs.js"}}

## Layout

`TextField`, `FormControl` allow the specification of `margin` to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will as well as alter other styles to meet the specification.

{{"demo": "pages/demos/text-fields/TextFieldMargins.js"}}

## Input Adornments

`Input` allows the provision of `InputAdornment`. These can be used to add a prefix, a suffix or an action to an input. For instance, you can use an icon button to hide or reveal the password.

{{"demo": "pages/demos/text-fields/InputAdornments.js"}}

## Filled Input Adornments

{{"demo": "pages/demos/text-fields/FilledInputAdornments.js"}}

## Outlined Input Adornments

{{"demo": "pages/demos/text-fields/OutlinedInputAdornments.js"}}

## Formatted inputs

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries.

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

## Customized inputs

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here's an example of how you can change the main color of an Input.

{{"demo": "pages/demos/text-fields/CustomizedInputs.js"}}

## With icon

Icons can be specified as prepended or appended.

{{"demo": "pages/demos/text-fields/InputWithIcon.js"}}

## Limitations

The input label "shrink" state isn't always correct. The input label is supposed to shrink as soon as the input is displaying something. In some circumstances, we can't determine the "shrink" state (number input, datetime input, Stripe input). You might notice an overlap.

![shrink](/static/images/text-fields/shrink.png)

To workaround the issue, you can force the "shrink" state of the label.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

or

```jsx
<InputLabel shrink>Count</InputLabel>
```