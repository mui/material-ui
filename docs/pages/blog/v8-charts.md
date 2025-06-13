---
title: Charts revamped
description: Check out the new features coming in v8.
date: 2025-05-31T00:00:00.000Z
authors: ['alexfauquette']
tags: ['MUI X', 'Product']
manualCard: true
---

There's a lot of exciting news in the v8 release for the charts.
All updates about v8 are already in the [release blog post](/blog/mui-x-v8/#charts).
But in this article I would like to spend more time to provide context on the main breaking changes.

## A bit of context

The library is quite young.
The first version v6.0.0-alpha.0 got released two years ago.

Since that time, we added tons of features, the community got involved, with now 360k weekly downloads on npm, and a lot of issues open.
Thanks for all that :pray:

During that time, we did nearly no breaking changes ([v7 migration guide](https://mui.com/x/migration/migration-charts-v6/) is one of our smallest migration guide).
So it was time to fix all my initial design mistake to improve performances and the developer experience.

In this article I will present the main pain points we fixed in this v8 release.
Those are mostly about how user can customize the charts:

- Customizing the legend
- Managing placement inside SVG
- Customizing the tooltip

## Custom legend

The package started with the idea to get everything in the `<svg />`.
The plotting, the axis, but also the legend, the title.

This leads to the main issue of SVG.
The text positioning.

To create a legend inside a SVG, you need to measure all your texts, and from it deduce their positions.
Here is all the positions we need to compute to display three series in a basic horizontal legend.

<span class="only-light-mode">
<img src="/static/blog/v8-charts/svg-position.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>
<span class="only-dark-mode">
<img src="/static/blog/v8-charts/svg-position-dark.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>

Which is much more complex than writing some CSS like `display: 'flex', flexDirection: 'row'`.
In addition HTML  provides out of the box the overflow management, and better hover/click mangement.

So we dropped this "Every thing as SVG" to provide an HTML legend.

### The wrapping solution

Before v8 you got a `<ChartContainer />` that take care of managing all the data, and rendering the `<svg />` element.
Such that you could render all your chart content as follow.

```jsx
<ChartContainer>
  <SVGLegend />
  <BarPlot />
  <ChartXAxis />
</ChartContainer>
```

Now we need the legend to be inside the data provider, but outside the SVG.
So we've splited this `<ChartContainer />` into `<ChartDataProvider />` and `<ChartSurface />` as follow.

```jsx
<ChartDataProvider>
  <HTMLLegend />
  <ChartSurface>
    <BarPlot />
    <ChartXAxis />
  </ChartSurface>
</ChartDataProvider>
```

Since creating a legend with a custom design is now much easier (no need to measure text bounding boxes), we provide a hook `useLegend()` that returns all the data needed to render one.

## Placement inside SVG

In the previous section, we've seen how we removed the legend from SVG.
But that's leaves a big white space.

Initially the placement in charts was defined by a `margin` prop which defines the space between the border of SVG and the "drawing area".

<span class="only-light-mode">
<img src="/static/blog/v8-charts/margin-illustration.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>
<span class="only-dark-mode">
<img src="/static/blog/v8-charts/margin-illustration-dark.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>

So if we remove the legend, or if user chose to hide an axis, they should also update this `margin` prop.
Otherwise the chart will get plenty of empty space

<span class="only-light-mode">
<img src="/static/blog/v8-charts/remove-legend.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>
<span class="only-dark-mode">
<img src="/static/blog/v8-charts/remove-legend-dark.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>

### Axes with dimension

To simplify this management, we added a notion of axis size.
Now the drawing area is defined by the `margin` plus the x-axes' `height` and the y-axes `width`.

So when you add or hide an axis, no need to care about updating the `margin`.

<span class="only-light-mode">
<img src="/static/blog/v8-charts/axis-illustration.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>
<span class="only-dark-mode">
<img src="/static/blog/v8-charts/axis-illustration-dark.svg" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Illustration of the position to compute in order to display a basic three items legend" />
</span>

In addition it's now feasible to stack axes on top of each other.

[Add a picture of the charts with multiple axes]

## Creating your own tooltip

Customizing the tooltip was a bit hard.
It was not a technical issue, but more a wrong choice of level of abstraction.

We used slots to allow modifying 3 distinct elements:

- The tooltip container that defines the position of the tooltip
- The axis tooltip content that defines the content of the tooltip when trigger by an axis value.
- The item tooltip content that defines the content of the tooltip when trigger by an specific item.

3 slots interlinked was not my best idea.
So we simplified it a lot

### One slots, multiple helpers

The v8 provides a single slots named `tooltip` and you can put hte HTML you want in it.

In addition, we provide the simpler components and helper hooks to let user compose the tooltip they want.
They can re-create the default tooltip as follow.

```jsx
<ChartTooltipWrapper>
  <ChartsItemTooltip /> {/* or <ChartsAxisTooltip /> */}
</ChartTooltipWrapper>
```

User can then re-create the part they want (the wrapper or the content).

To simplify the process, we also export hooks ... that gives all the information needed to reproduce the component.
