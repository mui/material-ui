---
title: MUI X v8 — Highlights before the next major
description: New chart interactions, server-side pivoting, Grid ↔ Charts integration, range picker ergonomics, Tree View polish, and more — grouped by component.
date: 2025-11-11T08:00:00.000Z
authors: ['josefreitas', 'alethomas']
tags: ['MUI X', 'Product']
manualCard: false
---

<style>
  #blog-responsive-image {
    height: 230px;
    @media (max-width: 600px) {
      height: 167px;
    }
  }
</style>

<a href="https://github.com/mui/mui-x/releases/tag/v8.20.0">
  <img
    id="blog-responsive-image"
    src="/static/blog/mui-x-end-v8/intro.png"
    alt=""
    height="2400"
    width="800"
    style="width: 100%; object-fit: cover; object-position: center; border: 0px;"
  />
</a>

We’re happy to share the newest MUI X features shipped over the past months. As we gear up for the next major, here’s a tour of everything new.

## Table of contents
- [Charts](#charts)
  - [Brush selection](#brush-selection)
  - [Zoom & pan that feel right](#zoom--pan-that-feel-right)
  - [Zoom slider with preview](#zoom-slider-with-preview)
  - [Keyboard navigation & a11y improvements](#keyboard-navigation--a11y-improvements)
  - [New & upgraded charts](#new--upgraded-charts)
  - [Clearer axes for dense categories](#clearer-axes-for-dense-categories)
  - [Performance & export](#performance--export)
- [Data Grid](#data-grid)
  - [Server-side pivoting (Premium)](#server-side-pivoting-premium)
  - [Row grouping that adapts as you explore](#row-grouping-that-adapts-as-you-explore)
  - [Grid ↔ Charts integration (Premium)](#grid--charts-integration-premium)
  - [Smoother reordering with clear affordances](#smoother-reordering-with-clear-affordances)
  - [Pinned areas & scrolling polish](#pinned-areas--scrolling-polish)
  - [Export resilience (Premium)](#export-resilience-premium)
- [Date and Time Pickers](#date-and-time-pickers)
  - [Better range defaults](#better-range-defaults)
  - [Polished inputs across devices](#polished-inputs-across-devices)
- [Tree View](#tree-view)
  - [Easier to navigate large hierarchies](#easier-to-navigate-large-hierarchies)
- [Localization](#localization)
- [What’s next](#whats-next)
- [Feedback](#feedback)

---

## Charts

### Brush selection
Drag a **brush** across any cartesian chart to focus the conversation: zoom a busy week on a time series, isolate a cluster in scatter, or feed the selected window to your own logic. The brush overlay gives a crisp visual cue while you work.

<figure style="margin:16px 0;">
  <video src="/static/blog/mui-x-end-v8/charts-brush.mp4" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Brush a range to zoom or select data.</figcaption>
</figure>

[Explore brush & selection →](/x/react-charts/brush/)

### Zoom & pan that feel right (Pro)
Zooming and panning now match how people expect to interact: wheel or pinch to zoom, **press-and-drag** to pan, and on touch you can **tap-and-drag** to zoom without fiddly gestures. If needed, tune the interaction config (for example, require Ctrl to zoom and Shift to pan) so charts play nicely with your page shortcuts.

<figure style="margin:16px 0;">
  <video src="/static/blog/mui-x-end-v8/charts-zoom-gestures.mp4" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Natural zoom & pan on desktop and touch.</figcaption>
</figure>

[Zoom & pan guide →](/x/react-charts/zoom-and-pan/)

### Zoom slider with preview (Pro)
A compact **slider** under the axis makes long ranges effortless to navigate, and the optional **preview** shows exactly what’s in view — the dashboard equivalent of a map’s mini-overview.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/charts-zoom-preview.png" alt="Zoom slider and preview" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Stay oriented while zoomed in.</figcaption>
</figure>

[Play with the zoom slider →](/x/react-charts/zoom-and-pan/#zoom-slider)

### Keyboard navigation & a11y improvements
Charts are comfortable to explore from the keyboard: focus highlights stay in sync as you move, and tooltips/axes cooperate so you can read values without a mouse.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/charts-a11y.png" alt="Keyboard navigation in charts" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Keyboard-first exploration of series and points.</figcaption>
</figure>

[Accessibility & keyboard →](/x/react-charts/accessibility/)

### Sankey &  upgraded charts (Pro)
A **Sankey** diagram joins the lineup for flow visualization, while **Funnel** charts gain polished presets (including pyramid/step-pyramid) so conversion stories read at a glance.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/charts-sankey-funnel.png" alt="Sankey and Funnel charts" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Tell flow and conversion stories clearly.</figcaption>
</figure>

[Sankey docs →](/x/react-charts/sankey/) • [Funnel docs →](/x/react-charts/funnel/)

### Clearer axes for dense categories
Multi-level **label groups** on band/point axes tidy up long category lists and comparisons — perfect for “Region → Country → City” break-downs.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/charts-axis-groups.png" alt="Grouped axis labels" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Multi-level category labels.</figcaption>
</figure>

[Axes & labeling →](/x/react-charts/axes/)

### Performance & export (Pro)
Heavy dashboards feel lighter thanks to faster string measurement, tuned bar rendering, and an **SVG batch renderer** for large scatter plots. When it’s time to share, capture the exact view with **image export** or **print/PDF**.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/charts-perf-export.png" alt="Charts performance and export" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Faster charts; one-click export.</figcaption>
</figure>

[Performance tips →](/x/react-charts/scatter/#performance) • [Export guide →](/x/react-charts/export/)

---

## Data Grid

### Server-side pivoting (Premium)
Pivot at scale without locking the browser. The Grid coordinates with your backend to compute pivots and aggregates, so the UI stays snappy while you slice by Region → Segment → Product (or any model you dream up).

<figure style="margin:16px 0;">
  <video src="/static/blog/mui-x-end-v8/grid-pivot.mp4" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Large pivots, computed on the server.</figcaption>
</figure>

[Start with pivoting →](/x/react-data-grid/pivoting/)

### Row grouping that adapts as you explore (Premium)
Reorder grouping levels on the fly and keep your place: **expanded groups stay open** even as data updates, so you don’t lose context during refreshes.

<figure style="margin:16px 0;">
  <video src="/static/blog/mui-x-end-v8/grid-grouping-reorder.mp4" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Drag to reorder groups; expansion persists.</figcaption>
</figure>

[Row grouping guide →](/x/react-data-grid/row-grouping/)

### Grid ↔ Charts integration (Premium)
Turn selections into visuals in seconds. An integrated panel renders the right chart for the current view and stays in sync with Grid interactions — ideal for quick investigations and stakeholder snapshots.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/grid-charts-panel.png" alt="Grid to charts integration panel" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">One click from table to chart.</figcaption>
</figure>

[Grid–Charts integration →](/x/react-data-grid/charts-integration/)

### Smoother reordering with clear affordances (Pro)
Drag-and-drop **row reordering** now shows a precise **drop indicator**, so teams can reprioritize with confidence — perfect for backlogs and ranked lists.

<figure style="margin:16px 0;">
  <video src="/static/blog/mui-x-end-v8/grid-row-reorder.mp4" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">A clear target as you drag rows.</figcaption>
</figure>

[Row reordering →](/x/react-data-grid/row-ordering/)

### Pinned areas & scrolling polish
Pinned rows and aggregates cooperate with the **scrollbar** and **scroll shadows**, making wide, tall tables easier to parse at a glance.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/grid-pinning-shadows.png" alt="Pinned rows and scroll shadows" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Pinned context that reads at a glance.</figcaption>
</figure>

[Pinning guide →](/x/react-data-grid/column-pinning/) • [Scrolling guide →](/x/react-data-grid/scrolling/)

### Export resilience (Premium)
Excel export now relies on a **vetted internal fork** to avoid transitive vulnerabilities and keep exports reliable at scale.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/grid-export-excel.png" alt="Export to Excel from the Data Grid" style="width:100%;max-width:960px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Safer, sturdier exports for compliance workflows.</figcaption>
</figure>

[Export docs →](/x/react-data-grid/export/)

---

## Date and Time Pickers

### Better range defaults (Pro)
Range components can use **different reference dates** for start and end, so pickers open where users expect — say, next Monday through Friday for travel, or “this month” for reporting.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/pickers-range-reference.png" alt="Range picker with different reference dates" style="width:100%;max-width:720px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Open ranges where users naturally start.</figcaption>
</figure>

[Reference dates in ranges →](/x/react-date-pickers/base-concepts/#reference-date)

### Polished inputs across devices
Edits feel steadier: compact one-column time layouts keep the intended format, view switching behaves predictably, and browser quirks are smoothed out so the field stays readable and consistent.

<figure style="margin:16px 0;">
  <img src="/static/blog/mui-x-end-v8/pickers-ux.png" alt="Date & time picker input polish" style="width:100%;max-width:720px;border-radius:12px;">
  <figcaption style="text-align:center;margin-top:8px;">Consistent typing, formats, and labels.</figcaption>
</figure>

[Pickers quickstart →](/x/react-date-pickers/)

---

## Tree View

### Drag and drop support and other improvements
Between refined editing, ordering, and selection behaviors, trees hold up better as they grow. Reorder with drag-and-drop, wire up inline renaming, and keep identifiers flexible so you can mirror your domain model precisely.

<figure style="margin:16px 0;">
  <video src="/static/blog/mui-x-end-v8/tree-editing-ordering.mp4" autoplay muted loop playsinline controls style="width:100%;max-width:960px;border-radius:12px;"></video>
  <figcaption style="text-align:center;margin-top:8px;">Scale up without losing your place.</figcaption>
</figure>

[Rich Tree View guides →](/x/react-tree-view/)

---

## What’s next
We’re targeting **v9 by the end of March**. Right after that, we’ll invest heavily in **customization**: progressively **rewriting components over Base UI** to fully embrace **composition**, cleaner **slots/slotProps**, and a more modern **DevEx**. The aim is to make it easier to swap parts without forking, line up with your design tokens, and build complex UIs with less prop-surface ceremony.

If you rely on deep customization today, now is the perfect time to tell us what hurts — your input will shape the plan.

---

## Feedback
We’re excited to hear from you about improving MUI X! Please share requests, pain points, and use cases through this short form: https://tally.so/forms/w8X8Po

Cheers!