---
product: joy-ui
title: React Table component
githubLabel: 'component: table'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/table/
---

# Table

<p class="description">Tables display sets of data. They can be fully customized.</p>

## Introduction

Joy UI Table lets you use plain HTML structure and turn it into a nice looking table. It has robust configuration that covers all of the basic needs for any projects.

{{"demo": "TableUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Table from '@mui/joy/Table';
```

{{"demo": "BasicTable.js"}}

:::info
By default, **header** cells (`<th>`) contain `surface` background color whereas **data** cells (`<td>`) does not have a background.
:::

## Customization

### Column width

Use `sx` prop to target the header and provide the width as a number or percentage.

The columns that don't have explicit width will spread equally to the rest of the area.

{{"demo": "TableColumnWidth.js"}}

:::info
Table component uses [`fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) layout to let you control the width of each column.

To learn more why we take this approach, check out this [great article](https://css-tricks.com/fixing-tables-long-strings/).
:::

#### Inline style

An alternative way of controlling the column's width is to use [inline style](https://reactjs.org/docs/dom-elements.html#style) on the `th` element:

```js
<thead>
  <tr>
    <th style={{ width: '40%' }}>Column 1</th>
    <th style={{ width: '64px' }}>Column 2</th>
  </tr>
</thead>
```

### Alignment

Use `sx` prop to target columns with appropriate CSS selector and apply the [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) property.

```js
// target cells that are not the first of its row.
<Table sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' } }}>
```

{{"demo": "TableAlignment.js"}}

### Variants

Table supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `plain` (default), `outlined`, `soft`, and `solid`.

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

{{"demo": "TableStripe.js"}}

:::success

The prop also supports complex argument of [`:nth-child()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child#syntax) CSS selector.

For example, you can use `3n` as a value to create stripes on row number three, six, nine, and so on:

```js
<Table stripe="3n">
```

:::

### Hover

To highlight a row of the table body when hover on it, set `hoverAxis` prop to true.

{{"demo": "TableHover.js"}}

### Border

Use `borderAxis` prop to control the border appearance.

{{"demo": "TableBorder.js"}}

<details>
<summary><b>Adding custom values</b></summary>

Customize the table theme based on `borderAxis` prop using [`extendTheme()`](/joy-ui/customization/themed-components/#change-styles-based-on-props) function.

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  components: {
    JoyTable: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.borderAxis === 'header' && {
            '& thead th:not([colspan])': {
              border: '2px solid var(--TableCell-borderColor)',
            },
          }),
        });
      }
    }
  }
})

<CssVarsProvider theme={theme}>…</CssVarsProvider>
```

For **TypeScript**, you have to add the new values via module augmentation:

```ts
// this could be any file that's included in your tsconfig.json
declare module '@mui/joy/Table' {
  interface TablePropsBorderAxisOverrides {
    header: true;
  }
}
```

</details>

### Sticky header

Set `stickyHeader` prop to true. The table must be a child of a fixed-height element with overflow `auto` (or `scroll`).

Using [Sheet](/joy-ui/react-sheet/) component is recommended for wrapping a table. See [usage with Sheet](#usage-with-sheet) to learn more.

{{"demo": "TableStickyHeader.js"}}

### Caption

Place `<caption>` as the first child of the table.

{{"demo": "TableCaption.js"}}

:::success
To display caption at the bottom of the table, set [caption side](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side) to `bottom`:

```js
<Table sx={{ captionSide: 'bottom' }}>
```

:::

### Footer

Use [`<tfoot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot) to show the table footer.

{{"demo": "TableFooter.js"}}

### Row head

Set `scope="row"` to `th` elements inside `tbody` to apply the same style as column headers.

{{"demo": "TableRowHead.js"}}

### Row and column span

Use `rowSpan` and `columnSpan` to expand a cell to multiple rows or columns.

{{"demo": "TableRowColumnSpan.js"}}

:::info
**Limitation**: the CSS cannot figure out how apply borders on every corner without duplication.

There are two workarounds:

1. Manually remove the right border for a specific cell:

   ```js
   // In this example, `Canceled` header cell must not have a border on the right.
   <th style={{ borderRightWidth: 0 }}>Canceled</th>
   ```

2. Set Table's border collapse to `collapse`:

   ```js
   <Table sx={{ borderColapse: 'collapse' }}>
   // However, this will change the behavior when `stickyHeader` is true.
   // The border bottom of the sticky headers will no longer sticked.
   ```

:::

### Text ellipsis

To truncate the text, set `noWrap` to true.

{{"demo": "TableTextEllipsis.js"}}

:::info
The header cells always truncate the text to keep the header's height predictable.
:::

## CSS Variables

{{"demo": "TableVariables.js"}}

## Usage with Sheet

When Table becomes a child of [Sheet](/joy-ui/react-sheet/) component, the table header background inherits from the sheet.

{{"demo": "TableSheet.js"}}

### Color inversion

When [color inversion](/joy-ui/main-features/color-inversion/) is enabled, the table styles will adapt based on its variant.

{{"demo": "TableSheetColorInversion.js"}}

## Common examples

### Sort and Selection

Use form components such as [`Button`](/joy-ui/react-button/), [`Select`](/joy-ui/react-select/) and [`Switch`](/joy-ui/react-switch/) to create sort and selection features.

{{"demo": "TableSortAndSelection.js"}}

### Scrolling shadows

Inspired by this [blog post](https://lea.verou.me/2012/04/background-attachment-local/), the shadows appear and hide when scrolling on the table.

{{"demo": "TableScrollingShadows.js"}}

### First and last column pinning

{{"demo": "TableColumnPinning.js"}}

### Applying global variants

Use `theme.variants.*` to apply global variant styles to the table.

{{"demo": "TableGlobalVariant.js"}}
