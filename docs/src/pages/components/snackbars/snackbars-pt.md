---
title: Componente React Snackbar
components: Snackbar, SnackbarContent
---

# Snackbar

<p class="description">Snackbars fornecem mensagens breves sobre os processos de aplicativos. O componente também é conhecido como toast(torrada).</p>

[Snackbars](https://material.io/design/components/snackbars.html) informam aos usuários de um processo que a aplicação realizou ou irá executar. Eles aparecem temporariamente, na parte inferior da tela. Eles não devem interromper a experiência do usuário e não exigem ação do usuário para que desapareça.

Snackbars contêm uma única linha de texto diretamente relacionada à operação realizada. Eles podem conter uma ação de texto, mas não ícones. Você pode usá-los para exibir notificações.

#### Frequência

Apenas um snackbar pode ser exibido por vez.

## Snackbars simples

Um snackbar básico que tem como objetivo reproduzir o comportamento do Google Keep's snackbar.

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## Snackbars personalizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

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

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

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

This example demonstrates how to use [notistack](https://github.com/iamhosseindhv/notistack). notistack has an **imperative API** that makes it easy to display snackbars, without having to handle their open/close state. It also enables you to **stack** them on top of one another (although this is discouraged by the Material Design specification).

{{"demo": "pages/components/snackbars/IntegrationNotistack.js", "defaultCodeOpen": false}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- By default, the snackbar won't auto-hide. However, if you decide to use the `autoHideDuration` prop, it's recommended to give the user [sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) to respond.