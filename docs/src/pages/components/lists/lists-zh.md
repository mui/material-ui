---
title: React 列表组件
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# List 列表

<p class="description">列表是对文本或图像的连续、垂直的索引。</p>

[列表](https://material.io/design/components/lists.html) 能够承载一组连续的文本或图像。 它们由包含主要和补充操作的项子集组成，而这些操作由图标和文本表示。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简易列表

{{"demo": "pages/components/lists/SimpleList.js", "bg": true}}

上一个样例的最后一个子集展示了如何渲染一个链接：

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>;
```

你可以从这里查看 [React Router与文档此部分结合使用的相关样例](/guides/composition/#react-router)。

## 嵌套列表

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## 文件夹列表

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## 交互式

下面是一个交互式的演示，你也可以探索不同设置下的视觉结果：

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## 可选的列表子项

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## 对齐列表项

若想显示3行或者更多行时，您应该设置列表项的对齐属性为 `alignItems="flex-start"`。

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## 列表控件

### Checkbox 选择框

一个选择框既可以是主操作，又可以是辅助操作。

选择框执行了主要的操作，也是该列表子项的状态指示器。 而评论按钮则执行了辅助的操作，并且一个单独的目标。

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

该复选框执行了列表项的辅助操作，并且是一个单独的目标。

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Switch 开关

该开关作用为一个辅助操作和一个单独的目标。

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## 固定的副标题列表

在滚动列表时，子标题保持固定在屏幕的顶端，直到被下一个子标题推离屏幕。

此性能由 CSS sticky 位置实现。 可惜的是，这一功能并未在我们支持的所有浏览器中 [实现](https://caniuse.com/#search=sticky) 。 若浏览器不支持，则默认使用 `disableSticky`。

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## 嵌入列表

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## 没有边距的列表

当在一个定义了边距（gutters）的组件中渲染一个列表时，`ListItem` 的边距可以通过 `disableGutters` 来禁用。

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## 大型列表渲染

在下面的示例中，我们演示了如何将 [react-window](https://github.com/bvaughn/react-window) 与 `List` 组件一起使用。 它渲染了200多行，并且可以轻松的延展到更多行。 可视化优化了整体的性能。

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

我们鼓励尽可能使用 [react-window](https://github.com/bvaughn/react-window)。 如果这个库不包括你的用例，你应该考虑使用 [react-virtualized](https://github.com/bvaughn/react-virtualized)，然后使用 [react-virtuoso](https://github.com/petyosi/react-virtuoso)等替代品。

## Customization 个性化

🎨 如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/styles/list-item)。
