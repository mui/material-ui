---
components: Grid
---

# Grid

Material Design’s responsive UI is based on a 12-column grid layout.
This grid creates visual consistency between layouts while allowing flexibility across a wide variety of designs.

## How it works

The grid system is implemented with the `Grid` component:
- It uses [CSS’s Flexible Box module](https://www.w3.org/TR/css-flexbox-1/) for high flexibility.
- There are two type of layout: *containers* and *items*.
- Item widths are set in percentages, so they’re always fluid and sized relative to their parent element.
- Items have padding to create the spacing between individual items.
- There are five grid breakpoints: xs, sm, md, lg, and xl.

## Spacing

The responsive grid focuses on consistent spacing widths, rather than column width.
Material design margins and columns follow an **8dp** square baseline grid.
Spacing can be 8, 16, 24, or 40dp wide.

{{"demo": "pages/layout/SpacingGrid.js"}}

## Full-width vs Centered

**Full-width grids**: use fluid columns and breakpoints to determine when a layout needs to change.

{{"demo": "pages/layout/FullWidthGrid.js"}}

**Centered grids**: use fixed columns and re-flow the layout when all columns (plus a defined margin) no longer fit on the screen.

{{"demo": "pages/layout/CenteredGrid.js"}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/layout/InteractiveGrid.js"}}

## Auto-layout

The Auto-layout makes the *items* equitably share the available space.
That also means you can set the width of one *item* and the others will automatically resize around it.

{{"demo": "pages/layout/AutoGrid.js"}}

## Limitations

### Negative margin

There is one limitation with the negative margin we use to implement the spacing between items.
A horizontal scroll will appear if a negative margin goes beyond the `<body>`.
There are 3 available workarounds:
1. Not using the spacing feature and implementing it in user space `spacing={0}`.
2. Adding a padding on the parent with, at least, the spacing value:
```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={40}>
        //...
      </Grid>
    </div>
  </body>
```
3. Adding `overflow-x: hidden;` on the parent.

### white-space: nowrap;

The initial setting on flex items is `min-width: auto`.
It's causing a positioning conflict when the children is using `white-space: nowrap;`.
You can experience the issue with:
```jsx
<Grid item xs>
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`.
In practice, you can set the `zeroMinWidth` property:
```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/layout/AutoGridNoWrap.js"}}
