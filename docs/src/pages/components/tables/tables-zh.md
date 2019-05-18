---
title: React Table（表格）组件
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table（表格）

<p class="description">Data tables（数据表格）用于展示一系列的数据集。表格可以完全自定义开发。</p>

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

以下是自定义组件的一个示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## 自定义表格的分页操作

`TablePagination` 组件的 `Action` 属性允许实现自定义行为。

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Spanning Table（合并的表格）

一个行 & 列跨越的简单例子。

{{"demo": "pages/components/tables/SpanningTable.js"}}

## 大型列表渲染（Virtualized Table）

在下面的示例中，我们演示了如何将 [react-virtualized](https://github.com/bvaughn/react-virtualized) 与 `Table` 组件一起使用。 它渲染了200行，可以轻松处理更多行。 可视化优化了整体的性能。

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### material-table

![评星](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) 是一款 React 的简单且强大的数据库。它基于 Material-UI Table 并且添加了一些额外的功能。 它们支持了不同的用户案例（可编辑，筛选，分组，排序，选择，国际化，树形数据等等）。 您应该看一下。

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### 其他

- [ dx-react-grid-material-ui ](https://devexpress.github.io/devextreme-reactive/react/grid/)：Material-UI 的一种网格数据, 具有分页，排序功能，过滤，分组和编辑功能([自定义许可证](https://js.devexpress.com/licensing/))。
- [mui-datatables](https://github.com/gregnb/mui-datatables)：Material-UI 的响应式数据表格，包括过滤，排序，搜索等功能。