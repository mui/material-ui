---
product: material-ui
title: Componente React Popper
components: Popper
githubLabel: 'component: Popper'
unstyled: /base/react-popper/
---

# Popper

<p class="description">Um Popper pode ser usado para exibir algum conteúdo em cima do outro. É uma alternativa para react-popper.</p>

Algumas características importantes do componente `Popper`:

- 🕷 Popper é baseado na biblioteca de terceiros ([Popper.js](https://github.com/popperjs/popper-core)) para um posicionamento perfeito.
- 💄 É uma API alternativa para react-popper. Visa a simplicidade.
- 📦 [24.9 kB gzipped](/size-snapshot/).
- The children is [`Portal`](/material-ui/react-portal/) to the body of the document to avoid rendering problems. Você pode desativar esse comportamento com `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/material-ui/react-popover/) component. O posicionamento do popper é atualizado com a área disponível no visor.
- Clicar fora não oculta o componente `Popper`. If you need this behavior, you can use [`ClickAwayListener`](/material-ui/react-click-away-listener/) - see the example in the [menu documentation section](/material-ui/react-menu/#menulist-composition).
- O `anchorEl` é passado como o objeto de referência para criar uma nova instância `Popper.js`.

[A paleta](/system/palette/) com funções de estilo.

## Popper Simples

{{"demo": "SimplePopper.js"}}

## Transições

O estado de aberto/fechado do popper pode ser animado com uma propriedade de renderização do elemento filho e um componente de transição. Este componente deve respeitar as seguintes condições:

- Ser um elemento filho descendente direto de popper.
- Chamar a propriedade de callback `onEnter` quando a transição de entrada iniciar.
- Chamar a propriedade de callback `onExited` quando a transição de saída for concluída. Esses dois callbacks permitem que o popper desmonte o conteúdo filho quando fechado e seja totalmente transitado.

Popper possui suporte interno para [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "TransitionsPopper.js"}}

Alternatively, you can use [react-spring](https://github.com/pmndrs/react-spring).

{{"demo": "SpringPopper.js"}}

## Popper posicionado

{{"demo": "PositionedPopper.js"}}

## Rolagem - Exemplo interativo

{{"demo": "ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## Elemento virtual

A propriedade `anchorEl` pode ser uma referência a um elemento DOM falso. Você precisa criar um objeto com a estrutura definida como [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

Selecione parte do texto para ver o popper:

{{"demo": "VirtualElementPopper.js"}}

## Projetos Complementares

Para situações de uso mais avançadas, você pode tirar proveito com:

### PopupState helper

Existe um pacote de terceiros [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) que cuida do estado popover para você na maioria das situações.

{{"demo": "PopperPopupState.js"}}
