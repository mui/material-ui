---
title: Tree View React component
components: TreeView, TreeItem
githubLabel: 'component: TreeView'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#TreeView'
packages: '@material-ui/lab'
---

# Tree View (Vue arborescente)

<p class="description">A tree view widget presents a hierarchical list.</p>

Tree views can be used to represent a file system navigator displaying folders and files, an item representing a folder can be expanded to reveal the contents of the folder, which may be files, folders, or both.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic tree view

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Multi-sélection

L'arborescence prend également en charge la sélection multiple.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

## Controlled tree view

The tree view also offers a controlled API.

{{"demo": "pages/components/tree-view/ControlledTreeView.js"}}

## Rich object

While the `TreeView`/`TreeItem` component API maximizes flexibility, an extra step is needed to handle a rich object.

Let's consider a data variable with the following shape, recursion can be used to handle it.

```js
const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    // …
  ],
};
```

{{"demo": "pages/components/tree-view/RecursiveTreeView.js", "defaultCodeOpen": false}}

## Customized tree view

### Custom icons, border and animation

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Gmail clone

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## Items désactivés

{{"demo": "pages/components/tree-view/DisabledTreeItems.js"}}

Le comportement des items désactivés dépend de la propriété `disabledItemsFocusable`.

Si elle vaut `false`:

- Arrow keys will not focus disabled items and, the next non-disabled item will be focused.
- Typing the first character of a disabled item's label will not focus the item.
- Mouse or keyboard interaction will not expand/collapse disabled items.
- Mouse or keyboard interaction will not select disabled items.
- Shift + arrow keys will skip disabled items and, the next non-disabled item will be selected.
- Programmatic focus will not focus disabled items.

Si elle vaut `true`:

- Arrow keys will focus disabled items.
- Taper le premier caractère du label d'un élément désactivé pour mettre le focus sur l'élément.
- Mouse or keyboard interaction will not expand/collapse disabled items.
- Mouse or keyboard interaction will not select disabled items.
- Shift + arrow keys will not skip disabled items but, the disabled item will not be selected.
- Programmatic focus will focus disabled items.

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.

To have an accessible tree view you must use `aria-labelledby` or `aria-label` to reference or provide a label on the TreeView, otherwise screen readers will announce it as "tree", making it hard to understand the context of a specific tree item.
