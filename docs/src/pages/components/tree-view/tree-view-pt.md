---
title: Componente React de Visualização em Árvore
components: TreeView, TreeItem
githubLabel: 'component: TreeView'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#TreeView'
packages: '@material-ui/lab'
---

# Visualização em árvore

<p class="description">Um modo de visualização em árvore apresentando uma lista hierárquica.</p>

As visualizações em árvore podem ser usadas para representar um navegação no sistema de arquivos para exibir pastas e arquivos, um item representando uma pasta pode ser expandido para revelar o conteúdo da pasta, que pode ser arquivos, pastas ou ambos.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Modo básico de visualização em árvore

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Seleção múltipla

Visualizações de árvore também suportam seleção múltipla.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

## Visualização em árvore controlada

A visualização em árvore também oferece uma API para controle.

{{"demo": "pages/components/tree-view/ControlledTreeView.js"}}

## Objeto complexo

Enquanto o componente `TreeView`/`TreeItem` maximiza a flexibilidade, um passo extra é necessário para lidar com um objetos complexos.

Vamos considerar uma variável de dados com a seguinte estrutura, a recursão pode ser usada para lidar com este cenário.

```js
const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name:
  ],
};
```

{{"demo": "pages/components/tree-view/RichObjectTreeView.js", "defaultCodeOpen": false}}

## Visualização em árvore customizada

### Ícones customizados, borda e animação

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Clone do Gmail

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## Disabled tree items

{{"demo": "pages/components/tree-view/DisabledTreeItems.js"}}

The behavior of disabled tree items depends on the `disabledItemsFocusable` prop.

If it is false:

- Arrow keys will not focus disabled items and, the next non-disabled item will be focused.
- Typing the first character of a disabled item's label will not focus the item.
- Mouse or keyboard interaction will not expand/collapse disabled items.
- Mouse or keyboard interaction will not select disabled items.
- Shift + arrow keys will skip disabled items and, the next non-disabled item will be selected.
- Programmatic focus will not focus disabled items.

If it is true:

- Arrow keys will focus disabled items.
- Typing the first character of a disabled item's label will focus the item.
- Mouse or keyboard interaction will not expand/collapse disabled items.
- Mouse or keyboard interaction will not select disabled items.
- Shift + arrow keys will not skip disabled items but, the disabled item will not be selected.
- Programmatic focus will focus disabled items.

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

O componente segue as práticas de autoria da WAI-ARIA.

To have an accessible tree view you must use `aria-labelledby` or `aria-label` to reference or provide a label on the TreeView, otherwise screen readers will announce it as "tree", making it hard to understand the context of a specific tree item.
