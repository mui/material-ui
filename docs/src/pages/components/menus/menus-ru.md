---
title: Menu React component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# Меню

<p class="description">Меню временно отображают список вариантов.</p>

[Меню](https://material.io/design/components/menus.html) отображает список вариантов на временно видимом элементе интерфейса. Этот элемент появляется, когда пользователи взаимодействуют с кнопкой, действием или другим элементом управления.

## Простое меню

Простые меню по умолчанию открываются над якорным элементом (это поведение можно изменить с помощью props). Находясь вблизи края экрана, простое меню располагается таким образом, чтобы все элементы меню были полностью видны.

Выбор варианта должен в идеале немедленно зафиксировать его и закрыть меню.

**Disambiguation**: In contrast to simple menus, simple dialogs can present additional detail related to the options available for a list item or provide navigational or orthogonal actions related to the primary task. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user’s current context.

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## Выбранные меню

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

`MenuItem` является оберткой `ListItem` с некоторыми дополнительными стилями. С компонентом `MenuItem` можно использовать те же приемы композиции списка:

## Max height menus

Если высота меню препятствует отображению всех пунктов меню, меню можно прокручивать внутри.

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