---
title: Menu React component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# Меню

<p class="description">Menus display a list of choices on temporary surfaces.</p>

A [Menu](https://material.io/design/components/menus.html) displays a list of choices on a temporary surface. They appear when users interact with a button, action, or other control.

## Простое меню

Simple menus open over the anchor element by default (this option can be changed via props). When close to a screen edge, simple menus vertically realign to make sure that all menu items are completely visible.

Choosing an option should immediately ideally commit the option and close the menu.

**Disambiguation**: In contrast to simple menus, simple dialogs can present additional detail related to the options available for a list item or provide navigational or orthogonal actions related to the primary task. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user’s current context.

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## Selected menus

If used for item selection, when opened, simple menus attempt to vertically align the currently selected menu item with the anchor element. The currently selected menu item is set using the `selected` property (from [ListItem](/api/list-item/)).

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

## MenuList composition

The `Menu` component uses the `Popover` component internally. However, you might want to use a different positioning strategy, or not blocking the scroll. For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## Customized MenuItem

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the `MenuItem`.

⚠️ Хотя спецификации материал дизайна поощряют использование тем, эти примеры не соответствуют требованиям.

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

## Max height menus

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"demo": "pages/demos/menus/LongMenu.js"}}

## Ограничения

Существует [ошибка flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437), которая предотвращает работу свойства `text-overflow: ellipsis` внутри flexbox. Вы можете использовать компонент `Typography` с `noWrap`, чтобы обойти эту проблему:

{{"demo": "pages/demos/menus/TypographyMenu.js"}}

## Изменить Transition

Используйте другой transition.

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

### PopupState helper

Существует сторонний пакет [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state), который, в большинстве случаев, заботится о состоянии всплывающего меню за вас.

{{"demo": "pages/demos/menus/MenuPopupState.js"}}