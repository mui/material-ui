---
title: React Text Field（文本框）组件
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# TextField（文本框）

<p class="description">用户可以在文本框内输入或编辑文字。</p>

[Text fields](https://material.io/design/components/text-fields.html) allow users to enter text into a UI. They typically appear in forms and dialogs.

## TextField

`TextField` wrapper 组件是一个完整的表单控件，包括标签，输入和帮助文本。

It supports standard, outlined and filled styling.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**Note:** The standard variant of the `TextField` is no longer documented in the [Material Design guidelines](https://material.io/) ([here's why](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)), but Material-UI will continue to support it.

## Form props

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field’s input, such as how the input will be used.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validation

The `error` prop toggles the error state, the `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/).

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Select（选择器）

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Icons（图标）

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### 修饰输入

The main way is with an `InputAdornment`. 这些可用于向一个输入框添加前缀、后缀或动作。 例如，您可以使用图标按钮来隐藏或显示密码。

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## 尺寸

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## 布局

`margin` can be used to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will. `dense` and `normal` alter other styles to meet the specification.

`fullWidth` can be used to make the input take up the full width of its container.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Uncontrolled vs Controlled

The component can be controlled or uncontrolled

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Components（组件）

`TextField` 是由较小的组件组成的 ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), and [`FormHelperText`](/api/form-helper-text/) ) 你可以利用这一点来自定义你的表单输入.

您可能注意到了， 和原生的 HTML input 组件相比，`TextField` 组件缺缺失了一些属性。 这是故意为之的， 该组件只负责处理最常用的一些属性，如果有需求，需要由用户自己使用下面 Demo 中演示的基础组件。 但是同时, 为了避免过于模版化，您仍然可以使用 `inputProps` (和 `inputProps`, `InputLabelProps` 属性) 来控制原生组件的属性。

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Inputs（输入）

{{"demo": "pages/components/text-fields/Inputs.js"}}

## 颜色

The `color` prop changes the highlight color of the text field when focused.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## 自定义输入

以下是自定义组件的一些例子。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

自定义不会停留在CSS，您可以使用组合来构建自定义组件并为您的应用程序提供独特的感觉。 以下是使用受Google地图启发的 [`InputBase`](/api/input-base/) 组件的示例。

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

## 局限性

### Shrink

输入标签 "shrink" 状态并不总是正确的。 输入标签应在输入显示内容时立即收缩。 在某些情况下, 我们无法确定 "shrink" 状态 (数字输入、日期时间输入、条带输入)。 您可能会注意到重叠。

![缩小](/static/images/text-fields/shrink.png)

若要解决此问题, 您可以强制标签的 "shrink" 状态。

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

或

```jsx
<InputLabel shrink>计数</InputLabel>
```

### Floating label

The floating label is absolutely positioned, it won't impact the layout of the page. You need to make sure that the input is larger than the label to display correctly.

## 与第三方 input 库的整合

您可以使用第三方库格式化输入。 您必须提供一个带有 `inputComponent` 属性的 `<input>` 元素的自定义实现。

下面的演示使用 [react-text-mask](https://github.com/text-mask/text-mask)和 [react-number-format](https://github.com/s-yadav/react-number-format) 库。 同样的概念可以适用于 [这个例子：react-stripe-element](https://github.com/mui-org/material-ui/issues/16037)。

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

提供的输入组件应该处理 `inputRef` 属性。 The property should be called with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
function MyInputComponent(props) {
  const { component: Component, inputRef, ...other } = props;

  // 实现 `InputElement` 界面
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // 在这里加上来自第三方渲染的组件的逻辑 
    },
    // 隐藏值 例如：react-stripe-elements
  }));

  // `Component` 将会来自以下的 `SomeThirdPartyComponent`
  return <Component {...other} />;
}

// 使用
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: { component: SomeThirdPartyComponent },
  }}
/>;
```

## 可访问性

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure.

```jsx
<div class="form-control">
  <label for="my-input">电子邮件</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">我们绝不会分享您的邮件地址。</span>
</div>
```

- 如果您使用的是 `TextField` 组件，您只需提供唯一的 `id`。
- 如果您正在编写组件：

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">电子邮件</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">我们绝不会分享您的邮件地址。</FormHelperText>
</FormControl>
```

## 补充项目

对于更高级的用例，您可以利用：

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) 用于结合formik来使用Material-UI的绑定。
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) 用于更加方便地与Redux Form配搭来使用Material UI的一组包装组件。
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui)：一组配合 Final Form 和 Material UI 的封装组件。
- [mui-rff](https://github.com/lookfirst/mui-rff) A set of wrapper components to facilitate using Material UI with React Final Form.