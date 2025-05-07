---
productId: system
title: React Grid component
githubLabel: 'component: Grid'
---

# Grid

<p class="description">The responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

The `Grid` component works well for a layout with known columns. The columns can be configured in multiple breakpoints which you have to specify the column span of each child.

## How it works

The grid system is implemented with the `Grid` component:

- It uses [CSS's Flexible Box module](https://www.w3.org/TR/css-flexbox-1/) for high flexibility.
- The grid is always a flex item. Use the `container` prop to add flex container to it.
- Item widths are set in percentages, so they're always fluid and sized relative to their parent element.
- There are five default grid breakpoints: xs, sm, md, lg, and xl. If you need custom breakpoints, check out [custom breakpoints grid](#custom-breakpoints).
- Integer values can be given to each breakpoint, indicating how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint constraints](/material-ui/customization/breakpoints/#default-breakpoints).
- It **does not** have the concept of rows. Meaning, you can't make the children span to multiple rows. If you need to do that, we recommend to use [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) instead.
- It **does not** offer auto-placement children feature. It will try to fit the children one by one and if there is not enough space, the rest of the children will start on the next line and so on. If you need the auto-placement feature, we recommend to use [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout) instead.

:::warning
The Grid component shouldn't be confused with a data grid; it is closer to a layout grid. For a data grid head to [the Data Grid component](/x/react-data-grid/).
:::

## Fluid grids

Fluid grids use columns that scale and resize content. A fluid grid's layout can use breakpoints to determine if the layout needs to change dramatically.

### Basic grid

In order to create a grid layout, you need a container. Use `container` prop to create a grid container that wraps the grid items (the `Grid` is always an item).

Column widths are integer values between 1 and 12.
For example, an item with `size={6}` occupies half of the grid container's width.

{{"demo": "BasicGrid.js", "bg": true}}

### Multiple breakpoints

Components may have multiple widths defined, causing the layout to change at the defined breakpoint. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `size={{ xs: 12, sm: 6 }}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/material-ui/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

{{"demo": "FullWidthGrid.js", "bg": true}}

## Spacing

To control space between children, use the `spacing` prop.
The spacing value can be any positive number, including decimals and any string.
The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

{{"demo": "SpacingGrid.js", "bg": true, "hideToolbar": true}}

### Row & column spacing

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently.
It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

{{"demo": "RowAndColumnSpacing.js", "bg": true}}

## Responsive values

You can switch the props' value based on the active breakpoint.
For instance, we can implement the [recommended](https://m2.material.io/design/layout/responsive-layout-grid.html) responsive layout grid of Material Design.

{{"demo": "ResponsiveGrid.js", "bg": true}}

Responsive values is supported by:

- `size`
- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- `offset`
- all the [other props](#system-props) of MUI System

## Auto-layout

The Auto-layout makes the _items_ equitably share the available space.
That also means you can set the width of one _item_ and the others will automatically resize around it.

{{"demo": "AutoGrid.js", "bg": true}}

### Variable width content

Set one of the size breakpoint props to `"auto"` to size a column based on the width of its content.

{{"demo": "VariableWidthGrid.js", "bg": true}}

## Nested Grid

The grid container that renders inside another grid container is a nested grid which inherits the [`columns`](#columns) and [`spacing`](#spacing) from the top. The deep nested grid will inherit the props from the upper nested grid if it receives those props.

{{"demo": "NestedGrid.js", "bg": true}}

## Columns

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "ColumnsGrid.js", "bg": true}}

## Offset

Move the item to the right by using the `offset` prop which can be:

- number, for example, `offset={{ md: 2 }}` - when used the item is moved to the right by 2 columns starts from `md` breakpoint and up.
- `"auto"` - when used, the item is moved to the right edge of the grid container.

{{"demo": "OffsetGrid.js", "bg": true}}

## Custom breakpoints

If you specify custom breakpoints to the theme, you can use those names as grid item props in responsive values.

{{"demo": "CustomBreakpointsGrid.js", "bg": true}}

:::info
Custom breakpoints affect all [responsive values](#responsive-values).
:::

### TypeScript

You have to set module augmentation on the theme breakpoints interface.

```ts
declare module '@mui/system' {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
```

## Limitations

### direction column and column-reverse

The `size` and `offset` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers.
If used, these props may have undesirable effects on the height of the `Grid` item elements.
