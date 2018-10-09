---
title: Table React component
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---
# 表格

<p class="description">表格用于展示数据集。表格能够很好的进行自定义开发。</p>

[数据表格](https://material.io/design/components/data-tables.html) They can be embedded in primary content, such as cards.

Data tables can include: - A corresponding visualization - Navigation - Tools to query and manipulate data

When including tools, they should be placed directly above or below the table.

## 结构

A data table contains a header row at the top that lists column names, followed by rows for data.

Checkboxes should accompany each row if the user needs to select or manipulate data.

For accessibility, the first column is set to be a `<th>` element, with a `scope` of `"row"`. This enables screen readers to identify a cell's value by it's row and column name.

## 简单表格

A simple example with no frills.

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## 排序&筛选

This example demonstrates the use of `Checkbox` and clickable rows for selection, with a custom `Toolbar`. It uses the `TableSortLabel` component to help style column headings.

The Table has been given a fixed width to demonstrate horizontal scrolling. In order to prevent the pagination controls from scrolling, the TablePagination component is used outside of the Table. (The ['Custom Table Pagination Action' example](#custom-table-pagination-action) below shows the pagination within the TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## 自定义表格分页行为

The `Action` property of the `TablePagination` component allows the implementation of custom actions.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## 自定义表格

You can customize the look and feel of the table by overriding the styles of the `TableCell` component.

{{"演示": "pages/demos/badges/SimpleBadge.js"}}

## Advanced use cases

For more advanced use cases you might be able to take advantage of: - [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)). - [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive data tables for Material-UI with filtering, sorting, search and more. - [material-table](https://github.com/mbrn/material-table) DataTable based on table component with additional features like search, filtering, sorting and much more.