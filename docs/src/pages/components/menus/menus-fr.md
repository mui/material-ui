---
title: Composant React Menu
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menus

<p class="description">Les menus affichent une liste de choix sur des surfaces temporaires.</p>

Un [Menu](https://material.io/design/components/menus.html) affiche une liste de choix sur une surface temporaire. Il apparaît lorsque l'utilisateur interagit avec un bouton ou un autre contrôle.

## Menu simple

Les menus simples s'ouvrent par défaut sur l'élément d'ancrage (cette option peut être modifiée via les propriétés). Lorsqu'ils sont près du bord de l'écran, les menus simples se réalignent verticalement afin que tous les éléments du menu soient visibles.

Le choix d'une option doit idéalement être validé immédiatement et fermer le menu.

**Désambiguïsation**: Contrairement aux menus simples, les boîtes de dialogue simples peuvent présenter des détails supplémentaires relatifs aux options disponibles pour un élément de la liste ou proposer des actions de navigation ou orthogonales liées à la tâche principale. Bien qu'ils puissent afficher le même contenu, les menus simples sont préférables aux simples dialogues, car les menus simples perturbent moins le contexte actuel de l'utilisateur.

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## Menus sélectionnés

If used for item selection, when opened, simple menus attempt to vertically align the currently selected menu item with the anchor element, and the initial focus will be placed on the selected menu item. L'élément de menu actuellement sélectionné est défini à l'aide de la propriété `selected` (à partir de [ListItem](/api/list-item/)). To use a selected menu item without impacting the initial focus or the vertical positioning of the menu, set the `variant` property to `menu`.

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## MenuList composition

The `Menu` component uses the `Popover` component internally. However, you might want to use a different positioning strategy, or not blocking the scroll. For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menus

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

## Hauteur maximale des menus

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Limites

There is [a flexbox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) that prevents `text-overflow: ellipsis` from working in a flexbox layout. You can use the `Typography` component with `noWrap` to workaround this issue:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Changer la transition

Utilisez une transition différente.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Context menu

Here is an example of a context menu. (Right click to open.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des projects suivants:

### Assistant PopupState

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of menu state for you in most cases.

{{"demo": "pages/components/menus/MenuPopupState.js"}}