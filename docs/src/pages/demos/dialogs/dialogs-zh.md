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
- 避免道歉、模棱两可或询问, 例如 "警告！" 或 "你确定吗？“

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

当然你也可以换掉过渡效果, 下面的示例使用了 `幻灯片`。

{{"demo": "pages/demos/dialogs/AlertDialogSlide.js"}}

## Form dialogs

Form dialogs allow users to fill out form fields within a dialog. For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and touch 'Submit'

{{"demo": "pages/demos/dialogs/FormDialog.js"}}

## Customized dialog

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the `DialogTitle` to support a close button.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/dialogs/CustomizedDialog.js"}}

## Full-screen dialogs

{{"demo": "pages/demos/dialogs/FullScreenDialog.js"}}

## Optional sizes

You can set a dialog maximum width by using the `maxWidth` enumerable in combination with the `fullWidth` boolean. When the `fullWidth` property is true, the dialog will adapt based on the `maxWidth` value.

{{"demo": "pages/demos/dialogs/MaxWidthDialog.js"}}

## Responsive full-screen

You may make a dialog responsively full screen the dialog using `withMobileDialog`. By default, `withMobileDialog()(Dialog)` responsively full screens *at or below* the `sm` [screen size](/layout/basics/). You can choose your own breakpoint for example `xs` by passing the `breakpoint` argument: `withMobileDialog({breakpoint: 'xs'})(Dialog)`.

{{"demo": "pages/demos/dialogs/ResponsiveDialog.js"}}

## Confirmation dialogs

Confirmation dialogs require users to explicitly confirm their choice before an option is committed. For example, users can listen to multiple ringtones but only make a final selection upon touching “OK.”

Touching “Cancel” in a confirmation dialog, or pressing Back, cancels the action, discards any changes, and closes the dialog.

{{"demo": "pages/demos/dialogs/ConfirmationDialog.js"}}

## 无障碍功能

Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Dialog`. Additionally, you may give a description of your modal dialog with the `aria-describedby="id..."` property on the `Dialog`.

## Scrolling long content

When dialogs become too long for the user’s viewport or device, they scroll.

- - `scroll=paper` 可以使对话框的内容在paper元素中滚动。
- - `scroll=body`可以使对话框的内容在body元素内滚动。

Try the demo below to see what we mean:

{{"demo": "pages/demos/dialogs/ScrollDialog.js"}}

## Draggable dialog

You can create a draggable dialog by using [react-draggable](https://github.com/mzabriskie/react-draggable). To do so, you can pass the the imported `Draggable` component as the `PaperComponent` of the `Dialog` component. This will make the entire dialog draggable.

{{"demo": "pages/demos/dialogs/DraggableDialog.js"}}

## Performance

Follow the [Modal performance section](/utils/modal/#performance).