---
product: material-ui
title: Transfer list React component
components: List, ListItem, Checkbox, Switch
githubLabel: 'component: transfer list'
---

# Transfer list

<p class="description">使用一个传递列表（或“穿梭框”（shuttle）），用户可以在列表之间移动一个或多个列表项。</p>

为了完整起见，此示例包括”移动全部”的按钮，但并非每个传传递列表都需要这些。

## 简单的传递列表组件

为了完整起见，此示例包括”移动全部”的按钮，但并非每个传传递列表都需要这些。

{{"demo": "TransferList.js", "bg": true}}

## 进阶的传递列表组件

本示例将“移动全部”按钮替换为“全选/不选”复选框，并添加了一个计数器。

{{"demo": "SelectAllTransferList.js", "bg": true}}

## Limitations

The component comes with a couple of limitations:

- It only works on desktop. If you have a limited amount of options to select, prefer the [Autocomplete](/material-ui/react-autocomplete/#multiple-values) component. If mobile support is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
- There are no high-level components exported from npm. The demos are based on composition. If this is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
