---
product: joy-ui
title: React Grid component
githubLabel: 'component: Grid'
---

# Grid

<p class="description">The responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.</p>

## Introduction

The grid, based on a 12-column grid layout, creates visual consistency between layouts while allowing flexibility across a wide variety of designs.

:::warning
⚠️ The `Grid` component shouldn't be confused with a data grid; it is closer to a layout grid. For a data grid head to [the `DataGrid` component](/x/react-data-grid/).
:::

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Grid from '@mui/joy/Grid';
```

The Grid component acts as a generic container, wrapping around the elements to be arranged.

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it (unless overridden, as you can read later in this page). For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

{{"demo": "BasicGrid.js", "bg": true}}

## Customization

### Grid with multiple breakpoints

Components may have multiple widths defined, causing the layout to change at the defined breakpoint. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is 600 or more pixels. For smaller viewports, the component fills all 12 available columns.

{{"demo": "FullWidthGrid.js", "bg": true}}

## Spacing

To control space between children, use the `spacing` prop.
The spacing value can be any positive number, including decimals and any string.
The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

{{"demo": "SpacingGrid.js", "bg": true}}

### Row & column spacing

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently.
It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

{{"demo": "RowAndColumnSpacing.js", "bg": true}}

## Responsive values

You can switch the props' value based on the active breakpoint.

{{"demo": "ResponsiveGrid.js", "bg": true}}

Responsive values is supported by:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- all the [other props](#system-props) of the system

:::warning
⚠️ When using a responsive `columns` prop, each grid item needs its corresponding breakpoint.
For instance, this is not working. The grid item misses the value for `md`:

```jsx
<Grid container columns={{ xs: 4, md: 12 }}>
  <Grid xs={2} />
</Grid>
```

:::

## Interactive demo

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Auto-layout

The Auto-layout makes the grid items equitably share the available space.
That also means you can set the width of one grid item and the others will automatically resize around it.

{{"demo": "AutoGrid.js", "bg": true}}

### Variable width content

Set one of the size breakpoint props to `"auto"` instead of `true` / a `number` to size
a column based on the natural width of its content.

{{"demo": "VariableWidthGrid.js", "bg": true}}

## Complex Grid

The following demo illustrates how the grid can be used to build complex layouts.

{{"demo": "ComplexGrid.js", "bg": true}}

## Columns

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "ColumnsGrid.js", "bg": true}}

## System props

As a CSS utility component, Grid supports all [MUI System properties](/system/properties/).
You can use them as props directly on the component.
For instance, a margin-top:

```jsx
<Grid mt={2}>
```

## Limitations

### Negative margin

The spacing between items is implemented with a negative margin. This might lead to unexpected behaviors. For instance, to apply a background color, you need to apply `display: flex;` to the parent.

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers.
If used, these props may have undesirable effects on the height of the `Grid` item elements.

## CSS Grid Layout

The `Grid` component is using CSS flexbox internally.
But as seen below, you can easily use [the system](/system/grid/) and CSS Grid to layout your pages.

{{"demo": "CSSGrid.js", "bg": true}}

## Anatomy

The Grid component is composed of a single root `<div>` element:

```html
<div class="JoyGrid-root">
  <!-- Grid contents -->
</div>
```