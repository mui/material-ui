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

S'ils sont utilisés pour la sélection d'élément, lorsqu'ils sont ouverts, les menus simples tentent d'aligner verticalement l'élément de menu actuellement sélectionné avec l'élément d'ancrage, et la mise au point initiale sera placée sur l'élément de menu sélectionné. L'élément de menu actuellement sélectionné est défini à l'aide de la propriété `selected` (à partir de [ListItem](/api/list-item/)). Pour utiliser un élément de menu sélectionné sans affecter la mise au point initiale ou le positionnement vertical du menu, définissez la propriété `variant` à `menu`.

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Composition de MenuList

Le composant `Menu` utilise le composant `Popover` en interne. Cependant, vous voudrez peut-être utiliser une stratégie de positionnement différente ou ne pas bloquer le défilement. Pour répondre à ces besoins, nous exposons un composant `MenuList` que vous pouvez composer, avec `Popper` dans cet exemple.

La responsabilité principale du composant `MenuList` est de gérer le focus.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Menus personnalisés

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides (surcharges)](/customization/components/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

Le `MenuItem` est un wrapper autour de `ListItem` avec quelques styles supplémentaires. Vous pouvez utiliser les mêmes fonctionnalités de composition de liste avec le composant `MenuItem`:

## Hauteur maximale des menus

Si la hauteur d'un menu empêche l'affichage de tous les éléments du menu, le menu peut défiler en interne.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Limites

Il y a [un bug flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) qui empêche `text-overflow: ellipsis` de fonctionner dans une mise en page flexbox. Vous pouvez utiliser le composant `Typography` avec `noWrap` pour contourner ce problème:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Changer la transition

Utilisez une transition différente.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Menu contextuel

Voici un exemple de menu contextuel. (Clic droit pour ouvrir.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des projects suivants:

### Assistant PopupState

Il existe un package tiers [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) qui gère l’état du menu pour vous dans la plupart des cas.

{{"demo": "pages/components/menus/MenuPopupState.js"}}