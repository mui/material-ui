---
productId: joy-ui
title: React Table component
components: Table
githubLabel: 'component: table'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/table/
---

# Table

<p class="description">Tables display sets of data organized in rows and columns.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The Joy UI Table component lets you use plain HTML structure to assemble a table in JSX.

{{"demo": "TableUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

Joy UI Table will apply the styles based on a table structure using `<thead>`, `<tbody>`, and `<tfoot>` elements.

```jsx
import Table from '@mui/joy/Table';
```

{{"demo": "BasicTable.js"}}

:::info
By default, **header** cells (`<th>`) contain the `surface` background color, whereas **data** cells (`<td>`) have no background.
:::

## Customization

### Column width

Use the `sx` prop to target the header and provide the width as a number or percentage.

Columns that don't have an explicit width will spread equally to fill the rest of the area.

{{"demo": "TableColumnWidth.js"}}

:::info
The Table component uses a [`fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) layout to let you control the width of each column.

To learn more about why we take this approach, check out this article from Chris Coyier on [Fixed Table Layouts](https://css-tricks.com/fixing-tables-long-strings/).
:::

#### Inline style

An alternative way of controlling the column's width is to use [inline styles](https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) on the `<th>` element:

```js
<thead>
  <tr>
    <th style={{ width: '40%' }}>Column 1</th>
    <th style={{ width: '64px' }}>Column 2</th>
  </tr>
</thead>
```

### Alignment

Use the `sx` prop to target columns with the appropriate CSS selector and apply the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) property.

```js
// target cells that are not the first in their respective rows.
<Table sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' } }}>
```

{{"demo": "TableAlignment.js"}}

### Variants

Table supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `plain` (default), `outlined`, `soft`, and `solid`.

{{"demo": "TableVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "TableSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Stripe

To create contrast between rows, use the `stripe` prop with `odd` or `even` values.

{{"demo": "TableStripe.js"}}

:::success

The `stripe` prop supports complex arguments with the [`:nth-child()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child#syntax) CSS selector.

For example, you can use `3n` as a value to create stripes on row numbers three, six, nine, and so on:

```js
<Table stripe="3n">
```

:::

### Hover

To highlight a row of the table body when hovering over it, set the `hoverRow` prop to true.

{{"demo": "TableHover.js"}}

### Border

Use the `borderAxis` prop to control the border appearance.

{{"demo": "TableBorder.js"}}

#### Adding custom borders

Customize the table theme based on `borderAxis` prop using the [`extendTheme()`](/joy-ui/customization/themed-components/#change-styles-based-on-props) function.

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  components: {
    JoyTable: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.borderAxis === 'header' && {
            // this example applies borders between <thead> and <tbody>
            '& thead th:not([colspan])': {
              borderBottom: '2px solid var(--TableCell-borderColor)',
            },
          }),
        });
      }
    }
  }
})

<CssVarsProvider theme={theme}>…</CssVarsProvider>
```

For TypeScript, you have to add the new values via module augmentation:

```ts
// this could be any file that's included in your tsconfig.json
declare module '@mui/joy/Table' {
  interface TablePropsBorderAxisOverrides {
    header: true;
  }
}
```

### Sticky header and footer

Set the `stickyHeader` to true to always stick the header at the top as users scroll the table.

Set the `stickyFooter` to true to always stick the footer at the bottom of the table.

:::success
For `stickyHeader` and `stickyFooter` to work correctly, the Table must be a child of a fixed-height element with overflow `auto` (or `scroll`).
We recommend wrapping your Table with [Sheet](/joy-ui/react-sheet/) for this purpose.
See [usage with Sheet](#usage-with-sheet) to learn more.
:::

{{"demo": "TableStickyHeader.js"}}

### Caption

Add a caption to summarize the contents of a Table by inserting a `<caption>` element as the Table's first child.

{{"demo": "TableCaption.js"}}

:::success
To display a caption at the bottom of the Table, set the [caption side](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side) to `bottom`:

```js
<Table sx={{ captionSide: 'bottom' }}>
```

:::

### Footer

Use [`<tfoot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot) to add a footer to the Table.

{{"demo": "TableFooter.js"}}

### Row head

Set `scope="row"` to `<th>` elements inside `<tbody>` to apply the same style as column headers.
The demo below illustrates a common use case: setting the first column to match the header styles.

{{"demo": "TableRowHead.js"}}

### Row and column span

Use `rowSpan` and `columnSpan` to expand a cell across multiple rows or columns.

{{"demo": "TableRowColumnSpan.js"}}

:::warning
Note that the CSS cannot figure out how apply borders on every corner without duplicating some.

There are two workarounds:

1. Manually remove the right border for a specific cell:

   ```js
   // In this example, we remove the border from
   // the right side of the header cell to avoid duplication.
   <th style={{ borderRightWidth: 0 }}>Canceled</th>
   ```

2. Set Table's the border collapse to `collapse`:

   ```js
   <Table sx={{ borderCollapse: 'collapse' }}>
   // Note that this will change the behavior when `stickyHeader` is true:
   // the bottom border of the sticky header will not "stick".
   ```

:::

### Text ellipsis

To truncate the text, set `noWrap` to true.
The header cells always truncate the text to keep the header's height predictable.

{{"demo": "TableTextEllipsis.js"}}

## CSS variables playground

Play around with the CSS variables available to the Table component to see how the design changes.
You can use these to customize the components with both the `sx` prop and the theme.

{{"demo": "TableVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Usage with Sheet

import Sheet from `@mui/joy/Sheet`
When Table becomes a child of [Sheet](/joy-ui/react-sheet/) component, the table header background is inherited from the Sheet.

{{"demo": "TableSheet.js"}}

### Color inversion

When [color inversion](/joy-ui/main-features/color-inversion/) is enabled, the Table's styles will adapt based on its [variant](#variants).

{{"demo": "TableSheetColorInversion.js"}}

## Common examples

### Sort and selection

Use form components such as [Button](/joy-ui/react-button/), [Select](/joy-ui/react-select/) and [Switch](/joy-ui/react-switch/) to create sort and selection features.

{{"demo": "TableSortAndSelection.js"}}

### First and last column pinning

{{"demo": "TableColumnPinning.js"}}

### Collapsible row

{{"demo": "TableCollapsibleRow.js"}}

### Applying global variants

Use `theme.variants.*` to apply global variant styles to the Table.

{{"demo": "TableGlobalVariant.js"}}

### Scrolling shadows

Inspired by this article from Lea Verou on [CSS scrolling shadows](https://lea.verou.me/blog/2012/04/background-attachment-local/), the shadows appear and hide when scrolling on the Table.

{{"demo": "TableScrollingShadows.js"}}
