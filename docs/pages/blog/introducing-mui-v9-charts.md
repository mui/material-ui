---
title: MUI X v9 – Charts highlights and composition
description: A tour of the Charts changes in v9, from tooltip control and keyboard navigation to composition and Sankey stabilization.
date: 2026-03-16T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
---

Charts are a key part of the MUI X advanced components.
In v9, we’re expanding capabilities, tightening keyboard navigation and accessibility, and continuing the work on composition patterns.

For the full v9 story across Material UI, Data Grid, Scheduler, and Chatbox, see the [v9 shared major version overview](/blog/introducing-mui-v9/).

## Table of contents

- [Interaction upgrades across all tiers](#interaction-upgrades-across-all-tiers)
- [Axis tooltip sorting and control](#axis-tooltip-sorting-and-control)
- [Sankey stabilization and naming](#sankey-stabilization-and-naming)
- [Keyboard navigation by default](#keyboard-navigation-by-default)
- [Migration and composition notes](#migration-and-composition-notes)

## Charts highlights

<!-- feature-media:img Charts highlights -->

### Interaction upgrades across all tiers

**Charts (MIT)** (alpha.0)

- Legend actions (alpha.0)
- `axesGap` (alpha.0)
- `initialHiddenItems` (alpha.0)
- `useXAxisCoordinates` / `useYAxisCoordinates` (alpha.0)
- Axis slots and ticks hooks (alpha.0)
- Tooltip control (alpha.0)
- Radar keyboard navigation (alpha.0)
- Major renames/deprecations including `ChartContainer` → `ChartsContainer` and `getSVGPoint` → `getChartPoint` (alpha.0)
- Standardization work around `seriesId` vs `id` (alpha.0)

**Charts Pro** (alpha.0)

- Heatmap border radius (alpha.0)
- Keyboard navigation for funnel/heatmap/sankey (alpha.0)
- Export/crash fixes (alpha.0)
- Sankey composition support (alpha.0)

**Charts Premium** (alpha.0)

- WebGL renderer for Heatmap (alpha.0)
- `ChartContainerPremium` (alpha.0)
- `HeatmapPremium` (alpha.0)
- Keyboard navigation for range‑bar (alpha.0)
- Related fixes (alpha.0)

### Axis tooltip sorting and control

**Release‑level highlight: axis tooltip sorting/control improvements** (alpha.1)

Other changes include:

- Sort props for axis tooltip (alpha.1)
- Control axis tooltip (alpha.1)
- Overlay refactor (alpha.1)
- Require unique series IDs (alpha.1)
- `showMark` false by default (alpha.1)
- Keyboard focus util usage (alpha.1)

### Sankey stabilization and naming

**Release‑level highlight: stabilize Sankey chart** (alpha.2)

- `ChartsLayerContainer` (alpha.2)
- Codemods for renames (alpha.2)
- Deprecate `ChartDataProvider` → `ChartsDataProvider` (alpha.2)
- Deprecate highlighted/faded classes (alpha.2)
- Rename standardization (WebGl → WebGL, ChartZoomSlider → ChartsZoomSlider, etc.) (alpha.2)
- Controlled tooltip warning/fix (alpha.2)
- Restore focus on last focused item (alpha.2)

### Keyboard navigation by default

**Charts** (alpha.3)

- Enable keyboard navigation by default (alpha.3)
- Tooltip fixes (alpha.3)
- Refactor class structure (bar/line/scatter/pie) (alpha.3)
- Simplify highlight hooks return types (alpha.3)
- Generic type standardization (alpha.3)

**Charts Pro** (alpha.3)

- Heatmap style override fix (alpha.3)
- Export fix (alpha.3)
- Speed‑up cell search (alpha.3)
- Fix highlight issues (alpha.3)

## Migration and composition notes

Migration and composition notes for v9:

- Running the codemods for key renames (`ChartDataProvider` → `ChartsDataProvider`, `ChartZoomSlider` → `ChartsZoomSlider`, and so on).
- Reviewing tooltip and legend usage, especially if you depend on custom ordering or controlled tooltip state.
- Validating keyboard navigation flows across your charts.

## Where to go next

- [v9 shared major version overview](/blog/introducing-mui-v9/)
- [Data Grid v9 highlights](/blog/introducing-mui-v9-data-grid/)
- [Scheduler (alpha) overview](/blog/introducing-mui-v9-alpha-scheduler/)
- [Chatbox (alpha foundations)](/blog/introducing-mui-v9-alpha-chatbox/)

Docs:

- [Charts overview](/x/react-charts/)
- [Charts composition](/x/react-charts/composition/)

