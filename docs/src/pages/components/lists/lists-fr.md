---
title: Composant React Liste
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Lists (Listes)

<p class="description">Les listes sont continues, des index verticaux de texte ou d’images.</p>

[Les listes](https://material.io/design/components/lists.html) sont des groupes successifs de textes ou d'images. Ils sont composés d'items contenant les actions primaires ou secondaires, représentées par des icônes et/ou du texte.

## Liste simple

{{"demo": "pages/components/lists/SimpleList.js"}}

Le dernier élément de la démonstration précédente montre comment vous pouvez créer un lien:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

Vous pouvez trouver une [démonstration avec la bibliothèque React Router en suivant cette section](/guides/composition/#react-router) de la documentation.

## Liste imbriquée

{{"demo": "pages/components/lists/NestedList.js"}}

## Liste en répertoires

{{"demo": "pages/components/lists/FolderList.js"}}

## Interactif

Vous trouverez ci-dessous une démo interactive vous permettant d'explorer les résultats visuels utilisant différents paramètres:

{{"demo": "pages/components/lists/InteractiveList.js"}}

## Sélection d'élément de liste

{{"demo": "pages/components/lists/SelectedListItem.js"}}

## Alignement d'élément de liste

Vous devez modifier l'alignement des éléments de la liste lorsque vous affichez 3 lignes ou plus, définissez la propriété `alignItems = "flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js"}}

## Liste et contrôles

### Case à cocher

Une case à cocher peut être une action principale ou secondaire.

La case à cocher est l'action principale et l'indicateur d'état pour l'élément de liste. Le bouton de commentaire est une action secondaire et une cible distincte.

{{"demo": "pages/components/lists/CheckboxList.js"}}

La case à cocher est l'action secondaire pour un élément de liste et une cible distincte.

{{"demo": "pages/components/lists/CheckboxListSecondary.js"}}

### Interrupteur (switch)

Le commutateur (switch) est l'action secondaire et une cible distincte.

{{"demo": "pages/components/lists/SwitchListSecondary.js"}}

## Épingler les sous-entêtes

Lors du défilement, les sous-en-têtes restent épinglés en haut de l'écran jusqu'à ce qu'ils soient déplacés en dehors de l'écran par le prochain en-tête.

Cette fonctionnalité repose sur le positionnement persistant (sticky) de CSS. Malheureusement, cette propriété [n'est pas implémentée](https://caniuse.com/#search=sticky) par tous les navigateurs que nous supportons. Nous avons par défaut désactivé cette fonction à l'aide de `disableSticky` lorsqu'il n'est pas pris en charge.

{{"demo": "pages/components/lists/PinnedSubheaderList.js"}}

## Liste Insets

{{"demo": "pages/components/lists/InsetList.js"}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component. Il affiche 200 lignes et peut facilement gérer plus. La virtualisation aide à résoudre les problèmes de performances.

{{"demo": "pages/components/lists/VirtualizedList.js"}}