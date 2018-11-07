---
title: React 选项卡组件
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---
# 表格

<p class="description">表格用于展示数据集。表格可以被充分定制化。</p>

[数据表格](https://material.io/design/components/data-tables.html)以一种一目了然地方式显示信息，这便于用户发现某些模式和要义。 表格可以被内嵌在主要内容中，如卡片。

Data tables can include:

- A corresponding visualization
- Navigation
- Tools to query and manipulate data

在包含工具时, 应将它们直接放在表格的上方或下方。

## 结构

数据表的顶部是标题行，给出各列的名称，后续的各行是表格数据。

如果用户需要选择或操作数据, 则每一行应包含有复选框。

出于可访问性考虑, 表格第一列设置为 `<th>` 元素, 其 `scope` 属性指定为 `"row"`。 这样，屏幕阅读器就可以通过行和列的名字标识某个单元格的值。

## 简单表格

一个简单例子

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## 排序和筛选

此示例演示了 `Checkbox ` 和单击选择行的用法, 该表格具有自定义的 `Toolbar`。 该示例使用 `TableSortLabel` 组件来辅助实现列标题的样式效果。

此表已给定了固定宽度以演示水平滚动. 为了防止分页控件滚动, TablePagination 组件在 Table 外部使用. (下面的[自定义表分页操作示例](#custom-table-pagination-action)显示了 TableFooter 中的分页.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Spanning Table

A simple example with spanning rows & columns.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Custom Table Pagination Action

The `Action` property of the `TablePagination` component allows the implementation of custom actions.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Customized Tables

You can customize the look and feel of the table by overriding the styles of the `TableCell` component.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Complementary projects

For more advanced use cases you might be able to take advantage of:

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive data tables for Material-UI with filtering, sorting, search and more.
- [material-table](https://github.com/mbrn/material-table) DataTable based on table component with additional features like search, filtering, sorting and much more.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Virtualized Material-UI table.