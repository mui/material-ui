---
title: React Table（表格）组件
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table（表格）

<p class="description">Data tables display sets of data. They can be fully customized.</p>

[数据表格](https://material.io/design/components/data-tables.html)以一种一目了然地方式显示信息，这便于用户寻找一些规律和深入的见解。 表格可以被内嵌在主要内容中，如 cards（卡片）。

数据表格可以包括这些：

- 相应的可视化
- 导航
- 用于查询和操作数据的工具

在包含工具时，我们应将它们直接放在表格的上方或下方。

## 结构

一个数据表的顶部是标题行，给出各列的名称，后续的各行是表格数据。

如果用户需要选择或操作数据，则每一行应包含有复选框。

考虑到可及性，我们应该将表格的第一列设置为 `<th>` 元素，而它带有了一个指定为 `"row"` 的 `scope` 属性。 这样，屏幕阅读器就可以通过行和列的名字标识某个单元格的值。

## 简单表格

一个没有多余装饰的简单例子。

{{"demo": "pages/components/tables/SimpleTable.js"}}

## Dense Table（紧凑表格）

一个没有多余修饰的简单紧凑型表格。

{{"demo": "pages/components/tables/DenseTable.js"}}

## 排序& 筛选

此示例演示了 ` Checkbox（选择框）` 和单击选择行的用法, 该表格具有自定义的 `Toolbar（工具条）`。 该示例使用 `TableSortLabel` 组件来辅助实现列标题的样式效果。

此表已被赋予固定宽度，这样能够展示水平方向的滚动。 在表格外部使用 TablePagination 组件，能够防止分页控件的滚动。 (以下的['Custom Table Pagination Action' （自定义表分页操作示例）](#custom-table-pagination-action)展示了 TableFooter 中的分页。)

{{"demo": "pages/components/tables/EnhancedTable.js"}}

## 自定义表格

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## 自定义表格的分页操作

`TablePagination` 组件的 `Action` 属性允许实现自定义行为。

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js"}}

## Spanning Table

A simple example with spanning rows & columns.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Virtualized Table

In the following example, we demonstrate how to use [react-virtualized](https://github.com/bvaughn/react-virtualized) with the `Table` component. 它渲染了200行，可以轻松处理更多行。 可视化优化了整体的性能。

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) is a simple and powerful Datatable for React based on Material-UI Table with some additional features. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### 其他

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.