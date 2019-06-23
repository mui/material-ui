---
title: React Button（按钮）组件
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Buttons（按钮）

<p class="description">按钮允许用户只需轻按一下即可采取行动并做出选择。</p>

[按钮](https://material.io/design/components/buttons.html)承载了用户可以触发的动作。通常他们被放置在界面中的以下位置：

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

- 对话框中
- 卡片中

在卡片中，使用文本按钮有助于保持卡片内容的醒目程度。

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons（描边按钮）

[描边按钮](https://material.io/design/components/buttons.html#outlined-button)是中等强调按钮。 它们包含重要但在应用程序中的不是主要的那些操作。

### 备选方案

和实心按钮相比，描边按钮强调的更少；或者和文本按钮相比，描边按钮强调的更多。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Grouped Buttons（按钮组）

ButtonGroup组件可用于对描边按钮(默认) 或者实心按钮进行分组。

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

## 分割按钮

按钮组也可用于构建分割按钮. 在分割按钮中, 下拉框既可以改变主按钮的行为(如本例所示), 又或是立刻触发相应的动作.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Floating Action Buttons（提升动作按钮）

[提升动作按钮](https://material.io/design/components/buttons-floating-action-button.html) (FAB) 在屏幕上执行主要的或最常用的操作。 它出现在所有屏幕内容的前面, 通常作为圆形形状, 其中心有一个图标。 FAB有两种类型：常规的和扩展的。

只使用FAB是最适合呈现屏幕主要操作的方法。

在每个屏幕中，我们建议只有一个浮动操作按钮来表示最常见的操作。

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

默认情况下，浮动操作按钮会以展开的动画出现在屏幕上。

跨越多个横向屏幕（例如标签式屏幕）的浮动操作按钮应该短暂消失， 然后如果其动作改变则重新出现。

可以使用缩放转换来实现此目的。 注意，既然退出和进入动画同时被触发，我们使用`enterDelay`来允许旧的浮动动作按钮动画在新的按钮进入之前完成。

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## 尺寸

您喜欢更大一点或更小一点的按钮？使用 `size` 属性可以实现大小的控制。

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## 带有图标和标签的按钮

有时您可能希望为某个按钮添加图标以增强应用程序的用户体验，因为我们识别徽标比纯文本更容易。 例如，如果您有删除按钮，则可以使用垃圾箱图标对其进行标记。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## 图标按钮

图标按钮通常位于应用栏和工具栏中。

图标也适用于允许选择单个选项的切换按钮或 取消选择，例如向项目添加或删除星标。

{{"demo": "pages/components/buttons/IconButtons.js"}}

## 自定义按钮

以下是自定义组件的一些示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}



## 复杂按钮

文本按钮，包含按钮，浮动操作按钮和图标按钮构建在同一组件之上：`ButtonBase`。 您可以利用此较底层的组件来构建自定义交互。

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## 第三方路由库

一个常见的用例是使用按钮触发导航到新页面。 `ButtonBase` 组件提供了一个处理此用例的属性：`component`。 然而，一些特定 `ButtonBase` 的代码需要所给组件的 DOM 节点。 在组件上附加一个 ref，并且预期此组件能够将这个 ref 传递到下层 DOM 节点，通过这样的方法可以实现。 鉴于我们的许多交互式组件都依赖于 `ButtonBase`，你几乎可以在所有地方用到它的好处：

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*请注意：为了防止组件被意外地移除，创建一个 Button 组件是有必要的。您可以在我们的[组件属性指南](/guides/composition/#component-property)中阅读更多相关信息。*