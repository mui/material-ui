---
product: base
title: Unstyled React Table Pagination component
components: TablePaginationUnstyled
githubLabel: 'component: TablePagination'
packageName: '@mui/base'
---

# Unstyled table pagination

<p class="description">Table pagination is an interface tool for splitting up large amounts of data to make it easier for users to navigate.</p>

## Introduction

The `TablePaginationUnstyled` component lets you add pagination controls to a table.
It controls two properties of its parent table:

- displayed page index
- number of rows per page

`TablePaginationUnstyled` renders its internal elements in a `<td>` tag by default so it can be inserted into a table's `<tr>`.
You can use the `component` or `components.Root` prop to render a different root element—for example, if you need to place the pagination controls outside of the table.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Anatomy

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';

export default function MyApp() {
  return (
    <table>
      <tr>
        <TablePaginationUnstyled />
      </tr>
    </table>
  );
}
```

### Basic usage

The following demo shows an example of customized table pagination controls in a table footer that spans the entire row:

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

### Customized look and feel

The following demo shows another example of table pagination controls but with additional style customization:

{{"demo": "TableCustomized.js"}}
