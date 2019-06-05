---
title: Componente React Snackbar
components: Snackbar, SnackbarContent
---

# Snackbar

<p class="description">Snackbars fornecem mensagens breves sobre processos da aplicação - normalmente na parte inferior da tela.</p>

[Snackbars](https://material.io/design/components/snackbars.html) informam aos usuários de um processo que a aplicação realizou ou irá executar. Eles aparecem temporariamente, na parte inferior da tela. Eles não devem interromper a experiência do usuário e não exigem ação do usuário para que desapareça.

Snackbars contêm uma única linha de texto diretamente relacionada à operação realizada. Eles podem conter uma ação de texto, mas não ícones. Você pode usá-los para exibir notificações.

#### Frequência

Apenas um snackbar pode ser exibido por vez.

## Snackbars simples

Um snackbar básico que tem como objetivo reproduzir o comportamento do Google Keep's snackbar.

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## Snackbars personalizados

Aqui estão alguns exemplos de personalização do componente. Você pode aprender mais sobre isso na [página de documentação de substituições](/customization/components/).

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## Snackbars posicionados

Pode haver circunstâncias em que vão ser necessárias maior flexibilidade na colocação da snackbar.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## Comprimento da Mensagem

Alguns snackbars com tamanho variável de mensagem.

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Transições

### Snackbars Consecutivos

Quando várias atualizações de snackbar são necessárias, elas devem aparecer uma por vez.

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars e botões de ação flutuante (BAFs)

Snackbars devem aparecer acima de BAFs (no mobile).

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### Modificando a transição

[Grow](/components/transitions/#grow) é a transição padrão, mas você pode usar uma diferente.

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### Controle de direção do Slide

Você pode alterar a direção da transição do [Slide](/components/transitions/#slide).

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

### notistack

![estrelas](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

No exemplo a seguir, demonstramos como usar [notistack](https://github.com/iamhosseindhv/notistack). O notistack facilita a exibição de snackbars (para que você não tenha que lidar com o estado de abertura / fechamento delas). Também permite empilhá-los uns sobre os outros (mas não recomendamos devido a especificação).

{{"demo": "pages/components/snackbars/IntegrationNotistack.js"}}