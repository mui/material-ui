---
title: React Table（表格）组件
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

## 基础表格

一个没有多余装饰的简单例子

{{"demo": "pages/components/tables/BasicTable.js", "bg": true}}

## 数据表格

`Table` 组件与原生 `<table>` 元素存在密切关联。 这种限制条件导致要构建丰富的数据表格会变得很有挑战性。

[`DataGrid` 组件](/components/data-grid/) 专为需要处理大量表格数据的情况而设计。 虽然它的结构相比之下不够灵活，但是有失必有得，牺牲灵活性来换取更强大的功能。 

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## 紧凑型表格

这是一个简单紧凑型表格，并且没有多余的装饰。

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## 排序 & 选择

此示例演示了在表格内使用了 ` 选择框组件（Checkbox）` 以及单击选择行，而且这个表格带有一个自定义的 `工具条组件（Toolbar）`。 它也展示了如何使用 `TableSortLabel` 组件来给列标题添加样式。

这个表格已被赋予一个固定的宽度，您可以查看如何实现横向滚动。 在表格外部使用 TablePagination 组件，能够防止分页控件的滚动。 (以下的['Custom Table Pagination Action' （自定义表分页操作示例）](#custom-pagination-actions)展示了 TableFooter 中的分页。)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## 自定义表格

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### 自定义的分页选项

通过 `rowsPerPageOptions` 属性，也可以自定义 "Rows per page" 选择中显示的选项。 你应该提供以下一种数组：

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

## 无障碍设计

（WAI 教程：https://www.w3.org/WAI/tutorials/tables/）

### Caption 字幕

字幕能够充当表格的表头。 大多数屏幕阅读器能够宣读字幕的内容。 字幕能够帮助用户找到一个表格，并且描述这个表格的内容，从而协助用户决定是不是想继续阅读这个表格。

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}