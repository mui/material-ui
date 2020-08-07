---
title: Componente React de Visualização em Árvore
components: TreeView, TreeItem
---

# Visualização em árvore

<p class="description">Um modo de visualização em árvore apresentando uma lista hierárquica.</p>

As visualizações em árvore podem ser usadas para representar um navegação no sistema de arquivos para exibir pastas e arquivos, um item representando uma pasta pode ser expandido para revelar o conteúdo da pasta, que pode ser arquivos, pastas ou ambos.

## Modo básico de visualização em árvore

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Seleção múltipla

Visualizações de árvore também suportam seleção múltipla.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

### Visualização em árvore controlada

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