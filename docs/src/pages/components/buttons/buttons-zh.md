---
title: React Button（按钮）组件
components: Button, IconButton, ButtonBase
---

# Button 按钮

<p class="description">只需轻点按钮，用户就可以触发动作或做出选择。</p>

[按钮](https://material.io/design/components/buttons.html) 传达了一系列用户可以执行的操作命令。 他们通常直接放置在您的用户界面中，例如：

- Dialogs 对话框
- Modal windows 模态窗口
- Forms 表单
- Cards 卡片
- Toolbars 工具栏

## Contained Buttons 实心按钮

[实心按钮](https://material.io/design/components/buttons.html#contained-button) 表示高度的强调，你根据它们的立体效果和填充颜色来区分彼此。 它们用于触发应用程序所具有的主要功能。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

你也可以使用属性 `disableElevation` 属性来消除实心按钮的立体效果。

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Text Buttons 文本按钮

[文本按钮](https://material.io/design/components/buttons.html#text-button)通常用于不太明显的操作，包括那些存在于：

- 在 dialogs 对话框中的
- 在 cards 卡片中的

在卡片中，文本按钮有助于强调卡片的内容。

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons 描边按钮

[描边按钮](https://material.io/design/components/buttons.html#outlined-button) 表示中等程度的强调。 它们包含了一些重要的操作，但不是一个 app 中的主要操作。

你也可以将描边按钮作为比实心按钮次要一点的替代方案，或者用来作为比文本按钮重要一点的展示。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks 处理点击

所有组件都接受 `onClick` 处理程序，该处理程序被应用到根 DOM 元素中。

```jsx
<Button onClick={() => { alert('clicked') }}>请点击我</Button>
```

请注意，文档里组件的 API 部分 [避免](/guides/api/#native-properties) 提到原生的属性（还是有很多）。

## Upload button 上传按钮

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## 尺寸

您想要一个大一点或者小一点的按钮吗？ 我们提供了 `size` 这个属性供您调整。

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## 带有icons（图标）和 label（标签）的按钮

有时您可能希望为某个按钮添加图标以增强应用程序的用户体验，因为我们识别徽标比纯文本更容易。 例如，如果您有删除按钮，则可以使用垃圾箱图标对其进行标记。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons（图标按钮）

图标按钮通常位于应用栏和工具栏中。

图标也适用于允许选择单个选项的切换按钮或取消选择，例如向项目添加或删除星标。

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Customized Buttons（自定义按钮）

你可以参考以下一些例子来自定义组件。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/styles/button)。

## Complex Buttons（复杂按钮）

文本按钮，包含按钮，浮动操作按钮和图标按钮构建在同一组件之上：`ButtonBase`。 您可以利用此较底层的组件来构建自定义交互。

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Third-party routing library（第三方路由库）

一个常见的用例是使用按钮触发导航到新页面的操作。 `ButtonBase` 组件提供了一个处理此用例的属性：`component`。 然而，一些特定 `ButtonBase` 的代码需要所给组件的 DOM 节点。 在组件上附加一个 ref，并且预期此组件能够将这个 ref 传递到下层 DOM 节点，通过这样的方法可以实现。 鉴于我们的许多交互式组件都依赖于 `ButtonBase`，您可以在任何情况都能受益于它。

这有一个[与 react-router 交互的例子](/guides/composition/#button)。

## 设计局限

### Cursor 鼠标悬浮的禁用

在 disabled 不可用的按钮上，ButtonBase 组件会有这个设置：`pointer-events: none;` ，这样一来不可用样式的鼠标悬浮就不会出现。

若您希望使用 `not-allowed`， 您有以下两种选择：

1. **CSS only**。 您可以移除作用在 `<button>` 元素上的指针事件的样式：

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
      禁用
    </Button>
  </span>
  ```

这个方法能支持任何元素，例如，一个 `<a>` 元素。