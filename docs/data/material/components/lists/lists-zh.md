---
product: material-ui
title: React List（列表）组件
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: list'
materialDesign: https://m2.material.io/components/lists
---

# List 列表

<p class="description">列表是对文本或图像的连续、垂直的索引。</p>

列表能够承载一组连续的文本或图像。 它们由包含主要和补充操作的项子集组成，而这些操作由图标和文本表示。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "BasicList.js", "bg": true}}

上一个样例的最后一个子集展示了如何渲染一个链接：

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/material-ui/guides/routing/#list) of the documentation.

## 嵌套列表

{{"demo": "NestedList.js", "bg": true}}

## 文件夹列表

{{"demo": "FolderList.js", "bg": true}}

## 交互式

下面是一个交互式的演示，你也可以探索不同设置下的视觉结果：

{{"demo": "InteractiveList.js", "bg": true}}

## 可选的列表子项

{{"demo": "SelectedListItem.js", "bg": true}}

## 对齐列表项

When displaying three lines or more, the avatar is not aligned at the top. When displaying three lines or more, the avatar is not aligned at the top. You should set the `alignItems="flex-start"` prop to align the avatar at the top, following the Material Design guidelines:

{{"demo": "AlignItemsList.js", "bg": true}}

## 列表控件

### Checkbox 选择框

一个选择框既可以是主操作，又可以是辅助操作。

选择框执行了主要的操作，也是该列表子项的状态指示器。 而评论按钮则执行了辅助的操作，并且一个单独的目标。

{{"demo": "CheckboxList.js", "bg": true}}

该复选框执行了列表项的辅助操作，并且是一个单独的目标。

{{"demo": "CheckboxListSecondary.js", "bg": true}}

### Switch 开关

该开关作用为一个辅助操作和一个单独的目标。

{{"demo": "SwitchListSecondary.js", "bg": true}}

## Sticky subheader

在滚动列表时，子标题保持固定在屏幕的顶端，直到被下一个子标题推离屏幕。 此性能由 CSS sticky 位置实现。 (⚠️ no IE 11 support)

{{"demo": "PinnedSubheaderList.js", "bg": true}}

## 对齐列表项

`inset` 属性可以让没有前导（leading）图标或头像的列表项与有前导图标或头像的项正确对齐。

{{"demo": "InsetList.js", "bg": true}}

## 没有边距的列表

当在一个定义了边距（gutters）的组件中渲染列表时，可以通过 `disableGutters` 来禁用 `ListItem` 的边距。

{{"demo": "GutterlessList.js", "bg": true}}

## 大型列表渲染

在下面的示例中，我们演示了如何将 [react-window](https://github.com/bvaughn/react-window) 与 `List` 组件一起使用。 它渲染了 200 多行，并且可以轻松的延展到更多行。 可视化优化了整体的性能。

{{"demo": "VirtualizedList.js", "bg": true}}

我们鼓励尽可能使用 [react-window](https://github.com/bvaughn/react-window)。 如果这个库不包括你的用例，你应该考虑使用 [react-virtualized](https://github.com/bvaughn/react-virtualized)，然后使用 [react-virtuoso](https://github.com/petyosi/react-virtuoso)等替代品。

## Customized List

你可以参考以下一些例子来自定义组件。 You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedList.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/list-item/).
