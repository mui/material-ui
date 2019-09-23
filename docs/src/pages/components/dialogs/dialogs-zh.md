---
title: React Dialog（对话框）组件
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---

# Dialogs（对话框组件）

<p class="description">对话框将一个任务告知给用户，它包含了一些关键信息，需要用户进行确认，或者包含了多个任务。</p>

[对话框](https://material.io/design/components/dialogs.html)是 [modal](/components/modal/) 窗体的一种类型，它通常在应用程序内容之前呈现，来提供一些关键信息，或者要求用户做出决策。 对话框出现的时候会禁用应用程序的所有功能，只有被确认、被取消或已采取其他必要的操作时，对话框才不会留在屏幕上。

对话框会带有目的性地中断用户体验，所以请您谨慎使用。

## 简单的对话框

简单对话框可以提供有关列表的额外信息与操作。 例如，它们可以显示头像，图标，纯文本或具体动作(例如添加帐户)。

触摸操作机制：

- 选择一项将立刻触发提交选项，并关闭菜单
- 在对话框外触摸或按下“返回”，将取消操作并关闭对话框。

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## 警告框

警告框是一种紧急中断的行为，用以将某一情况通知用户，并需要确认。

大多数警报不需要标题。 他们通过以下两种方式总结了一两句话的决定：

- 问一个问题（例如："是否删除此对话？”）
- 发表一个和动作按钮相关的声明

仅在高风险情况下使用标题栏警报，例如可能丢失连接。 用户应该能够仅根据标题和按钮文本来理解选择。

如果需要加上标题请:

- 使用明确的问题或声明，并在内容区域对其做出解释，例如：“是否要清除 USB 上的内容？”。
- 避免道歉、模棱两可或问一些问题，例如：“警告！” 或 “你确定吗?”

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

## 过渡动画

当然你也可以换掉过渡效果，下面的示例使用了 ` Slide（幻灯片）`。

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## 表单对话框

表单对话框允许用户在对话框内填写表单。 比如说，如果您的网站提示潜在订阅者填写他们的电子邮件地址，他们可以填写电子邮件字段然后点击“提交”。

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## 自定义对话框

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

该对话框加上了一个关闭按钮来辅助可用性。

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## 全屏对话框

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## 大小选择项

您可以使用 `maxWidth`的 enumerable 和 `fullWidth`的 boolean 来设定对话框的最大宽度。 当 `fullWidth` 属性为true时，对话框将根据 `maxWidth` 的值进行自我调整。

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## 响应式全屏

您可以使用[`useMediaQuery`](/components/use-media-query/#usemediaquery)来实现一个全屏显示的对话框。

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return <Dialog fullScreen={fullScreen} />
}
```

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## 确认对话框

确认型对话框明确要求用户在提交选项之前确认他们的选择。 比如说，用户可以听到多种铃声，但只有在点击 “OK” 后才意味着做出了选择。

在确认对话框中触摸 "取消"，或按后退，将会导致当前操作的取消，放弃任何更改， 并关闭对话框。

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## Draggable dialog

You can create a draggable dialog by using [react-draggable](https://github.com/mzabriskie/react-draggable). To do so, you can pass the the imported `Draggable` component as the `PaperComponent` of the `Dialog` component. This will make the entire dialog draggable.

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## 长内容滚动

When dialogs become too long for the user’s viewport or device, they scroll.

- `scroll=paper` 可以使对话框的内容在 paper 元素中滚动。
- `scroll=body` 可以使对话框的内容在 body 元素内滚动。

Try the demo below to see what we mean:

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## 可访问性

Follow the [Modal accessibility section](/components/modal/#accessibility).