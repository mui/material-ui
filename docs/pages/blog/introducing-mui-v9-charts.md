---
title: MUI X v9 Charts
description: MUI X Charts v9: keyboard-first interaction, clearer composition with Charts* APIs, and continued Pro and Premium work across heatmap, Sankey, exports, and more.
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

Charts are a core part of the MUI X advanced stack.
In v9 we’re continuing the same story you saw accelerate in v8: interaction and accessibility by default, a composition model centered on `Charts*` primitives and `ChartsLayerContainer`, and steadier Pro and Premium surfaces for dense and analytical charts.

This post groups those directions so you can scan the major without reading a release notes dump.
For the full v9 picture, see the [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).
For every rename and fix, use the [MUI X releases](https://github.com/mui/mui-x/releases) timeline and the published codemods.

## Table of contents

- [Interaction and accessibility](#interaction-and-accessibility)
- [Composition, naming, and breaking cleanup](#composition-naming-and-breaking-cleanup)
- [Pro and Premium](#pro-and-premium)
- [Planning an upgrade](#planning-an-upgrade)
- [Where to go next](#where-to-go-next)

<!-- feature-media:img Charts highlights -->

## Interaction and accessibility

Keyboard navigation is on by default in v9, with follow‑through work on focus, tooltips, radar, and tier‑appropriate behaviors (for example funnel, heatmap, and Sankey on Pro, range‑bar on Premium).
Across MIT, Pro, and Premium we’ve kept tightening legend and axis ergonomics: clearer hooks for layout and ticks, better control over axis tooltips and ordering, and refinements to how series identity and highlighting behave so custom themes don’t fight the internals.

The headline is a charting stack that feels reachable from the keyboard and easier to tune without diving into copy‑paste workarounds.

## Composition, naming, and breaking cleanup

v9 is the release where the long migration from legacy entry points toward `Charts*`-prefixed APIs and `ChartsLayerContainer` / `ChartsDataProvider` patterns really lands: old containers, providers, voronoi/hover props, and a long tail of obsolete classes and exports are removed in favor of consistent `data-series` attributes, `hitAreaRadius` / `disableHitArea`, and codemoddable renames (including WebGL spelling and zoom slider naming).

Line charts adopt `preferStrictDomainInLineCharts` as the default; if you relied on the previous auto‑domain behavior, confirm axis ranges after upgrading.
Tooltips align with the layer container model (including portaling through `ChartsLayerContainer`), and shared primitives accept `className` more predictably so bar, line, radar, and shared wrappers theme the same way.

## Pro and Premium

On Pro, expect continued polish on heatmap, Sankey composition, exports, brush interactivity (finer pointer and modifier‑key behavior), and navigation for funnel/heatmap/sankey.
Premium pushes WebGL heatmap, premium container entry points, candlestick and related analytical series, and ongoing fixes in dense rendering and export paths.

You don’t need to memorize each minor here; treat Pro and Premium as receiving parity fixes plus tier‑specific depth as v9 matures.

## Planning an upgrade

Plan time to run codemods, revisit tooltips and legends if you customized ordering or controlled state, walk keyboard flows across your chart types, and recheck line chart domains after the stricter default.
If you embed charts in the Data Grid, coordinate with the [Data Grid highlights](/blog/introducing-mui-v9-data-grid/) post on the stable in‑grid path.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Data Grid highlights](/blog/introducing-mui-v9-data-grid/)
- [Tree View and Date and Time Pickers](/blog/introducing-mui-v9-tree-view-and-pickers/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [Chat (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

Docs:

- [Charts overview](/x/react-charts/)
- [Charts composition](/x/react-charts/composition/)

To share feedback or report issues, use [How to get involved](/blog/introducing-mui-v9/#how-to-get-involved) on the v9 overview.
