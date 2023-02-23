---
product: material-ui
title: Componente Diálogo para React
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
githubLabel: 'component: dialog'
materialDesign: https://m2.material.io/components/dialogs
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
---

# Diálogo

<p class="description">Diálogos informam aos usuários sobre uma tarefa e podem conter informações críticas, exigir decisões ou envolver várias tarefas.</p>

A Dialog is a type of [modal](/material-ui/react-modal/) window that appears in front of app content to provide critical information or ask for a decision. As caixas de diálogo desativam toda a funcionalidade do aplicativo quando elas são exibidas e permanecem na tela até que sejam confirmadas, rejeitadas ou que uma ação necessária tenha sido executada.

Os diálogos são intencionalmente interruptivos, então eles devem ser usados com moderação.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Diálogo simples

Diálogos simples podem fornecer detalhes adicionais ou ações sobre um item da lista. Por exemplo, eles podem exibir avatares, ícones, esclarecer subtexto ou ações ortogonais (como adicionar uma conta).

Mecanismo de toque:

- Escolhendo uma opção irá imediatamente confirmar a opção e fechar o menu
- Tocando para sair do diálogo ou pressionando a opção de voltar irá cancelar a ação e fechar o diálogo

{{"demo": "SimpleDialog.js"}}

## Alertas

Alertas são interrupções urgentes, exigindo confirmação de que o usuário esteja ciente da situação.

A maioria dos alertas não precisam de títulos. Eles resumem uma decisão em uma sentença ou duas:

- Fazendo uma pergunta (Exemplo: "Apagar esta conversa?")
- Fazendo uma declaração relacionada aos botões de ação

Use alertas com barra de título apenas para situações de alto risco, como a potencial perda de conectividade. Os usuários devem entender as escolhas com base apenas no título e no texto do botão.

Se um título é necessário:

- Use uma pergunta ou declaração clara com uma explicação na área de conteúdo, como "Apagar dados do USB?".
- Evite desculpas, ambiguidade ou sentenças como "Aviso!" ou "Você tem certeza?"

{{"demo": "AlertDialog.js"}}

## Transições

Você também pode trocar a transição, o próximo exemplo utiliza `Slide`.

{{"demo": "AlertDialogSlide.js"}}

## Formulário de diálogo

Os formulários de diálogo permitem que usuários preencham campos dentro de um diálogo. Por exemplo, se seu site solicita aos inscritos que preencham um endereço de e-mail, eles poderão preencher o campo de e-mail e tocar em "Enviar".

{{"demo": "FormDialog.js"}}

## Diálogos customizados

Aqui está um exemplo de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

O diálogo tem um botão de fechar para facilitar a utilização.

{{"demo": "CustomizedDialogs.js"}}

## Diálogos em tela cheia

{{"demo": "FullScreenDialog.js"}}

## Tamanhos opcionais

Você pode definir uma largura máxima usando um enumerador na propriedade `maxWidth` combinando com a propriedade booleana `fullWidth`. Quando a propriedade `fullWidth` for verdadeira, a caixa de diálogo será adaptada com base no valor definido em `maxWidth`.

{{"demo": "MaxWidthDialog.js"}}

## Tela cheia responsiva

You may make a dialog responsively full screen using [`useMediaQuery`](/material-ui/react-use-media-query/).

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return <Dialog fullScreen={fullScreen} />;
}
```

{{"demo": "ResponsiveDialog.js"}}

## Diálogos de confirmação

Os diálogos de confirmação exigem que os usuários confirmem explicitamente suas escolhas antes que uma opção seja confirmada. Por exemplo, os usuários podem ouvir vários toques, mas apenas fazer uma seleção final ao tocar em "OK".

Tocar em "Cancelar" em um diálogo de confirmação ou pressionar Voltar, cancela a ação, descarta todas as alterações e fecha o diálogo.

{{"demo": "ConfirmationDialog.js"}}

## Diálogo arrastável

You can create a draggable dialog by using [react-draggable](https://github.com/react-grid-layout/react-draggable). Para fazer isso, você deve passar o componente importado `Draggable` como `PaperComponent` do componente `Dialog`. Isso fará com que todo o diálogo seja arrastável.

{{"demo": "DraggableDialog.js"}}

## Rolagem de conteúdo longo

Quando diálogos ficam muito grandes para a tela do usuário ou dispositivo, a rolagem é habilitada.

- `scroll=paper` o conteúdo do diálogo rola dentro do elemento.
- `scroll=body` o conteúdo do diálogo rola dentro do corpo da página.

Experimente a demonstração abaixo para ver o que queremos dizer:

{{"demo": "ScrollDialog.js"}}

## Performance

Follow the [Modal performance section](/material-ui/react-modal/#performance).

## Limitações

Follow the [Modal limitations section](/material-ui/react-modal/#limitations).

## Complementary projects

### Material UI Confirm

![stars](https://img.shields.io/github/stars/jonatanklosko/material-ui-confirm) ![npm downloads](https://img.shields.io/npm/dm/material-ui-confirm.svg)

This package provides dialogs for confirming user actions without writing boilerplate code.

## Accessibility

Follow the [Modal accessibility section](/material-ui/react-modal/#accessibility).
