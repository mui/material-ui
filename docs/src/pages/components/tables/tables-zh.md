---
title: React 表格组件
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table 表格

<p class="description">表格展示数据组。 它们是完全可以自定义的。</p>

[表格](https://material.io/design/components/data-tables.html)以一目了然的方式显示信息，这样一来用户可以寻找规律并探索见解。 表格可以被内嵌在主要内容中，如 卡片（cards）。

表格可以包括：

- 对应的可视化效果
- 导航
- 一个用于查询和操作数据的工具

当在引入工具时，我们应将它们直接放在表格的上方或下方。

## 表格的结构

一个数据表格的顶部是标题行，并展示各列的名称，而后续的各行则是表格的数据。

若用户想要选择或操作数据，那则应该在每一行加入复选框。

鉴于无障碍设计的考虑，表格的第一栏应该是一个 `<th>` 元素，它附着了 `"row"` 的 `范围` 。 这样一来，屏幕阅读器就可以通过行和列的名字，来定位到某个单元格的值。

## 简单的表格

一个没有多余装饰的简单例子。

{{"demo": "pages/components/tables/SimpleTable.js", "bg": true}}

## 紧凑的表格

这是一个简单紧凑型表格，并且没有多余的装饰。

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## 排序 & 筛选

此示例演示了在表格内使用了 ` 选择框组件（Checkbox）` 以及单击选择行，而且这个表格带有一个自定义的 `工具条组件（Toolbar）`。 它也展示了如何使用 `TableSortLabel` 组件来给列标题添加样式。

这个表格已被赋予一个固定的宽度，您可以查看如何实现横向滚动。 在表格外部使用 TablePagination 组件，能够防止分页控件的滚动。 (以下的['Custom Table Pagination Action' （自定义表分页操作示例）](#custom-pagination-actions)展示了 TableFooter 中的分页。)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## 自定义表格

以下是自定义此组件的一个示例。 您可以在[重写文档页面](/customization/components/)中了解更多有关此内容的信息。

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### 自定义的分页选项

通过 `rowsPerPageOptions` 属性，也可以自定义 "Rows per page" 显示的选择项。 你应该提供以下一种数组：

- **数字（numbers）**，而每个数字用作为选择项的标签（label）和值（value）。
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50]} />
    ```

- **对象（objects）**，而 `value` 和 `label` 键则相应的对照选择项的标签（label）和值（value）（譬如，当有一个语言字符串为“All” 时你会受益匪浅）。
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
    ```

### 自定义表格分页操作

`TablePagination` 组件的 ` ActionsComponent ` 属性能够让您实现一些自定义的行为。

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## 固定表头

一个具有可滚动行和固定表头的表格示例。 它利用了 `stickyheader` 这个属性（⚠️不支持 IE11）。

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## 可折叠的表格

以可扩展行的表格为例，揭示更多信息。 它利用了 [`Collapse`](/api/collapse/) 组件。

{{"demo": "pages/components/tables/CollapsibleTable.js", "bg": true}}

## 跨越表格（Spanning Table）

一个行和列跨越的简单例子。

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## 大型列表渲染（Virtualized Table）

以下例子展示了将 [react-virtualized](https://github.com/bvaughn/react-virtualized) 与 `Table` 组件一起使用的方法。 它渲染了200多行，并且可以轻松的延展到更多行。 可视化优化了整体的性能。

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## 补充项目

对于更高级的用例，您可以利用：

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) 是一款针对 React 的简洁有效的的数据库，它基于 Material-UI Table 并且添加了一些额外的功能。 它们支持了不同的用户案例（可编辑，筛选，分组，排序，选择，国际化，树形数据等等）。 您应该看一下。

{{"demo": "pages/components/tables/MaterialTableDemo.js", "bg": true}}

### 其他的

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/)：针对 Material-UI 的兼并对数据进行排序、搜索、筛选、分组、操作等功能的数据网格（[付费的许可证](https://js.devexpress.com/licensing/)）。
- [mui-datatables](https://github.com/gregnb/mui-datatables)：Material-UI 的响应式数据表格，包括筛选，排序，搜索等功能。
- [tubular-react](https://github.com/unosquare/tubular-react): 一个带有本地或者远程的数据来源的 Material-UI 表格。 它能够对数据进行筛选、排序、自由搜索、导出为本地 CSV 以及汇总。

## 无障碍设计

（WAI 教程：https://www.w3.org/WAI/tutorials/tables/）

### Caption 字幕

字幕能够充当表格的表头。 大多数屏幕阅读器能够宣读字幕的内容。 字幕能够帮助用户找到一个表格，并且描述这个表格的内容，从而协助用户决定是不是想继续阅读这个表格。

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}