---
title: React Tree View（树视图）组件
components: TreeView, TreeItem
githubLabel: 'component: TreeView'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#TreeView'
packageName: '@mui/lab'
---

# Tree View 树视图

<p class="description">树视图组件能够展现一个分层的列表。</p>

树视图可用来展现一个显示文件夹和文件的文件系统，一个代表文件夹的项目可以展开，此时可以显示文件夹的内容，而这个内容可以是文件，也可以是文件夹，或者两者皆可。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的树视图

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Multi-selection

Tree views also support multi-selection.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

## 可控的树视图

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

{{"demo": "pages/components/tree-view/RichObjectTreeView.js", "defaultCodeOpen": false}}

## ContentComponent 属性

你可以使用 `ContentComponent` 属性和 `useTreeItem` hook 来进一步定制 TreeItem 的行为。

比如限制扩展动作，只能够点击图标。

{{"demo": "pages/components/tree-view/IconExpansionTreeView.js", "defaultCodeOpen": false}}

或者增加状态指示器的宽度：

{{"demo": "pages/components/tree-view/BarTreeView.js", "defaultCodeOpen": false}}

## Customization

### 自定义的图标，边框和动画

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### 仿 Gmail

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## 禁用树项

{{"demo": "pages/components/tree-view/DisabledTreeItems.js"}}

被禁用的树项的行为取决于 `disabledItemsFocusable` 属性。

如果为假（false）：

- 箭头键不会聚焦已禁用的项目，下一个非禁用的项目将会被聚焦。
- 键入所被禁用的项目标签的第一个字符是无法聚焦该项目的。
- 鼠标或键盘交互不会展开/折叠所被禁用的项目。
- 鼠标或键盘交互不会选择所被禁用的项目。
- Shift + 方向键将跳过所被禁用的项目，并且会选择到下一个非禁用的项目。
- 编程焦点将不会聚焦到已禁用的项目。

如果为真（true）：

- 箭头键将会聚焦到已禁用的项目。
- 键入所被禁用的项目标签的第一个字符将聚焦到该项目。
- Mouse or keyboard interaction will not expand/collapse disabled items.
- Mouse or keyboard interaction will not select disabled items.
- Shift + 方向键不会跳过禁用的项目，但是已被禁用项目也不会被选中。
- 编程焦点将会聚焦到已禁用的项目。

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

组件遵循了 WAI-ARIA 授权的一些标准。

如果你想让树视图具有无障碍设计，那么你必须使用 `aria-labelledby` 或 `aria-label` 在树视图上引用或提供标签，否则屏幕阅读器会将其声明为“树（tree）”，从而会使人很难理解特定树项的上下文的含义。
