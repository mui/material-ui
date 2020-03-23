---
title: Componente React de Visualização em Árvore
components: TreeView, TreeItem
---

# Visualização em árvore

<p class="description">Um widget de exibição em árvore apresentando uma lista hierárquica.</p>

As visualizações em árvore podem ser usadas para representar um navegador do sistema de arquivos que exibe pastas e arquivos, um item que representa uma pasta pode ser expandido para revelar o conteúdo da pasta, que pode ser arquivos, pastas ou ambos.

## Modo básico de exibição de árvore

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Seleção múltipla

Visualizações de árvore também suportam seleção múltipla.

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

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.