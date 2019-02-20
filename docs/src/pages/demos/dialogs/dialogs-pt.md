---
title: Dialog React component
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---
# Dialogs (Diálogos)

<p class="description">As caixas de diálogo informa aos usuários sobre uma tarefa e podem conter informações críticas, exigir decisões ou envolver várias tarefas.</p>

Uma caixa de [Diálogo](https://material.io/design/components/dialogs.html) é um tipo de janela [modal](/utils/modal/) que aparece na frente do conteúdo do aplicativo para fornecer informações críticas ou solicitar uma decisão. A caixa de diálogo desabilita as funcionalidades do aplicativo enquanto aparece e permanece em tela até confirmado, negado ou a ação requerida seja passada.

As caixas de diálogo são intencionalmente interruptivas, portanto devem ser usadas com moderação.

## Caixas de diálogo simples

A caixa de diálogo simples pode providenciar detalhes adicionais ou ações sobre um item de lista. Por exemplo, ele podem mostrar um avatar, ícone, texto esclarecedor ou um ação paralela (Como adicionar uma conta.).

Mecanismo de Toque:

- Escolhendo imediadamente uma opção confirmando a opção e fechando o menu
- Tocando para sair da caixa de diálogo ou pressionando a opção de voltar cancelando a ação e fechando a caixa de diálogo

{{"demo": "pages/demos/dialogs/SimpleDialog.js"}}

## Alerts

Alertas são interrupções urgentes, requerendo confirmação que informou ao usuário a situação.

Maioria dos alertas não precisam de títulos. Eles resumem uma decisão em uma sentença ou duas por:

- Fazendo uma pergunta(Exemplo: "Apagar esta conversa?")
- Fazendo uma declaração relacionada aos botões de ação

Use a barra de título somente para situações de alto risco, como perda de conexão potencial. Os usuários devem ser capaz de entender as escolhas baseando-se apenas no título e texto do botão.

Se um título é necessário:

- Use uma pergunta ou declaração clara com uma explicação na área de conteúdo, como um "Apagar dados do USB?".
- Evite desculpas, ambiguidade ou perguntas, algo como "Atenção!" ou "Você tem certeza?"

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

You can also swap out the transition, the next example uses `Slide`.

{{"demo": "pages/demos/dialogs/AlertDialogSlide.js"}}

## Formulário de Diálogo

Os fórmulas de diálogo permite que os usuários preencham os campos de um fórmula em uma diálogo. Por exemplo, se seu site solicita aos inscritos preencham endereço de e-mail, eles poderão preencher o campo de e-mail e tocar em encaminhar.

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

Follow the [Modal accessibility section](/utils/modal/#accessibility).

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