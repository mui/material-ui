---
title: Componente Menu React
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# Menus

<p class="description">Os menus exibem uma lista de opções em superfícies temporárias.</p>

Um [Menu](https://material.io/design/components/menus.html) exibe uma lista de opções em uma superfície temporária. Elas aparecem quando os usuários interagem com um botão, action, ou outro controle.

## Menu simples

Menus simples abrem sobre o elemento âncora por padrão (esta opção pode ser alterada via props). Quando estão perto de uma borda da tela, menus simples realinham verticalmente para garantir que todos os itens do menu fiquem completamente visíveis.

Choosing an option should immediately ideally commit the option and close the menu.

**Disambiguation**: In contrast to simple menus, simple dialogs can present additional detail related to the options available for a list item or provide navigational or orthogonal actions related to the primary task. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user’s current context.

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## Menus Seleccionados

If used for item selection, when opened, simple menus attempt to vertically align the currently selected menu item with the anchor element. The currently selected menu item is set using the `selected` property (from [ListItem](/api/list-item/)).

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

## MenuList composition

The `Menu` component uses the `Popover` component internally. However, you might want to use a different positioning strategy, or not blocking the scroll. For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## MenuItem Costumizado

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the `MenuItem`.

⚠️ Embora a especificação do design do material incentive o tema, este exemplo está fora do caminho comum.

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

## Max height menus

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"demo": "pages/demos/menus/LongMenu.js"}}

## Limitações

There is [a flexbox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) that prevents `text-overflow: ellipsis` from working in a flexbox layout. You can use the `Typography` component with `noWrap` to workaround this issue:

{{"demo": "pages/demos/menus/TypographyMenu.js"}}

## Change Transition

Use a different transition.

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## Projetos Complementares

Para caso de usos mais avançados, você é capaz de aproveitar de:

### PopupState helper

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of menu state for you in most cases.

{{"demo": "pages/demos/menus/MenuPopupState.js"}}