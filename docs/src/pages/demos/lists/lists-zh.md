---
title: React 列表组件
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# 列表

<p class="description">列表是文本或图像的连续、垂直索引。</p>

[列表](https://material.io/design/components/lists.html) 是一组连续的文本或图像。 它们由包含主要和补充操作的项目组成，这些操作由图标和文本表示。

## 简易列表

{{"demo": "pages/demos/lists/SimpleList.js"}}

The last item of the previous demo shows how you can render a link:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

You can find a [demo with React Router following this section](/guides/composition/#react-router) of the documentation.

## 文件夹列表

{{"demo": "pages/demos/lists/FolderList.js"}}

## 嵌入列表

{{"demo": "pages/demos/lists/InsetList.js"}}

## 嵌套列表

{{"demo": "pages/demos/lists/NestedList.js"}}

## 可选的 ListItem

{{"demo": "pages/demos/lists/SelectedListItem.js"}}

## 固定 Subheader 列表

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.

This feature is relying on the CSS sticky positioning. Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the browsers we are supporting. We default to `disableSticky` when not supported.

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## 列表控件

### 复选框

A checkbox can either be a primary action or a secondary action.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/demos/lists/CheckboxList.js"}}

The checkbox is the secondary action for the list item and a separate target.

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### 开关

The switch is the secondary action and a separate target.

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## 交互式

下面是一个交互式演示，可让您探索不同设置的可视结果：

{{"demo": "pages/demos/lists/InteractiveList.js"}}