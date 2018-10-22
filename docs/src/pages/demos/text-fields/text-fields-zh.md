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

## 布局

`TextField`, `FormControl` 允许指定`margin`来改变输入的垂直间距。 使用`none` (默认), 将不会在`FormControl`添加margins, 而 `dense`和`normal`也会改变其他样式以符合规范.

{{"demo": "pages/demos/text-fields/TextFieldMargins.js"}}

## 修饰输入

`Input` 允许提供`InputAdornment`. 这些可用于向输入添加前缀、后缀或动作. 例如, 您可以使用图标按钮来隐藏或显示密码.

{{"demo": "pages/demos/text-fields/InputAdornments.js"}}

## 修饰填充

{{"demo": "pages/demos/text-fields/FilledInputAdornments.js"}}

## 修饰轮廓

{{"demo": "pages/demos/text-fields/OutlinedInputAdornments.js"}}

## 格式化输入

您可以使用第三方库来格式化输入.您必须使用` inputComponent `属性提供`<input>` 元素的自定义实现.

下面的演示使用 [react-text-mask](https://github.com/text-mask/text-mask)和 [react-number-format](https://github.com/s-yadav/react-number-format) 库。

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

## 自定义输入

如果您有阅读[重写文档](/customization/overrides/) 但你还不是很自信能够完全掌握， 以下是如何更改一个输入的主要颜色的示例

{{"demo": "pages/demos/text-fields/CustomizedInputs.js"}}

## 使用图标

图标可以指定为预置或追加。

{{"demo": "pages/demos/text-fields/InputWithIcon.js"}}

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