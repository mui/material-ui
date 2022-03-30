---
product: base
title: React Table pagination component
components: TablePaginationUnstyled
githubLabel: 'component: TablePagination'
packageName: '@mui/base'
---

# Unstyled table pagination

<p class="description">Table pagination lets users navigate through data in tables.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

The TablePaginationUnstyled component controls two table properties: displayed page index and number of rows per page.

By default it renders its internal components wrapped in a `tr` tag, so it's easy to insert it in a table's `tr`. This can be changed, if needed, by supplying the `component` or `components.Root` prop. This way you can place the pagination controls outside of the table.

## Basic TablePaginationUnstyled

{{"demo": "TableUnstyled.js"}}

### Custom pagination options

It's possible to customize the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop. You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.

  ```jsx
  <TablePaginationUnstyled rowsPerPageOptions={[10, 50]} />
  ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for words such as "All").

  ```jsx
  <TablePaginationUnstyled
    rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]}
  />
  ```

## Customized look and feel

{{"demo": "TableCustomized.js"}}
