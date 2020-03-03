---
title: Tree View React component
components: TreeView, TreeItem
---

# Иерархическое представление

<p class="description">Виджет Иерархического представления представляет собой иерархический список.</p>

Иерархические представления могут использоваться для того чтобы показать структуру файловой системы. Каждый элемент может быть раскрыт, чтобы показать содержание папки, в которой могут быть файлы, папки или и то и другое.

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}

## Controlled

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

### Пользовательские иконки, границы и анимации

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Gmail клон

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.