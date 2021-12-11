---
title: React Button（按钮）组件
components: Button, IconButton, ButtonBase, LoadingButton, ButtonUnstyled
materialDesign: https://material.io/components/buttons
githubLabel: 'component: Button'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# Button 按钮

<p class="description">只需轻点按钮，用户就可以触发动作或做出选择。</p>

按钮可以展示用户能进行的操作。 他们通常直接放置在您的用户界面中，例如：

- Modal windows（模态窗口）
- Forms（表单）
- Cards（卡片）
- Toolbars（工具栏)

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic button

`Button`（按钮）组件有三种形式：文本（默认值）、实心，以及描边。

{{"demo": "pages/components/buttons/BasicButtons.js"}}

### Text button

[Text buttons](https://material.io/components/buttons#text-button) are typically used for less-pronounced actions, including those located: in dialogs, in cards. 在卡片中，文本按钮有助于强调卡片的内容。

{{"demo": "pages/components/buttons/TextButtons.js"}}

### Contained button

[实心按钮](https://material.io/design/components/buttons.html#contained-button) 表示高度的强调，你根据它们的立体效果和填充颜色来区分彼此。 它们用于触发应用程序所具有的主要功能。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

### Outlined button

[描边按钮](https://material.io/components/buttons#outlined-button) 是表示中等程度强调的按钮。 它们用于触发应用程序中重要、但并非主要的那些操作。

你也可以将描边按钮作为比实心按钮次要一点的替代方案，或者用来作为比文本按钮重要一点的展示。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks 处理点击

所有组件都接受 `onClick` 处理程序，该处理程序被应用到根 DOM 元素中。

```jsx
<Button
  onClick={() => {
    alert('clicked');
  }}
>
  点击我
</Button>
```

请注意，文档里组件的 API 部分 [避免](/guides/api/#native-properties) 提到原生的属性（还是有很多）。

## Color

{{"demo": "pages/components/buttons/ColorButtons.js"}}

In addition to using the default button colors, you can add custom ones, or disable any you don't need. See the [Adding new colors](/customization/palette/#adding-new-colors) example for more info.

## Sizes

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Upload button 上传按钮

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## 带有icons（图标）和 label（标签）的按钮

因为相比纯文本来说用户对图标更敏感，所以有些时候你可能希望为某些按钮设置图标，以增强应用程序的用户体验。 例如，如果您有删除按钮，则可以使用垃圾箱图标对其进行标记。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## 图标按钮

图标按钮通常位于应用栏和工具栏中。

图标也适用于允许选择单个选项的切换按钮或取消选择，例如向项目添加或删除星标。

{{"demo": "pages/components/buttons/IconButtons.js"}}

### Sizes

如果需要更大或者更小的图标按钮，请使用`size`属性。

{{"demo": "pages/components/buttons/IconButtonSizes.js"}}

### Colors

使用 `color`属性来把调色板应用到组件上。

{{"demo": "pages/components/buttons/IconButtonColors.js"}}

## Customization

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/button/).

## Loading button

The loading buttons can show loading state and disable interactions.

{{"demo": "pages/components/buttons/LoadingButtons.js"}}

Toggle the loading switch to see the transition between the different states.

{{"demo": "pages/components/buttons/LoadingButtonsTransition.js"}}

## Complex button

文本按钮，包含按钮，浮动操作按钮和图标按钮构建在同一组件之上：`ButtonBase`。 你可以利用这种低级组件来构建自定义交互功能。

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. `ButtonBase` 组件提供了 `component` 属性来处理此用例。 Here is a [more detailed guide](/guides/routing/#button).

## Limitations

### Cursor 鼠标悬浮的禁用

在 disabled 不可用的按钮上，ButtonBase 组件会有这个设置：`pointer-events: none;` ，这样一来不可用样式的鼠标悬浮就不会出现。

若您希望使用 `not-allowed`， 您有以下两种选择：

1. **仅使用 CSS**。 当 `<button>` 元素在处于禁用的状态时，你可以移除其鼠标样式。

```css
.MuiButtonBase-root:disabled {
  cursor: not-allowed;
  pointer-events: auto;
}
```

然而：

- 如您要 [在 disabled 不可用元素上显示提示文本](/components/tooltips/#disabled-elements)，则需添加 `pointer-events: none;`
- 若您加载除了一个 button 元素之外的元素， 例如，一个链接 `<a>` 元素，指针是不会改变的。

2. **改变 DOM**。 您可以这样封装按钮：

```jsx
<span style={{ cursor: 'not-allowed' }}>
  <Button component={Link} disabled>
    disabled
  </Button>
</span>
```

这个方法能支持任何元素，例如，一个 `<a>` 元素。

## Unstyled

The button also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

### Unstyled component

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
```

{{"demo": "pages/components/buttons/UnstyledButtonsSimple.js"}}

#### Customizing the root element

By default, the `ButtonUnstyled` renders a native `button` element. You are free to override this by setting the `component` or `components.Root` prop. If a non-interactive element (such as a span) is provided this way, the `ButtonUnstyled` will take care of adding accessibility attributes.

{{"demo": "pages/components/buttons/UnstyledButtonsSpan.js"}}

Compare the attributes on the span with the button from the previous demo.

#### Complex customization

You are not limited to using HTML elements for the button structure. SVG elements, even with complex structure, are equally acceptable.

{{"demo": "pages/components/buttons/UnstyledButtonCustom.js"}}

### useButton hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

If you need to use Button's functionality in another component, you can use the `useButton` hook. It returns props to be placed on a custom button element and fields representing the internal state of the button.

The `useButton` hook requires the ref of the element it'll be used on. Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "pages/components/buttons/UseButton.js"}}
