---
title: React 列表组件
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# 列表

<p class="description">列表是文本或图像的连续、垂直索引。</p>

[列表](https://material.io/design/components/lists.html) 是一组连续的文本或图像。 它们由包含主要和补充操作的项目组成，这些操作由图标和文本表示。

## 简易列表

{{"demo": "pages/demos/lists/SimpleList.js"}}

上一个样例的最后一项展示了如何渲染一个链接：

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

你可以从这里查看[React Router与文档此部分结合使用的相关样例](/guides/composition/#react-router)

## Nested List

{{"demo": "pages/demos/lists/NestedList.js"}}

## Folder List

{{"demo": "pages/demos/lists/FolderList.js"}}

## 交互式

下面是一个交互式演示，可让您探索不同设置的可视结果：

{{"demo": "pages/demos/lists/InteractiveList.js"}}

## 可选的 ListItem

{{"demo": "pages/demos/lists/SelectedListItem.js"}}

## Align list items

You should change the list item alignment when displaying 3 lines or more, set the `alignItems="flex-start"` property.

{{"demo": "pages/demos/lists/AlignItemsList.js"}}

## 列表控件

### 复选框

复选框可以是主操作或辅助操作。

复选框是列表项的主要操作和状态指示器。 评论按钮是辅助操作和单独的目标。

{{"demo": "pages/demos/lists/CheckboxList.js"}}

复选框是列表项的辅助操作和单独的目标。

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### 开关

开关是辅助操作和单独的目标。

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## Pinned Subheader List

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.

This feature is relying on the CSS sticky positioning. Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the browsers we are supporting. We default to `disableSticky` when not supported.

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## Inset List

{{"demo": "pages/demos/lists/InsetList.js"}}