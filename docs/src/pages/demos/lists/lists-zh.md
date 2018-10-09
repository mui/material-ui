---
title: React 列表组件
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# 列表

<p class="description">列表是文本或图像的连续、垂直索引。</p>

[列表](https://material.io/design/components/lists.html) 是一组连续的文本或图像。 它们由包含主要和补充操作的项目组成，这些操作由图标和文本表示。

## 简易列表

{{"demo": "pages/demos/lists/SimpleList.js"}}

## 文件夹列表

{{"demo": "pages/demos/lists/FolderList.js"}}

## 嵌入列表

{{"demo": "pages/demos/lists/InsetList.js"}}

## 嵌套列表

{{"demo": "pages/demos/lists/NestedList.js"}}

## 可选的 ListItem

{{"demo": "pages/demos/lists/SelectedListItem.js"}}

## 固定 Subheader 列表

滚动列表时，子标题保持固定在屏幕的顶端，直到被下一个子标题推离屏幕。

此功能依赖于 CSS sticky 定位。 不幸的是, 这一功能并未在我们支持的所有浏览器中 [实现](https://caniuse.com/#search=sticky) 。 如果不支持, 则默认为 `disableSticky`。

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## 列表控件

### 复选框

复选框可以是主操作或辅助操作。

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/demos/lists/CheckboxList.js"}}

The checkbox is the secondary action for the list item and a separate target.

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### Switch

The switch is the secondary action and a separate target.

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/demos/lists/InteractiveList.js"}}