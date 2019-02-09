---
title: Dialog React component
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---
# Диалоги

<p class="description">Диалоги информируют пользователей о задаче и могут содержать критическую информацию, требовать решения или включать несколько задач.</p>

[Диалог](https://material.io/design/components/dialogs.html) представляет собой тип [модальных](/utils/modal/) окон, который появляется над приложением, чтобы предоставить важную информацию или для предоставления решения. Диалоги отключают все функции приложения, когда они появляются, и остаются на экране до тех пор, пока не будут подтверждены, отклонены или пока не будут предприняты необходимые действия.

Диалоги целенаправленно останавливают, поэтому их следует использовать с осторожностью.

## Простые диалоги

Простые диалоги могут предоставить дополнительные детали или действия по элементу списка. Например, они могут отображать аватары, значки, уточняющий подтекст или ортогональные действия (например, добавление учетной записи).

Touch mechanics:

- Выбор опции немедленно фиксирует ее и закрывает меню
- Касание за пределами диалога или нажатие Назад отменяет действие и закрывает диалоговое окно

{{"demo": "pages/demos/dialogs/SimpleDialog.js"}}

## Оповещения

Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.

Большинству оповещений не нужны названия. Они суммируют решение в предложении или два:

- Задать вопрос (например, «Удалить этот разговор?»)
- Создать заявления, связанное с кнопками действий

Используйте предупреждения в строке заголовка только для ситуаций с высоким риском, таких как потенциальная потеря подключения. Пользователи должны уметь понимать варианты, основываясь только на заголовке и тексте кнопки.

Если требуется название:

- Используйте четкий вопрос или утверждение с пояснением в области содержимого, например «Очистить USB-накопитель?».
- Избегайте извинений, двусмысленности или вопросов, таких как «Предупреждение!» Или «Вы уверены?»

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

You can also swap out the transition, the next example uses `Slide`.

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

## Accessibility

Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Dialog`. Additionally, you may give a description of your modal dialog with the `aria-describedby="id..."` property on the `Dialog`.

## Scrolling long content

When dialogs become too long for the user’s viewport or device, they scroll.

- `scroll=paper` the content of the dialog scrolls within the paper element.
- `scroll=body` the content of the dialog scrolls within the body element.

Try the demo below to see what we mean:

{{"demo": "pages/demos/dialogs/ScrollDialog.js"}}

## Draggable dialog

You can create a draggable dialog by using [react-draggable](https://github.com/mzabriskie/react-draggable). To do so, you can pass the the imported `Draggable` component as the `PaperComponent` of the `Dialog` component. This will make the entire dialog draggable.

{{"demo": "pages/demos/dialogs/DraggableDialog.js"}}

## Performance

Follow the [Modal performance section](/utils/modal/#performance).