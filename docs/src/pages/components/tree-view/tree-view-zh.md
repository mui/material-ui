---
title: React 树视图组件
components: TreeView, TreeItem
---

# Tree View 树视图

<p class="description">树视图组件能够展现一个分层的列表。</p>

树视图可用来展现一个显示文件夹和文件的文件系统，一个代表文件夹的项目可以展开，此时可以显示文件夹的内容，而这个内容可以是文件，也可以是文件夹，或者两者皆可。

## 基本的树视图

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## 多种选择

树视图也支持多选。

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

### 可控的树视图

树视图也提供了一个可控制的 API。

{{"demo": "pages/components/tree-view/ControlledTreeView.js"}}

## 丰富的对象

当使用 `TreeView`/`TreeItem` 组件 API 将灵活性最大化时，将需要额外的一步来处理一个丰富的对象。

请参照带有以下形状的一个数据变量，您可以用递归方法来处理它。

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

## 自定义的树视图

### 自定义的图标，边框和动画

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### 仿 Gmail

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

组件遵循了 WAI-ARIA 授权的一些标准。