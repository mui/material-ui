---
title: Componente React Popover
components: Grow, Popover
---

# Popover

<p class="description">Um Popover pode ser usado para exibir algum conteúdo em cima do outro.</p>

Coisas para saber ao usar o componente `Popover`:

- O componente é construído sobre o componente [`Modal`](/components/modal/).
- A rolagem e o clique fora não é permitido, ao contrário do componente [`Popper`](/components/popper/).

## Popover Simples

{{"demo": "pages/components/popover/SimplePopover.js" }}

## Âncora - Exemplo interativo

Use os botões de opção para ajustar as posições `anchorOrigin` e `transformOrigin`. Você também pode definir `anchorReference` para `anchorPosition` ou `anchorEl`. Quando configurado com `anchorPosition`, o componente irá, ao contrário de `anchorEl`, basear se nas propriedades do `anchorPosition`, na qual você pode ajustar para definir a posição do popover.

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideToolbar": true}}

## Interação mouse em cima

Este exemplo demonstra como usar o componente `Popover` para implementar um comportamento popover baseado no evento mouse over.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## Projetos Complementares

Para situações de uso mais avançadas, você pode tirar proveito com:

### PopupState helper

Existe um pacote de terceiros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que cuida do estado popover para você na maioria das situações.

{{"demo": "pages/components/popover/PopoverPopupState.js"}}