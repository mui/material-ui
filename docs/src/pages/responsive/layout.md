# Grid

Material design’s responsive UI is based on a 12-column grid layout.
This grid creates visual consistency between layouts while allowing flexibility across a wide variety of designs.

## How it works

The grid system is implemented with the `<Layout />` component:
- It’s using [CSS’s Flexible Box module](https://www.w3.org/TR/css-flexbox-1/) for high flexibility.
- There is two type of layout: *containers* and *items*.
- Item widths are set in percentages, so they’re always fluid and sized relative to their parent element.
- Items have padding to create the gutters between individual items.
- There are five grid breakpoints: xs, sm, md, lg, and xl.

## Gutters

The responsive grid focuses on consistent gutter widths, rather than column width.
Material design margins and columns follow a **8dp** square baseline grid.
Gutters can be 8, 16, 24, or 40dp wide.

{{demo='pages/responsive/layout/GuttersLayout.js'}}

## Full-width vs Centered

**Full-width grids**: use fluid columns and breakpoints to determine when a layout needs to change.

{{demo='pages/responsive/layout/FullWidthLayout.js'}}

**Centered grids**: use fixed columns and reflow the layout when all columns (plus a defined margin) no longer fit on the screen.

{{demo='pages/responsive/layout/CenteredLayout.js'}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{demo='pages/responsive/layout/InteractiveLayout.js'}}

## Auto-layout

The Auto-layout makes the *items* equitably share the available space.
That also means you can set the width of one *item* and the others will automatically resize around it.

{{demo='pages/responsive/layout/AutoLayout.js'}}
