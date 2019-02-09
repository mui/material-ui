---
title: React 表格组件
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---
# 表格

<p class="description">数据表显示数据集。它们可以完全自定义。</p>

[数据表格](https://material.io/design/components/data-tables.html)以一种一目了然地方式显示信息，这便于用户发现某些模式和要义。 表格可以被内嵌在主要内容中，如卡片。

数据表格可以包括:

- 相应的可视化
- 导航
- 用于查询和操作数据的工具

在包含工具时, 应将它们直接放在表格的上方或下方。

## 结构

数据表的顶部是标题行，给出各列的名称，后续的各行是表格数据。

如果用户需要选择或操作数据, 则每一行应包含有复选框。

出于可访问性考虑, 表格第一列设置为 `<th>` 元素, 其 `scope` 属性指定为 `"row"`。 这样，屏幕阅读器就可以通过行和列的名字标识某个单元格的值。

## 简单表格

一个没有多余装饰的简单例子

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## 排序和筛选

此示例演示了 `Checkbox ` 和单击选择行的用法, 该表格具有自定义的 `Toolbar`。 该示例使用 `TableSortLabel` 组件来辅助实现列标题的样式效果。

此表已给定了固定宽度以演示水平滚动. 为了防止分页控件滚动, TablePagination 组件在 Table 外部使用. (下面的[自定义表分页操作示例](#custom-table-pagination-action)显示了 TableFooter 中的分页.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## 自定义表格

如果您有阅读[重写样式文档页面](/customization/overrides/) 但你还不是很自信能够完全掌握， 以下是如何更改一个消息条(Tablecell)的主要颜色的示例

⚠️虽然材料设计规范鼓励主题，但这个例子是不合适的。

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## 自定义表格分页行为

`TablePagination` 组件的 `Action` 属性允许实现自定义行为。

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## 跨越表格

一个行 & 列跨越的简单例子

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## 虚拟化表

在下面的示例中，我们演示了如何将 [react-virtualized](https://github.com/bvaughn/react-virtualized) 与 `Table` 组件一起使用。 它渲染了200行，可以轻松处理更多行。

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## 补充项目

对于更高级的用例，您可以利用：

- [ dx-react-grid-material-ui ](https://devexpress.github.io/devextreme-reactive/react/grid/) Material-UI 的一种数据表格, 具有分页，排序功能, 过滤, 分组和编辑功能([自定义许可](https://js.devexpress.com/licensing/))。
- [mui-datatables](https://github.com/gregnb/mui-datatables) Material-UI 的响应式数据表格,包括过滤,排序,搜索等功能.
- - [material-table](https://github.com/mbrn/material-table) DataTable 是基于表格组件, 具有搜索,过滤,排序等附加功能。
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) 虚拟化的Material-UI表格.