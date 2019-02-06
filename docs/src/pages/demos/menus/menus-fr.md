---
title: Composant React Menu
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# Menus

<p class="description">Les menus affichent une liste de choix sur des surfaces temporaires.</p>

Un [Menu](https://material.io/design/components/menus.html) affiche une liste de choix sur une surface temporaire. Ils apparaissent lorsque les utilisateurs interagissent avec un bouton, une action ou un autre contrôle.

## Menu simple

Les menus simples s'ouvrent par défaut sur l'élément d'ancrage (cette option peut être modifiée via les propriétés). When close to a screen edge, simple menus vertically realign to make sure that all menu items are completely visible.

Le choix d'une option doit idéalement être validé immédiatement et fermer le menu.

**Désambiguïsation**: Contrairement aux menus simples, les boîtes de dialogue simples peuvent présenter des détails supplémentaires relatifs aux options disponibles pour un élément de la liste ou proposer des actions de navigation ou orthogonales liées à la tâche principale. Bien qu'ils puissent afficher le même contenu, les menus simples sont préférables aux simples dialogues, car les menus simples perturbent moins le contexte actuel de l'utilisateur.

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## Menus sélectionnés

S'ils sont utilisés pour la sélection d'éléments, les menus simples, une fois ouverts, tentent d'aligner verticalement l'élément de menu sélectionné avec l'élément d'ancrage. L'élément de menu actuellement sélectionné est défini à l'aide de la propriété `selected` (à partir de [ListItem](/api/list-item/)).

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

## MenuList composition

The `Menu` component uses the `Popover` component internally. However, you might want to use a different positioning strategy, or not blocking the scroll. For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## MenuItem personnalisé

Si vous avez lu la page de documentation [sur les personnalisations](/customization/overrides/) mais que vous n'êtes pas prêt à vous lancer, voici un exemple de la façon dont vous pouvez personnaliser le `MenuItem`.

⚠️ Bien que la spécification material encouragent la thématisation, cet exemple sort des sentiers battus.

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

Le `MenuItem` est un wrapper autour de `ListItem` avec quelques styles supplémentaires. Vous pouvez utiliser les mêmes fonctionnalités de composition de liste avec le composant `MenuItem`:

## Hauteur maximale des menus

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"demo": "pages/demos/menus/LongMenu.js"}}

## Render Props

It is a [render props](https://reactjs.org/docs/render-props.html) demo that keeps track of the local state for a single menu.

{{"demo": "pages/demos/menus/RenderPropsMenu.js"}}

## Limites

There is [a flexbox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) that prevents `text-overflow: ellipsis` from working in a flexbox layout. You can use the `Typography` component with `noWrap` to workaround this issue:

{{"demo": "pages/demos/menus/TypographyMenu.js"}}

## Changer la transition

Utilisez une transition différente.

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## Projets complémentaires

Pour un usage plus avancé cas, vous pourriez être en mesure de prendre avantage de:

### Assistant PopupState

Il existe un package tiers [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) qui gère l’état du menu pour vous dans la plupart des cas.

{{"demo": "pages/demos/menus/MenuPopupState.js"}}