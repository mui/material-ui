---
title: React Transfer List（传递列表）组件
components: List, ListItem, Checkbox, Switch
githubLabel: 'component: TransferList'
---

# Transfer List 传递列表

<p class="description">使用一个传递列表（或“穿梭框”（shuttle）），用户可以在列表之间移动一个或多个列表项。</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic transfer list

为了完整起见，此示例包括”移动全部”的按钮，但并非每个传传递列表都需要这些。

{{"demo": "pages/components/transfer-list/TransferList.js", "bg": true}}

## Enhanced transfer list

本示例将“移动全部”按钮替换为“全选/不选”复选框，并添加了一个计数器。

{{"demo": "pages/components/transfer-list/SelectAllTransferList.js", "bg": true}}

## Limitations

The component comes with a couple of limitations:

- It only works on desktop. If you have a limited amount of options to select, prefer the [Autocomplete](/components/autocomplete/#multiple-values) component. If mobile support is important for you, have a look at [#27579](https://github.com/mui-org/material-ui/issues/27579).
- There are no high-level components exported from npm. The demos are based on composition. If this is important for you, have a look at [#27579](https://github.com/mui-org/material-ui/issues/27579).
