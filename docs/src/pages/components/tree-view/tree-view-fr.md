---
title: Tree View React component
components: TreeView, TreeItem
---

# Tree View (Vue arborescente)

<p class="description">A tree view widget presents a hierarchical list.</p>

Tree views can be used to represent a file system navigator displaying folders and files, an item representing a folder can be expanded to reveal the contents of the folder, which may be files, folders, or both.

## Basic tree view

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Multi selection

Tree views also support multi selection.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

### Controlled tree view

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

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.