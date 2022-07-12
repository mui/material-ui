---
product: base
title: Unstyled React Table Pagination component
components: TablePaginationUnstyled
githubLabel: 'component: TablePagination'
---

# Unstyled table pagination

<p class="description">Table pagination is an interface tool for splitting up large amounts of data to make it easier for users to navigate.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

The `TablePaginationUnstyled` component controls two properties of its parent table:

- displayed page index
- number of rows per page

By default it renders its internal components wrapped in a `<td>` tag, so it can be inserted into a table's `<tr>`.

You can change this default behavior by supplying the `component` or `components.Root` prop.
This is useful it you need to place the pagination controls outside of the table.

## Basic usage

{{"demo": "TableUnstyled.js"}}

### Custom pagination options

You can customize the options shown in the **Rows per page** select using the `rowsPerPageOptions` prop.
This prop requires an array of either numbers or objects:

- **numbers**—each number is used for the option's label and value.

  ```jsx
  <TablePaginationUnstyled rowsPerPageOptions={[10, 50]} />
  ```

- **objects**—the `value` and `label` keys are used, respectively, for the value and label of the option (useful for labels such as **All**).

  ```jsx
  <TablePaginationUnstyled
    rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]}
  />
  ```

## Customized look and feel

{{"demo": "TableCustomized.js"}}
