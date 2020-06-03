---
title: React Tree View 树视图组件
components: TreeView, TreeItem
---

# Tree View 树视图

<p class="description">用树视图，展现出层级关系。</p>

树视图可用来代表文件系统，显示文件夹和文件。每一层可以用来代表文件夹的层次，以显示文件夹的内容。这些层次中的每一层，可以是文件，也可以文件夹。

## 基本树视图

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## 多选

树视图也支持多选。

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

### 受控的树视图

树视图也提供了一个受控的 API。

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

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.