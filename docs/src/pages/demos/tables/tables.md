---
components: Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel
---

# Tables

[Data tables](https://material.google.com/components/data-tables.html) display sets of raw data.
They usually appear in desktop enterprise products.

## Structure

A data table contains a header row at the top that lists column names, followed by rows for data.

Checkboxes should accompany each row if the user needs to select or manipulate data.

## Basic Table

A simple example with no frills.

{{demo='pages/demos/tables/BasicTable.js'}}

## Sorting & Selecting

This example demonstrates the use `Checkbox` and clickable rows for selection with a `Toolbar`.

It uses the `TableSortLabel` component to help style column headings.

{{demo='pages/demos/tables/EnhancedTable.js'}}

## Advanced use cases

For more advanced use cases you might be able to take advantage of [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/). It's a data grid for Material-UI with paging, sorting, filtering, grouping and editing features.
