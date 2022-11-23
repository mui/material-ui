---
product: base
title: Unstyled React Table Pagination component
components: TablePaginationUnstyled
githubLabel: 'component: TablePagination'
---

# Unstyled table pagination

<p class="description">Table pagination is an interface tool for splitting up large amounts of data to make it easier for users to navigate.</p>

## Introduction

The `TablePaginationUnstyled` component lets you add pagination controls to a table. It controls two properties of its parent table:

- displayed page index
- number of rows per page

`TablePaginationUnstyled` renders its internal elements in a `<td>` tag by default so it can be inserted into a table's `<tr>`. You can use the `component` or `components.Root` prop to render a different root element—for example, if you need to place the pagination controls outside of the table. See the [Slot props section](#slot-props) for details.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

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

### Basics

The following demo shows an example of customized table pagination controls in a table footer that spans the entire row:

{{"demo": "TableUnstyled.js"}}

### Anatomy

The `TablePaginationUnstyled` component is composed of a root `<td>` that houses up to ten interior slots:

- toolbar
- spacer
- selectLabel
- selectRoot
- select
- selectIcon
- input
- menuItem
- displayedRows
- actions

```html
<td class="MuiTablePaginationUnstyled-root">
  <div class="MuiTablePaginationUnstyled-toolbar">
    <div class="MuiTablePaginationUnstyled-spacer"></div>
    <p class="MuiTablePaginationUnstyled-selectLabel" id="mui-48">Rows per page:</p>
    <select class="MuiTablePaginationUnstyled-select">
      <option class="MuiTablePaginationUnstyled-menuItem">All</option>
    </select>
    <p class="MuiTablePaginationUnstyled-displayedRows">1–5 of 13</p>
    <div class="MuiTablePaginationUnstyled-actions">
      <button disabled="" aria-label="Go to first page" title="Go to first page">
        <span>|⇽</span>
      </button>
      <button
        disabled=""
        aria-label="Go to previous page"
        title="Go to previous page"
      >
        <span>⇽</span>
      </button>
      <button aria-label="Go to next page" title="Go to next page">
        <span>⇾</span>
      </button>
      <button aria-label="Go to last page" title="Go to last page">
        <span>⇾|</span>
      </button>
    </div>
  </div>
</td>
```

### Slot props

:::info
The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<TablePaginationUnstyled component="div" />
```

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<TablePaginationUnstyled components={{ Root: 'div', Toolbar: 'nav' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-spacer` to the spacer slot:

```jsx
<TablePaginationUnstyled componentsProps={{ spacer: { className: 'my-spacer' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

## Customization

### Custom pagination options

You can customize the options shown in the **Rows per page** select using the `rowsPerPageOptions` prop. This prop requires an array of either numbers or objects:

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
