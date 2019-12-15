---
title: Data Grid - Rows
components: DataGrid
---

# Data Grid - Rows

<p class="description">A fast and extendable data table and data grid for React. It's a feature-rich compoent available in MIT or Enterprise versions.</p>

## Row sorting

### Enable sorting

You can enable sorting by setting the `sortable` option.
Then sort a column by clicking on the column header.

```jsx
<DataGrid
  columns={[
    { field: 'name', sortable: true },
    { field: 'phone' },
  ]}
/>
```

To enable sorting for all columns, set `sorting` in the default column definition.

```jsx
<DataGrid
  columns={[
    { field: 'name' },
    { field: 'phone' },
  ]}
  defaultColumnOptions={{ sortable: true }}
/>
```

{{"demo": "pages/components/data-grid/rows/RowSorting.js", "bg": "inline"}}

### Multi-column sorting

You can sort multiple by columns at the same time. Hold the `Shift` key down while clicking the column header.

### Custom sorting

You can customize the comparison function with the `sortingCompartor` option.
For instance, a column might have date strings as the row data.

{{"demo": "pages/components/data-grid/rows/CustomSorting.js", "bg": "inline"}}

### Sorting order

By default, the sorting order loops between these tree different modes:

```js
const sortingOrder = ['asc', 'desc', null];
```

In practice, when you click a column that is not sorted, it will sort ascending (`asc`).
The next click will make it sort descending (`desc`).
Another click will remove the sort (`null`).

You can provide a custom `sortingOrder` value to customize this behavior.

### Controllable sort

You can control the sort from the outside. The component supports tree props to do so:

- `defaultSorting`: the default sorting state (uncontrolled).
- `sorting`: the sorting state (controlled).
- `onSortingChange`: a callback fired when the user change the column sort.

### Benchmark

- https://ag-grid.com/javascript-grid-sorting/
- https://vuetifyjs.com/en/components/data-tables#external-sorting
- https://www.telerik.com/kendo-react-ui/components/grid/sorting/
- https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/sorting/
- http://schrodinger.github.io/fixed-data-table-2/example-sort.html
- https://ant.design/components/table/#components-table-demo-head
- https://ej2.syncfusion.com/react/demos/#/material/grid/sorting

## Row reorder

- https://ag-grid.com/javascript-grid-row-dragging/
- https://www.telerik.com/kendo-react-ui/components/grid/advanced-features/row-reordering/
- https://ant.design/components/table/#components-table-demo-drag-sorting
- https://ej2.syncfusion.com/react/demos/#/material/grid/drag-drop-within-grid

## Row spanning

- https://ag-grid.com/javascript-grid-row-spanning/
- https://ej2.syncfusion.com/react/demos/#/material/grid/row-spanning
- https://ant.design/components/table/#components-table-demo-colspan-rowspan
