---
title: Table React component
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tables

<p class="description">Data tables display sets of data. They can be fully customized.</p>

[Data tables](https://material.io/design/components/data-tables.html) display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.

Data tables can include:

- A corresponding visualization
- Navigation
- Tools to query and manipulate data

When including tools, they should be placed directly above or below the table.

## Structure

A data table contains a header row at the top that lists column names, followed by rows for data.

Checkboxes should accompany each row if the user needs to select or manipulate data.

For accessibility, the first column is set to be a `<th>` element, with a `scope` of `"row"`. This enables screen readers to identify a cell's value by it's row and column name.

## Simple Table

A simple example with no frills.

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## Sorting & Selecting

This example demonstrates the use of `Checkbox` and clickable rows for selection, with a custom `Toolbar`. It uses the `TableSortLabel` component to help style column headings.

The Table has been given a fixed width to demonstrate horizontal scrolling. In order to prevent the pagination controls from scrolling, the TablePagination component is used outside of the Table. (The ['Custom Table Pagination Action' example](#custom-table-pagination-action) below shows the pagination within the TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Customized Tables

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in,
here are examples of how you can change the look of a `TableCell`.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Custom Table Pagination Action

The `Action` property of the `TablePagination` component allows the implementation of
custom actions.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Spanning Table

A simple example with spanning rows & columns.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Virtualized Table

In the following example, we demonstrate how to use [react-virtualized](https://github.com/bvaughn/react-virtualized) with the `Table` component. It renders 200 rows and can easily handle more.

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## Complementary projects

For more advanced use cases you might be able to take advantage of:

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive data tables for Material-UI with filtering, sorting, search and more.
- [material-table](https://github.com/mbrn/material-table) DataTable based on table component with additional features like search, filtering, sorting and much more.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Virtualized Material-UI table.
