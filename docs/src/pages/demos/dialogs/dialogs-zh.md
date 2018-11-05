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

Touch mechanics:

- Choosing an option immediately commits the option and closes the menu
- Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog

{{"demo": "pages/demos/dialogs/SimpleDialog.js"}}

## 警报

警报是一种紧急中断的行为，用以通知用户某一情况并需要确认,。

Most alerts don't need titles. They summarize a decision in a sentence or two by either:

- Asking a question (e.g. "Delete this conversation?")
- Making a statement related to the action buttons

仅对高风险情况使用带标题栏警报,，例如连接可能丢失。 用户应该仅根据标题和按钮文本，就能理解要做出的选择。

如果需要标题请:

- Use a clear question or statement with an explanation in the content area, such as "Erase USB storage?".
- Avoid apologies, ambiguity, or questions, such as “Warning!” or “Are you sure?”

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

当然你也可以换掉过渡效果, 下面的示例使用了 `幻灯片`。

{{"demo": "pages/demos/dialogs/AlertDialogSlide.js"}}

## 确认对话框

确认对话框要求用户在提交选项之前显式确认他们的选择。 例如, 用户可以聆听多个铃声, 但只在触摸 "OK" 时进行最后的选择。

在确认对话框中触摸 "取消", 或按后退, 将会取消当前操作, 放弃任何更改, 并关闭对话框。

{{"demo": "pages/demos/dialogs/ConfirmationDialog.js"}}

## 全屏对话框

{{"demo": "pages/demos/dialogs/FullScreenDialog.js"}}

## 表单对话框

表单对话框允许用户通过一个弹出的对话框，对表单进行填写。 在下面的例子中，你的网站提示那些潜在用户填写他们的电子邮箱，他们可以在点击之后填写email区域，并点击'提交'按钮以提交。

{{"demo": "pages/demos/dialogs/FormDialog.js"}}

## 响应式全屏

您可以使用 `withMobileDialog`, 使 `对话框` 响应式的全屏显示该对话框。 默认情况下, `withMobileDialog() (Dialog)` 在 [屏幕大小](/layout/basics/)*小于等于* `sm`时响应式全屏。 你可以通过传递 `breakpoint`参数来选择你自己的全屏切换点，比如 `xs`：`withMobileDialog({breakpoint: 'xs'})(Dialog)`。

{{"demo": "pages/demos/dialogs/ResponsiveDialog.js"}}

## 无障碍功能

一定要添加 `aria-labelledby="id..."`，来给` Dialog `引用模态框标题。 此外, 您还可以使用`对话框`的属性`aria-describedby="id..."`来描述您的模态对话框。

## 长内容滚动

When dialogs become too long for the user’s viewport or device, they scroll.

- `scroll=paper` the content of the dialog scrolls within the paper element.
- `scroll=body` the content of the dialog scrolls within the body element.

请尝试下面的例子来加深理解：

{{"demo": "pages/demos/dialogs/ScrollDialog.js"}}