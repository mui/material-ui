---
title: Tree View React component
components: TreeView, TreeItem
---

# Vista de arbol

<p class="description">Un widget de vista de árbol presenta una lista jerárquica.</p>

Tree views can be used to represent a file system navigator displaying folders and files, an item representing a folder can be expanded to reveal the contents of the folder, which may be files, folders, or both.

## Vista básica de árbol

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Selección múltiple

Tree views also support multi selection.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

### Vista de árbol controlada

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

## Vista de árbol personalizada

### Iconos personalizados, bordes y animación

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Clon de Gmail

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

El componente sigue las prácticas de creación de WAI-ARIA.