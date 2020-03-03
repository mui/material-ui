---
title: Composant React Liste
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Lists (Listes)

<p class="description">Les listes sont continues, des index verticaux de texte ou d’images.</p>

[Les listes](https://material.io/design/components/lists.html) sont des groupes successifs de textes ou d'images. Ils sont composés d'items contenant les actions primaires ou secondaires, représentées par des icônes et/ou du texte.

## Liste simple

{{"demo": "pages/components/lists/SimpleList.js", "bg": true}}

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

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## Liste en répertoires

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## Interactif

Vous trouverez ci-dessous une démo interactive vous permettant d'explorer les résultats visuels utilisant différents paramètres:

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## Sélection d'élément de liste

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Alignement d'élément de liste

Vous devez modifier l'alignement des éléments de la liste lorsque vous affichez 3 lignes ou plus, définissez la propriété `alignItems = "flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## Liste et contrôles

### Case à cocher

Une case à cocher peut être une action principale ou secondaire.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

La case à cocher est l'action secondaire pour un élément de liste et une cible distincte.

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Interrupteur (switch)

Le commutateur (switch) est l'action secondaire et une cible distincte.

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Épingler les sous-entêtes

Lors du défilement, les sous-en-têtes restent épinglés en haut de l'écran jusqu'à ce qu'ils soient déplacés en dehors de l'écran par le prochain en-tête.

This feature relies on CSS sticky positioning. Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the supported browsers. It defaults to `disableSticky` when not supported.

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## Liste Insets

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Liste virtualisée

Dans l'exemple suivant, nous montrons comment utiliser [react-virtualized](https://github.com/bvaughn/react-window) avec le composant `List`. Il affiche 200 lignes et peut facilement gérer plus. La virtualisation aide à résoudre les problèmes de performances.

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged. If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso).

## Personnalisation

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/menu-list).