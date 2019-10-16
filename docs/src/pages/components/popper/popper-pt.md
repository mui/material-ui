---
title: Componente React Popper
components: Popper
---

# Popper

<p class="description">Um Popper pode ser usado para exibir algum conteúdo em cima do outro. É uma alternativa para react-popper.</p>

Algumas características importantes do componente `Popper`:

- 🕷 Popper é baseado na biblioteca de terceiros ([Popper.js](https://github.com/FezVrasta/popper.js)) para um posicionamento perfeito.
- 💄 É uma API alternativa para react-popper. Visa a simplicidade.
- 📦 [10 kB gzipped](/size-snapshot) (7 kB do Popper.js).
- O elemento filho [`Portal`](/components/portal/) no corpo do documento, evita problemas de renderização. Você pode desativar esse comportamento com `disablePortal`.
- O scroll não e bloqueado como ocorre com o componente [`Popover`](/components/popover/). O posicionamento do popper é atualizado com a área disponível no visor.
- Clicar fora não oculta o componente `Popper`. Se você precisar desse comportamento, você pode usar o componente [`ClickAwayListener`](/components/click-away-listener/) - veja o exemplo na [seção da documentação do menu](/components/menus/#menulist-composition).
- O `anchorEl` é passado como o objeto de referência para criar uma nova instância `Popper.js`.

## Popper Simples

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Popper Minimalista

Você pode usar o componente sem dependências extras.

{{"demo": "pages/components/popper/MinimalPopper.js"}}

## Rolagem - Exemplo interativo

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideHeader": true}}

## Posicionado Popper

{{"demo": "pages/components/popper/PositionedPopper.js"}}

## Popper sem transição

{{"demo": "pages/components/popper/NoTransitionPopper.js"}}

## Objeto de referência falsificado

A propriedade `anchorEl` pode ser uma referência a um elemento DOM falso. Você só precisa criar um objeto com o formato [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Selecione parte do texto para ver o popper:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

### PopupState helper

Existe um pacote de terceiros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que cuida do estado popover para você na maioria dos casos.

{{"demo": "pages/components/popper/PopperPopupState.js"}}