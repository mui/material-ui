---
title: 文本框 React 组件
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---
# Text Fields

<p class="description">用户可以在文本框内输入或编辑文字</p>

[文本框](https://material.io/design/components/text-fields.html)允许用户在界面中输入文本，通常，我们会在表单或者对话框中使用它们。

## TextField

` TextField `包装器组件是一个完整的表单控件，包括标签，输入和帮助文本。

{{"demo": "pages/demos/text-fields/TextFields.js"}}

> **Note:** This version of the text field is no longer documented in the Material Design documentation.

## 轮廓

边框样式的`文本框`

{{"demo": "pages/demos/text-fields/OutlinedTextFields.js"}}

## 填充

填充样式的`文本框`

{{"demo": "pages/demos/text-fields/FilledTextFields.js"}}

## 组件

`TextField` 是由较小的组件组成的 ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), and [`FormHelperText`](/api/form-helper-text/) ) 你可以利用这一点来自定义你的表单输入.

您可能注意到了， `TextField`组件相对于原生的 HTML input 组件中缺少了一些属性。 这是故意为之的， 该组件只负责处理最常用的一些属性，如果有需求，需要由用户自己使用下面 Demo 中演示的基础组件。 但是同时, 为了避免过于模版化，您仍然可以使用 `inputProps` (和 `inputProps`, `InputLabelProps` 属性) 来控制原生组件的属性。

{{"demo": "pages/demos/text-fields/ComposedTextField.js"}}

## 输入

{{"demo": "pages/demos/text-fields/Inputs.js"}}

## Customized inputs

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here's an example of how you can change the main color of an Input.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/text-fields/CustomizedInputs.js"}}

Customization does not stop at CSS, you can use composition to build custom components and give your app a unique feel. Below is an example using the [`InputBase`](/api/input-base/) component, inspired by Google Maps.

{{"demo": "pages/demos/text-fields/CustomizedInputBase.js"}}

## 修饰输入

`Input` allows the provision of `InputAdornment`. These can be used to add a prefix, a suffix or an action to an input. For instance, you can use an icon button to hide or reveal the password.

{{"demo": "pages/demos/text-fields/InputAdornments.js"}}

### With icon

Icons can be specified as prepended or appended.

{{"demo": "pages/demos/text-fields/InputWithIcon.js"}}

### Filled Input Adornments

{{"demo": "pages/demos/text-fields/FilledInputAdornments.js"}}

### Outlined Input Adornments

{{"demo": "pages/demos/text-fields/OutlinedInputAdornments.js"}}

## 布局

`TextField`, `FormControl` allow the specification of `margin` to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will as well as alter other styles to meet the specification.

{{"demo": "pages/demos/text-fields/TextFieldMargins.js"}}

## 局限性

输入标签 "shrink" 状态并不总是正确的。 输入标签应在输入显示内容时立即收缩。 在某些情况下, 我们无法确定 "shrink" 状态 (数字输入、日期时间输入、条带输入)。 您可能会注意到重叠。

![缩小](/static/images/text-fields/shrink.png)

若要解决此问题, 您可以强制标签的 "shrink" 状态。

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

或

```jsx
<InputLabel shrink>Count</InputLabel>
```

## 格式化输入

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property. The provided input component should handle the `inputRef` property. The property should be called with a value implementing the [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) interface.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries.

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

## 补充项目

对于更高级的用例，您可以利用：

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) 用于更加方便地与Redux Form配搭来使用Material UI的一组包装组件。
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) 用于结合formik来使用Material-UI的绑定。
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) 用于更加方便地与Final Form配搭来使用Material UI的一组包装组件。
- [uniforms-material](https://github.com/vazco/uniforms/tree/master/packages/uniforms-material) Material-UI wrapper components for Uniforms, a set of React libraries for building forms.