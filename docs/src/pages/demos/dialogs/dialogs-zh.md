---
title: React对话框组件
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---
# 对话框

<p class="description">对话框用来给用户一个任务，可以提示关键信息、可以让用户进行确认、或者包含多个任务。</p>

[对话框](https://material.io/design/components/dialogs.html) 是 [模态](/utils/modal/) 窗体的一种类型, 通过显示在应用程序内容的前面，来提供关键信息的显示，或者要求用户进行确认和判断。 对话框在出现时会禁用应用程序的所有功能, 并在屏幕上保持固定, 直到被确认、被取消或已采取其他必要的操作。

对话框会带有目的性地中断用户体验，请谨慎使用。

## 基本对话框

基本对话框可以提供有关列表项的详细信息或操作。 例如, 它们可以显示头像、图标、解释或交互操作 (如添加帐户)。

触摸操作机制:

- 选择一个选项，立即提交选项并关闭菜单
- 在对话框外触摸或按下“返回”，将取消操作并关闭对话框。

{{"demo": "pages/demos/dialogs/SimpleDialog.js"}}

## 警报

警报是一种紧急中断的行为，用以通知用户某一情况并需要确认,。

大多数警报不需要标题。 大多数警报不需要标题。 他们通过以下其中一种方式的一两句话来得出一个决定：

- 问一个问题 (例如 "确认删除此对话？")
- 发表一个和动作按钮相关的声明

仅对高风险情况使用带标题栏警报,，例如连接可能丢失。 用户应该仅根据标题和按钮文本，就能理解要做出的选择。

如果需要标题请:

- 使用明确的问题或声明，并在内容区域对其做出解释, 例如 "擦除 USB 存储？"。
- 避免道歉、模棱两可或问题, 例如 "警告！" 或 "你确定吗？“

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

当然你也可以换掉过渡效果, 下面的示例使用了 `幻灯片`。

{{"demo": "pages/demos/dialogs/AlertDialogSlide.js"}}

## 表单对话框

表单对话框允许用户通过一个弹出的对话框，对表单进行填写。 在下面的例子中，你的网站提示那些潜在用户填写他们的电子邮箱，他们可以在点击之后填写email区域，并点击'提交'按钮以提交。

{{"demo": "pages/demos/dialogs/FormDialog.js"}}

## 自定义对话框

如果您已经阅读了 [覆盖文档页面](/customization/overrides/) 但是您没有信心进入， 这里是一个如何自定义 `DialogTitle` 以支持关闭按钮的示例。

⚠️虽然材料设计规范鼓励主题，但这个例子是不合适的。

{{"demo": "pages/demos/dialogs/CustomizedDialog.js"}}

## 全屏对话框

{{"demo": "pages/demos/dialogs/FullScreenDialog.js"}}

## 可选尺码

您可以使用 `maxWidth` enumerable和 `fullWidth` boolean来设置对话框的最大宽度。 当 `fullWidth` 属性为true时，对话框将根据 `maxWidth` 值进行调整。

{{"demo": "pages/demos/dialogs/MaxWidthDialog.js"}}

## 响应式全屏

您可以使用 `withMobileDialog`以对话方式全屏显示对话框。 默认情况下, `withMobileDialog() (Dialog)` 在 [屏幕大小](/layout/basics/)*小于等于* `sm`时响应式全屏。 你可以通过传递 `breakpoint`参数来选择你自己的全屏切换点，比如 `xs`：`withMobileDialog({breakpoint: 'xs'})(Dialog)`。

{{"demo": "pages/demos/dialogs/ResponsiveDialog.js"}}

## 确认对话框

确认对话框要求用户在提交选项之前显式确认他们的选择。 例如, 用户可以聆听多个铃声, 但只在触摸 "OK" 时进行最后的选择。

在确认对话框中触摸 "取消", 或按后退, 将会取消当前操作, 放弃任何更改, 并关闭对话框。

{{"demo": "pages/demos/dialogs/ConfirmationDialog.js"}}

## 无障碍功能

一定要添加 `aria-labelledby="id..."`，来给` Dialog `引用模态框标题。 此外, 您还可以使用`对话框`的属性`aria-describedby="id..."`来描述您的模态对话框。

## 长内容滚动

当对话框根据用户不同的设备和视图大小变得很长时，可以让他们进行滚动。

- - `scroll=paper` 可以使对话框的内容在paper元素中滚动。
- - `scroll=body`可以使对话框的内容在body元素内滚动。

请尝试下面的例子来加深理解：

{{"demo": "pages/demos/dialogs/ScrollDialog.js"}}

## 可拖动的对话框

您可以使用 [react-draggable](https://github.com/mzabriskie/react-draggable)创建可拖动的对话框。 为此，您可以将导入的 `Draggable` 组件作为 `Dialog` 组件的 `PaperComponent` 传递。 这将使整个对话框可拖动。

{{"demo": "pages/demos/dialogs/DraggableDialog.js"}}

## 性能

按照 [模态性能部分](/utils/modal/#performance)。