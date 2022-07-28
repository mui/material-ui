---
product: material-ui
title: React Grid component
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid version 2

<p class="description">The responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

The `Grid` component works well for a layout with a known number of columns. 
The columns can be configured with multiple breakpoints to specify the column span of each child.

## How it works

The grid system is implemented with the `Grid` component:

- It uses [CSS Flexbox](https://www.w3.org/TR/css-flexbox-1/) (rather than CSS Grid) for high flexibility.
- The grid is always a flex item. Use the `container` prop to add a flex container.
- Item widths are set in percentages, so they're always fluid and sized relative to their parent element.
- There are five default grid breakpoints: xs, sm, md, lg, and xl. If you need custom breakpoints, check out [custom breakpoints grid](#custom-breakpoints).
- You can give integer values for each breakpoint, to indicate how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint constraints](/material-ui/customization/breakpoints/#default-breakpoints).
- It uses negative margins and padding to create gaps between children, which behave similarly to [the `gap` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
- It does _not_ support row spanning. Children elements cannot span multiple rows. We recommend using [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) if you need this functionality.
- It does _not_ automatically place children. It will try to fit the children one by one, and if there is not enough space, the rest of the children will start on the next line, and so on. If you need auto-placement, we recommend using [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout) instead.

:::warning
The `Grid` component is a _layout_ grid, not a _data_ grid. 
If you need a data grid, check out [the MUI X `DataGrid` component](/x/react-data-grid/).
:::

## What's changed

We built `Grid` v2 from scratch in order to:

- Fix [known issues](https://github.com/mui/material-ui/pull/32746) introduced in Material UI v5.
- Simplify the logic with CSS variables, removing the unnecessary `item` prop and reducing CSS specificity.
- Introduce a proper fix for [preventing a scrollbar](#prevent-scrollbar) by switching between negative margin approaches.
- Set negative margins of equal size on all sides of the grid container by default.

Updating the `Grid` from v1 to v2 is a breaking change. 
Visit the [Grid v2 migration guide](/material-ui/migration/migration-grid-v2/) for more details.

:::info
In the next major release of Material UI, Grid v2 will be stable and v1 will be deprecated.
:::

## Fluid grids

Fluid grids use columns that scale and resize content. A fluid grid's layout can use breakpoints to determine if the layout needs to change dramatically.

### Basic grid

In order to create a grid layout, you need a container. 
Use the `container` prop to create a grid container that wraps the grid items (the `Grid` is always an item).

Column widths are integer values between 1 and 12. 
They can be applied at any breakpoint to indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it (unless overridden, as you can read later in this page). For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

{{"demo": "BasicGrid.js", "bg": true}}

### Multiple breakpoints

Components may have multiple widths defined, causing the layout to change at the defined breakpoint. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/material-ui/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

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
For instance, we can implement the [recommended](https://material.io/design/layout/responsive-layout-grid.html) responsive layout grid of Material Design.

{{"demo": "ResponsiveGrid.js", "bg": true}}

Responsive values is supported by:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- all the [other props](#system-props) of the system

## Auto-layout

The Auto-layout makes the _items_ equitably share the available space.
That also means you can set the width of one _item_ and the others will automatically resize around it.

{{"demo": "AutoGrid.js", "bg": true}}

### Variable width content

Set one of the size breakpoint props to `"auto"` instead of `true` / a `number` to size
a column based on the natural width of its content.

{{"demo": "VariableWidthGrid.js", "bg": true}}

## Nested Grid

The grid container that renders inside another grid container is a nested grid which inherits the [`columns`](#columns) and [`spacing`](#spacing) from the top. The deep nested grid will inherit the props from the upper nested grid if it receives those props.

{{"demo": "NestedGrid.js", "bg": true}}

## Columns

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "ColumnsGrid.js", "bg": true}}

## Offset

Move the item to the right by using offset props which can be:

- number, for example, `mdOffset={2}` - when used the item is moved to the right by 2 columns starts from `md` breakpoint and up.
- `"auto"` - when used, the item is moved to the right edge of the grid container.

{{"demo": "OffsetGrid.js", "bg": true}}

## Custom breakpoints

If you specify custom breakpoints to the theme, you can use those names as grid item props in responsive values.

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Demo() {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            laptop: 1024,
            tablet: 640,
            mobile: 0,
            desktop: 1280,
          },
        },
      })}
    >
      <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid mobile={6} tablet={4} laptop={3} key={index}>
            <div>{index + 1}</div>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
```

:::info
The custom breakpoints affect both the size and offset props:

```diff
- <Grid xs={6} xsOffset={2}>
+ <Grid mobile={6} mobileOffset={2}>
```

:::

### TypeScript

You have to set module augmentation on the theme breakpoints interface. The properties with `true` value will appear as `{key}`(size prop) and `{key}Offset`(offset prop).

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

## Prevent scrollbar

If you use grid as a container in a small viewport, you might see a horizontal scrollbar because the negative margin is applied on all sides of the grid container.

To prevent the scrollbar, set `disableEqualOverflow` prop to `true`. It will enable negative margin only on the top and left sides of the grid which remove overflow on the right-hand side.

{{"demo": "OverflowGrid.js", "bg": true}}

:::warning
You should avoid adding borders or background to the grid when `disableEqualOverflow: true` because the negative margin (applied only at the top and left sides) makes the grid visually misaligned.
:::

## Customization

### Centered elements

If you want to make the content of the grid item centered, specify `display="flex"` directly to the grid item. Then, use `justifyContent` and/or `alignItems` to adjust the position of the content.

{{"demo": "CenteredElementGrid.js", "bg": true}}

:::warning
Using `container` prop would not work because the grid container is designed to wrap only the grid items, not random elements.
:::

### Full bordered

{{"demo": "FullBorderedGrid.js"}}

### Half bordered

{{"demo": "HalfBorderedGrid.js"}}

## Limitations

### direction column and column-reverse

The column width (`xs`, ..., `xl`) and offset props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers.
If used, these props may have undesirable effects on the height of the `Grid` item elements.
