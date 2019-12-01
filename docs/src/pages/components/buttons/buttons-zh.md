---
title: React Button（按钮）组件
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Buttons（按钮）

<p class="description">只需通过轻按一下按钮，用户即可采取行动并做出选择。</p>

[按钮](https://material.io/design/components/buttons.html) 传达用户可以执行的操作。 他们通常直接放置在您的用户界面中，例如：

- Dialogs（对话框）
- Modal windows（模态窗口）
- Forms（表单）
- Cards（卡片）
- Toolbars（工具栏)

## Contained Buttons（实心按钮）

[实心按钮](https://material.io/design/components/buttons.html#contained-button)表示高度的强调, 根据他们的立体效果和填充颜色来区分彼此。 它们用于触发应用程序所具有的主要功能。

以下演示的最后一个例子演示了如何使用上传按钮。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Text Buttons（文本按钮）

[文本按钮](https://material.io/design/components/buttons.html#text-button)通常用于不太醒目的操作, 包括那些位于:

- dialogs（对话框）中的
- cards（卡片）中的

在卡片中，使用文本按钮有助于保持卡片内容的醒目程度。

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons（描边按钮）

[描边按钮](https://material.io/design/components/buttons.html#outlined-button)是中等强调按钮。 它们包含重要但在应用程序中的不是主要的那些操作。

### 备选方案

和实心按钮相比，描边按钮强调的更少；或者和文本按钮相比，描边按钮强调的更多。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Grouped Buttons（组合按钮）

ButtonGroup 组件可用于组合描边按钮（默认的）或者实心按钮。

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

## Split Button（分割按钮）

ButtonGroup 也可用于创建分割按钮。 下拉列表可以用于更改按钮相关的操作（如本例所示），或者用于立即出发一个相关的操作。

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Floating Action Buttons（提升动作按钮）

[提升动作按钮](https://material.io/design/components/buttons-floating-action-button.html) (FAB) 在屏幕上执行主要的或最常用的操作。 它出现在所有屏幕内容的前面，通常是一个圆形，中间有一个图标。 FAB 一般有两种类型：常规的和扩展的。

仅使用 FAB 则是最适合呈现屏幕主要操作的方法。

在每个屏幕中，我们建议只有一个浮动操作按钮来表示最常见的操作。

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

默认情况下，浮动操作按钮会以展开的动画出现在屏幕上。

跨越多个横向屏幕（例如标签式屏幕）的浮动操作按钮应该短暂消失，然后如果其动作改变则会重新出现。

您可以使用缩放转换来实现此目的。 请注意，鉴于退出和进入的动画会同时被触发，我们使用`enterDelay` 来确保旧的浮动动作按钮的动画会在新的按钮出现之前完成。

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js", "bg": true}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## 尺寸

想要更大或更小的按钮？ 你可以使用 `size` 属性。

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Customized buttons

以下是自定义组件的一些例子。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Third-party routing library（第三方路由库）

One common use case is to use the button to trigger navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an [integration example with react-router](/guides/composition/#button).

## 局限性

### Cursor（鼠标悬浮）禁用

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**。 您可以移除作用在 `<button>` 元素上的指针事件的样式：

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- 若您仍旧需要在[禁用的元素上展示提示工具](/components/tooltips/#disabled-elements)，您需要恢复 `pointer-events: none;`。
- 若您加载除了一个 button 元素之外的元素， 例如，一个链接 `<a>` 元素，指针是不会改变的。

2. **改变 DOM**。 您可以这样封装按钮：

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

This has the advantage of supporting any element, for instance, a link `<a>` element.