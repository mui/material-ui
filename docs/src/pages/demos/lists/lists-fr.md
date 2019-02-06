---
title: Composant React Liste
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# Listes (Lists)

<p class="description">Les listes sont des index continus et verticaux de texte ou d’images.</p>

[Lists](https://material.io/design/components/lists.html) are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.

## Liste simplifié

{{"demo": "pages/demos/lists/SimpleList.js"}}

The last item of the previous demo shows how you can render a link:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

You can find a [demo with React Router following this section](/guides/composition/#react-router) of the documentation.

## Nested List

{{"demo": "pages/demos/lists/NestedList.js"}}

## Liste des répertoires

{{"demo": "pages/demos/lists/FolderList.js"}}

## Interactif

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/demos/lists/InteractiveList.js"}}

## Selected ListItem

{{"demo": "pages/demos/lists/SelectedListItem.js"}}

## Align list items

You should change the list item alignment when displaying 3 lines or more, set the `alignItems="flex-start"` property.

{{"demo": "pages/demos/lists/AlignItemsList.js"}}

## Liste des contrôles

### Case à cocher

A checkbox can either be a primary action or a secondary action.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/demos/lists/CheckboxList.js"}}

The checkbox is the secondary action for the list item and a separate target.

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### Interrupteur (switch)

The switch is the secondary action and a separate target.

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## Pinned Subheader List

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.

This feature is relying on the CSS sticky positioning. Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the browsers we are supporting. We default to `disableSticky` when not supported.

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## Inset List

{{"demo": "pages/demos/lists/InsetList.js"}}