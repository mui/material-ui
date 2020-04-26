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

### Visualização em árvore controlada

A visualização em árvore também oferece uma API controlada.

{{"demo": "pages/components/tree-view/ControlledTreeView.js"}}

## Objeto rico

Enquanto o componente `TreeView`/`TreeItem` maximiza a flexibilidade, um passo extra é necessário para lidar com um objeto rico.

Vamos considerar uma variável de dados com a seguinte estrutura, a recursão pode ser usada para lidar com este cenário.

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

## Visualização em árvore customizada

### Ícones customizados, borda e animação

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Clone do Gmail

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

O componente segue as práticas de autoria da WAI-ARIA.