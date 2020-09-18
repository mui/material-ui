---
title: React 文本框组件
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel:
  component: TextField
materialDesign: https://material.io/components/text-fields
---

# TextField 文本框

<p class="description">用户可以在文本框内输入或编辑文字。</p>

用户可以通过[文本框](https://material.io/design/components/text-fields.html)在界面中输入文本。 通常，我们会在表单域和对话框中使用它们。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## TextField

`TextField` wrapper 组件是一个完整的表单控件，它包括了标签，输入和帮助文本。

它支持 standard，outlined 和 filled 这几个样式。

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**友情提示：** [Material 设计指南](https://material.io/)不再记录 `TextField` 的 standard 布局，（[原因见此](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)），但是 Material-UI 会继续支持此布局。

## Form props 表单的属性

`TextField` 是由一些较小的组件组成的 ( [`FormControl`](/api/form-control/)， [`Input`](/api/input/)， [`FilledInput`](/api/filled-input/)， [`InputLabel`](/api/input-label/)， [`OutlinedInput`](/api/outlined-input/)， and [`FormHelperText`](/api/form-helper-text/) ) ，而你可以直接使用这些小的组件，来自定制你的表单域输入框。

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## 校验

您可以使用 `error` 属性来切换错误的状态，同时也可以使用 `helperText` 属性来给用户提供错误的提示信息。

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## 多行属性

`multiline` 属性将文本字段转换为 [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 元素。 除非设置了 `rows` 属性，否则文本字段的高度会动态匹配其内容（使用 [TextareaAutosize](/components/textarea-autosize/) 时）。 你可以使用 `rowsMin` 和 `rowsMax` 属性来绑定它。

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## 选择属性

使用 `select` 属性的时候，您可以在文本框内插入一个 [Select](/components/selects/) 组件。

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Icons 图标

我们提供了在文本框内展示图标的不同的方式。

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### 修饰输入框

一个主流的方法是使用 `InputAdornment` 组件。 这些可用于向输入添加前缀、后缀或动作. 例如，可以用一个图标按钮来隐藏或者显示输入框里的密码。

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## 尺寸

想要使用外观看起来比较小的输入框吗？ 试着使用 `size` 属性吧。

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## 布局

通过使用 `margin` 属性，你可以改变输入框的垂直间距。 若您使用 `none` （默认选项），将不会在 `FormControl` 上添加间距， 相对来说，使用 `dense` 和 `normal` 会添加间距。 使用 ` dense ` 和 `normal` 会更改其他的样式，以符合规范。

我们提供了`fullWidth` 属性，使用它的时候，输入框会占据整个容器的宽度。

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## 可控制的 vs 不可控制的

你可以选择控制的组件，或者不受控的组件。

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Components 组件

`TextField` 是由一些较小的组件组成的 ( [`FormControl`](/api/form-control/)， [`Input`](/api/input/)， [`FilledInput`](/api/filled-input/)， [`InputLabel`](/api/input-label/)， [`OutlinedInput`](/api/outlined-input/)， and [`FormHelperText`](/api/form-helper-text/) ) ，而你可以直接使用这些小的组件，来自定制你的表单域输入框。

您可能注意到了， 和原生的 HTML input 组件相比，`TextField` 组件缺失了一些属性。 这是故意为之的。 该组件只负责处理最常用的一些属性，如果有需求，用户可以自行调用下面演示的一些组件。 但是同时, 为了避免过于模版化，您仍然可以使用 `inputProps` (和 `inputProps`, `InputLabelProps` 属性) 来控制原生组件的属性。

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Inputs 输入框

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Color 颜色

当使用 `color` 属性时，聚焦文本框时的高亮颜色会被改变。

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## 自定义输入

你可以参考以下一些例子来自定义组件。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

自定义不会停留在CSS，您可以使用组合来构建自定义组件，让您的 app 独树一帜。 接下来的这个示例受到了 Google 地图的启发，它使用了 [`InputBase`](/api/input-base/) 组件。

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

🎨 如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/styles/text-field)。

## 局限性

### 缩放

输入框标签的 "shrink" 状态并不总是正确的。 输入标签应在输入框显示内容的时候立即收缩。 在某些情况下，我们无法确定输入框的 "shrink" 状态 (如数字输入、日期时间输入、条带输入)。 这样一来，有可能出现重叠的现象。

![shrink 缩放](/static/images/text-fields/shrink.png)

若要解决此问题，您可以在输入框的标签上强制赋予 "shrink" 状态。

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

或

```jsx
<InputLabel shrink>计数</InputLabel>
```

### 悬浮的标签

悬浮的标签被定义了一个绝对的位置，这样的话，它将不会影响到页面的整体布局。 想要正确显示你的组件，你只要确保输入框的比输入标签大。

### type="number"

type="number" 的输入存在潜在的可用性问题。

- 这将允许某些非数字字符（'e', '+', '-', '.'） 并且丢失其他字符
- 滚动增加/减少数字的功能可能会导致意外和难以察觉的变化。

有关该话题的更多信息 - 请参阅 GOV.UK 设计系统团队的 [这篇文章](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)，来了解更详细的解释。

对于数字验证，一个可行的替代方法是使用默认的 type="text" 和 _pattern_ 属性，例如：

```jsx
<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
```

以后我们可能会提供 [数字（number）输入组件](https://github.com/mui-org/material-ui/issues/19154)。

### 助手文本

助手文本属性会影响文本字段的高度。 如果两个文本字段并排放置，一个有辅助文本，另一个没有，那么它们的高度就会不同。 例如:

{{"demo": "pages/components/text-fields/HelperTextMisaligned.js"}}

您可以使用 `error` 属性来切换错误的状态，同时也可以使用 `helperText` 属性来给用户提供错误的提示信息。

{{"demo": "pages/components/text-fields/HelperTextAligned.js"}}

## 与第三方 input 库的整合

您可以使用第三方库来格式化您的输入框。 只要确保在整合的时候，您提供了一个带有 `inputComponent` 属性的自定义 `<input>` 元素。

下面的演示使用 [react-text-mask](https://github.com/text-mask/text-mask) 和 [react-number-format](https://github.com/s-yadav/react-number-format) 这两个基本库。 同样的概念可以适用于 [这个例子：react-stripe-element](https://github.com/mui-org/material-ui/issues/16037)。

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

我们要求提供的输入组件能够受理 `inputRef` 这个属性。 这个属性可以通过一个值来调用，而这个值实现了一下的接口：

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

## 无障碍设计

为了确保您的文本框可提供无障碍访问，**输入框必须和标签以及帮助文本连在一起调用**。 而且，深层的 DOM 节点应该遵循这个结构。

```jsx
<div class="form-control">
  <label for="my-input">电子邮件</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">我们绝不会分享您的邮件地址。 </span>
</div>
```

- 如果您使用的是 `TextField` 组件，那您只需提供独特的 `id`。
- 如果您正在构造一个组件：

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">电子邮件</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">我们绝不会分享您的邮件地址。
  </FormHelperText>
</FormControl>
```

## 补充项目

对于更高级的用例，您可以利用：

- [react-hook-form](https://react-hook-form.com/)：用于表单验证的 React 钩子。
- [formik-material-ui](https://github.com/stackworx/formik-material-ui)：用于 [formik](https://jaredpalmer.com/formik) 和 Material-UI 捆绑使用。
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui)：用于 [Redux Form](https://redux-form.com/) 和 Material-UI 捆绑使用。
- [mui-rff](https://github.com/lookfirst/mui-rff)：用于 [React Final Form](https://final-form.org/react) 和 Material-UI 捆绑使用。
