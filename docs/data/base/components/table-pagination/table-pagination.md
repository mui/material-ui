---
product: base
title: React Table Pagination component
components: TablePagination
githubLabel: 'component: TablePagination'
---

# Table Pagination

<p class="description">Table Pagination is an interface tool for splitting up large amounts of data to make it easier for users to navigate.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Table Pagination component lets you add pagination controls to a table.
It controls two properties of its parent table:

- displayed page index
- number of rows per page

Table Pagination renders its internal elements in a `<td>` tag by default so it can be inserted into a table's `<tr>`.
You can use the `component` or `slots.root` prop to render a different root element—for example, if you need to place the pagination controls outside of the table.
See the [Slot props section](#slot-props) for details.

{{"demo": "UnstyledPaginationIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import TablePagination from '@mui/base/TablePagination';

export default function MyApp() {
  return (
    <table>
      <tr>
        <TablePagination />
      </tr>
    </table>
  );
}
```

### Basics

The following demo shows an example of customized pagination controls in a table footer that spans the entire row:

{{"demo": "TableUnstyled.js"}}

### Anatomy

The Table Pagination component is composed of a root `<td>` that houses up to ten interior slots:

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
<td class="MuiTablePagination-root">
  <div class="MuiTablePagination-toolbar">
    <div class="MuiTablePagination-spacer"></div>
    <p class="MuiTablePagination-selectLabel" id="mui-48">Rows per page:</p>
    <select class="MuiTablePagination-select">
      <option class="MuiTablePagination-menuItem">All</option>
    </select>
    <p class="MuiTablePagination-displayedRows">1–5 of 13</p>
    <div class="MuiTablePagination-actions">
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
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<TablePagination component="div" />
```

Use the `slots` prop to override any interior slots in addition to the root:

```jsx
<TablePagination slots={{ root: 'div', toolbar: 'nav' }} />
```

:::warning
If the root element is customized with both the `component` and `slots` props, then `component` will take precedence.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-spacer` to the spacer slot:

```jsx
<TablePagination slotProps={{ spacer: { className: 'my-spacer' } }} />
```

## Customization

### Custom pagination options

You can customize the options shown in the **Rows per page** select using the `rowsPerPageOptions` prop.
This prop requires an array of either numbers or objects:

- **numbers**—each number is used for the option's label and value.

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50]} />
  ```

- **objects**—the `value` and `label` keys are used, respectively, for the value and label of the option (useful for labels such as **All**).

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
  ```

### Customized look and feel

The following demo shows another example of pagination controls but with additional style customization:

{{"demo": "TableCustomized.js"}}
