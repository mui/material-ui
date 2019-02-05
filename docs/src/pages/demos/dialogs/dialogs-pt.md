---
title: Dialog React component
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---
# Dialogs (Diálogos)

<p class="description">As caixas de diálogo informam os usuários sobre uma tarefa e podem conter informações críticas, exigir decisões ou envolver várias tarefas.</p>

Uma caixa de [Diálogo](https://material.io/design/components/dialogs.html) é um tipo de janela [modal](/utils/modal/) que aparece na frente do conteúdo do aplicativo para fornecer informações críticas ou solicitar uma decisão. As caixas de diálogo desativam toda a funcionalidade do aplicativo quando elas são exibidas e permanecem na tela até que sejam confirmadas, rejeitadas ou que uma ação necessária tenha sido executada.

As caixas de diálogo são intencionalmente interruptivas, portanto devem ser usadas com moderação.

## Caixas de diálogo simples

Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account).

Touch mechanics:

- Choosing an option immediately commits the option and closes the menu
- Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog

{{"demo": "pages/demos/dialogs/SimpleDialog.js"}}

## Alerts

Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.

Most alerts don't need titles. They summarize a decision in a sentence or two by either:

- Asking a question (e.g. "Delete this conversation?")
- Making a statement related to the action buttons

Use title bar alerts only for high-risk situations, such as the potential loss of connectivity. Users should be able to understand the choices based on the title and button text alone.

If a title is required:

- Use a clear question or statement with an explanation in the content area, such as "Erase USB storage?".
- Avoid apologies, ambiguity, or questions, such as “Warning!” or “Are you sure?”

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

You can also swap out the transition, the next example uses `Slide`.

{{"demo": "pages/demos/dialogs/AlertDialogSlide.js"}}

## Form dialogs

Form dialogs allow users to fill out form fields within a dialog. For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and touch 'Submit'.

{{"demo": "pages/demos/dialogs/FormDialog.js"}}

## Customized dialog

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the `DialogTitle` to support a close button.

⚠️ Embora a especificação do design do material incentive o tema, este exemplo está fora do caminho comum.

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

Confirmation dialogs require users to explicitly confirm their choice before an option is committed. For example, users can listen to multiple ringtones but only make a final selection upon touching “OK”.

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