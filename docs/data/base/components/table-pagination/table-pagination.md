---
productId: base-ui
title: React Table Pagination component
components: TablePagination
githubLabel: 'component: TablePagination'
---

# Table Pagination

<p class="description">Table Pagination is an interface tool for splitting up large amounts of data to make it easier for users to navigate.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Table Pagination component lets you add pagination controls to a table.
It controls two properties of its parent table:

- displayed page index
- number of rows per page

{{"demo": "UnstyledPaginationIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { TablePagination } from '@mui/base/TablePagination';
```

Table Pagination renders its internal elements in a `<td>` tag by default so it can be inserted into a table's `<tr>`.
You can use the `slots.root` prop to render a different root element—for example, if you need to place the pagination controls outside of the table.
See [Custom structure](#custom-structure) for details.

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
<td class="base-TablePagination-root">
  <div class="base-TablePagination-toolbar">
    <div class="base-TablePagination-spacer"></div>
    <p class="base-TablePagination-selectLabel" id="mui-48">Rows per page:</p>
    <select class="base-TablePagination-select">
      <option class="base-TablePagination-menuItem">All</option>
    </select>
    <p class="base-TablePagination-displayedRows">1–5 of 13</p>
    <div class="base-TablePagination-actions">
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

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<TablePagination slots={{ root: 'div', toolbar: 'nav' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-spacer` to the spacer slot:

```jsx
<TablePagination slotProps={{ spacer: { className: 'my-spacer' } }} />
```

## Customization

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<TablePagination<typeof CustomComponent>
  slots={{ root: CustomComponent }}
  customProp
/>
```

The same applies for props specific to custom primitive elements:

```tsx
<TablePagination<'button'> slots={{ root: 'button' }} onClick={() => {}} />
```

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
