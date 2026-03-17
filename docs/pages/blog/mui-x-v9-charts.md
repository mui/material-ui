---
title: MUI X v9 – Charts highlights and composition
description: A tour of the Charts changes in v9, from tooltip control and keyboard navigation to composition and Sankey stabilization.
date: 2026-03-16T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
---

Charts are a key part of the MUI X advanced components.
Across the first v9 prereleases, we’re expanding capabilities, tightening keyboard navigation and accessibility, and continuing the work on composition patterns.

For the full v9 story across Material UI, Data Grid, Scheduler, and Chatbox, see the [v9 shared major version overview](/blog/mui-v9-major-version-cycle/).

## Highlights by prerelease

### v9.0.0-alpha.0 – interaction upgrades across all tiers

**Charts (MIT)**

- Legend actions
- `axesGap`
- `initialHiddenItems`
- `useXAxisCoordinates` / `useYAxisCoordinates`
- Axis slots and ticks hooks
- Tooltip control
- Radar keyboard navigation
- Major renames/deprecations including `ChartContainer` → `ChartsContainer` and `getSVGPoint` → `getChartPoint`
- Standardization work around `seriesId` vs `id`

**Charts Pro**

- Heatmap border radius
- Keyboard navigation for funnel/heatmap/sankey
- Export/crash fixes
- Sankey composition support

**Charts Premium**

- WebGL renderer for Heatmap
- `ChartContainerPremium`
- `HeatmapPremium`
- Keyboard navigation for range‑bar
- Related fixes

### v9.0.0-alpha.1 – axis tooltip sorting/control improvements

**Release‑level highlight: axis tooltip sorting/control improvements**

Other changes include:

- Sort props for axis tooltip
- Control axis tooltip
- Overlay refactor
- Require unique series IDs
- `showMark` false by default
- Keyboard focus util usage

### v9.0.0-alpha.2 – stabilizing Sankey and standardizing naming

**Release‑level highlight: stabilize Sankey chart**

- `ChartsLayerContainer`
- Codemods for renames
- Deprecate `ChartDataProvider` → `ChartsDataProvider`
- Deprecate highlighted/faded classes
- Rename standardization (WebGl → WebGL, ChartZoomSlider → ChartsZoomSlider, etc.)
- Controlled tooltip warning/fix
- Restore focus on last focused item

### v9.0.0-alpha.3 – keyboard navigation by default and structural refactors

**Charts**

- Enable keyboard navigation by default
- Tooltip fixes
- Refactor class structure (bar/line/scatter/pie)
- Simplify highlight hooks return types
- Generic type standardization

**Charts Pro**

- Heatmap style override fix
- Export fix
- Speed‑up cell search
- Fix highlight issues

## Migration and composition notes

Before upgrading production apps to v9, we recommend:

- Running the codemods for key renames (`ChartDataProvider` → `ChartsDataProvider`, `ChartZoomSlider` → `ChartsZoomSlider`, and so on).
- Reviewing tooltip and legend usage, especially if you depend on custom ordering or controlled tooltip state.
- Validating keyboard navigation flows across your charts.

## Where to go next

- [v9 shared major version overview](/blog/mui-v9-major-version-cycle/)
- [Data Grid v9 highlights](/blog/mui-x-v9-data-grid/)
- [Scheduler (alpha) overview](/blog/mui-x-v9-alpha-scheduler/)
- [Chatbox (alpha foundations)](/blog/mui-x-v9-alpha-chatbox/)

Docs:

- [Charts overview](/x/react-charts/)
- [Charts composition](/x/react-charts/composition/)

