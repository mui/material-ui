---
title: Dialog React component
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---

# Dialogs (Diálogos)

<p class="description">As caixas de diálogo informa aos usuários sobre uma tarefa e podem conter informações críticas, exigir decisões ou envolver várias tarefas.</p>

Uma caixa de [Diálogo](https://material.io/design/components/dialogs.html) é um tipo de janela [modal](/components/modal/) que aparece na frente do conteúdo do aplicativo para fornecer informações críticas ou solicitar uma decisão. A caixa de diálogo desabilita as funcionalidades do aplicativo enquanto aparece e permanece em tela até confirmado, negado ou a ação requerida seja passada.

As caixas de diálogo são intencionalmente interruptivas, então eles devem ser usados com moderação.

## Caixas de diálogo simples

A caixa de diálogo simples pode providenciar detalhes adicionais ou ações sobre um item de lista. Por exemplo, ele podem mostrar um avatar, ícone, texto esclarecedor ou um ação paralela (Como adicionar uma conta.).

Mecanismo de Toque:

- Escolhendo imediadamente uma opção confirmando a opção e fechando o menu
- Tocando para sair da caixa de diálogo ou pressionando a opção de voltar cancelando a ação e fechando a caixa de diálogo

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## Alerts (Alertas)

Alertas são interrupções urgentes, requerendo confirmação que informou ao usuário a situação.

Maioria dos alertas não precisam de títulos. Eles resumem uma decisão em uma sentença ou duas por:

- Fazendo uma pergunta (Exemplo: "Apagar esta conversa?")
- Fazendo uma declaração relacionada aos botões de ação

Use a barra de título somente para situações de alto risco, como perda de conexão potencial. Os usuários devem ser capaz de entender as escolhas baseando-se apenas no título e texto do botão.

Se um título é necessário:

- Use uma pergunta ou declaração clara com uma explicação na área de conteúdo, como um "Apagar dados do USB?".
- Evite desculpas, ambiguidade ou perguntas, algo como "Atenção!" ou "Você tem certeza?"

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

Você também pode trocar a transição, o próximo exemplo utiliza `Slide`.

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## Formulário de Diálogo

Os fórmulas de diálogo permite que os usuários preencham os campos de um fórmula em uma diálogo. Por exemplo, se seu site solicita aos inscritos preencham endereço de e-mail, eles poderão preencher o campo de e-mail e tocar em encaminhar.

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## Customized dialogs

Here is example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

The dialog has a close button added to aide usability.

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## Diálogos em tela cheia

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## Tamanhos opcionais

Você pode definir uma largura máxima usando `maxWidth` enumerável combinado com o booleano `fullWidth`. Quando a propriedade `fullWidth` for verdadeira, a caixa de diálogo será adaptada com base no valor definido em `maxWidth`.

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## Tela cheia responsiva

You may make a dialog responsively full screen using `withMobileDialog`. By default, `withMobileDialog()(Dialog)` responsively full screens *at or below* the `sm` [screen size](/customization/breakpoints/). Você pode escolher seu próprio ponto de interrupção, por exemplo, `xs` passando o `argumento` do ponto de interrupção: `withMobileDialog ({breakpoint: 'xs'}) (Dialog)`.

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## Diálogos de confirmação

As caixas de diálogo de confirmação exigem que os usuários confirmem explicitamente suas escolhas antes que uma opção seja confirmada. Por exemplo, os usuários podem ouvir vários toques, mas apenas fazer uma seleção final ao tocar em "OK".

Tocar em “Cancelar” em uma caixa de diálogo de confirmação ou pressionar Voltar, cancela a ação, descarta todas as alterações e fecha a caixa de diálogo.

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## Acessibilidade

Siga a seção [Acessibilidade Modal](/components/modal/#accessibility).

## Rolagem de conteúdo longo

Quando os diálogos se tornam muito longos para a porta de visualização ou dispositivo do usuário, eles rolam.

- `rolagem=papel` o conteúdo da caixa de diálogo rola dentro do elemento de papel.
- `rolagem=corpo` o conteúdo da caixa de diálogo rola dentro do elemento corpo.

Experimente a demonstração abaixo para ver o que queremos dizer:

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## Diálogo arrastável

Você pode criar uma caixa de diálogo arrastável usando [react-draggable](https://github.com/mzabriskie/react-draggable). Para fazer isso, você pode passar o importado `Draggable` componente como o `PaperComponent` do `de Diálogo` componente. Isso fará com que toda a caixa de diálogo seja arrastável.

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## Performance

Follow the [Modal performance section](/components/modal/#performance).