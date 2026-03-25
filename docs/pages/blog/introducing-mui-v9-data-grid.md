---
title: MUI X v9 Data Grid
description: What’s new in the Data Grid in v9, including filtering, lazy loading, selection, and the AI Assistant direction.
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

The Data Grid is one of the main pillars of MUI X.
In v9, we’re refining core behaviors, improving dynamic data handling, and evolving toward AI‑native workflows built directly into the grid.

This post highlights the Data Grid feature updates and explains how the Data Grid AI Assistant fits the v9 direction.
For the shared ecosystem view, start with the [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).

## Table of contents

- [Filtering, locales, and demos](#filtering-locales-and-demos)
- [Dynamic data and editing ergonomics](#dynamic-data-and-editing-ergonomics)
- [Selection, pagination, and performance](#selection-pagination-and-performance)
- [Robustness and header structure](#robustness-and-header-structure)
- [AI Assistant](#ai-assistant)
- [Migration notes](#migration-notes)

## Data Grid highlights

<!-- feature-media:img DataGrid highlights -->

### Filtering, locales, and demos

- Update the default `logicOperator` behavior in the filtering docs (alpha.0).
- Add the `thTH` locale (alpha.0).
- Fix the initial filter value state in the `CustomMultiValueOperator` demo (alpha.0).
- **DataGridPro:** cleanup outdated rows on `dataSource` reference update (alpha.0).

### Dynamic data and editing ergonomics

Release‑level highlight: improved dynamic data support and cache invalidation in lazy loading (DataGridPro) (alpha.1).

- **DataGridPro:** improve dynamic data support and cache invalidation in lazy loading (alpha.1).
- Forward rest props in `GridFilterInputMultipleValue` (alpha.1).
- Preserve key input during row edit when using `rowModesModel` (alpha.1).
- Remove double RTL inversion logic for columns pinning (alpha.1).
- **DataGridPro:** fix number input visibility in header filters (alpha.1).

### Selection, pagination, and performance

- Fix keyboard nav with single‑row checkbox selection (alpha.2).
- Add `checkboxColDef` prop to customize the selection column (alpha.2).
- Format pagination numbers by default (alpha.2).
- Prevent unnecessary row selection checkbox rerendering (alpha.2).
- Make GridScrollArea overrides resolver dynamic (alpha.2).
- **DataGridPro:** use `getRowId` prop to calculate tree data row update (alpha.2).

### Robustness and header structure

- Fix crash when `rows` and `rowModesModel` are updated simultaneously (alpha.3).
- Add missing `resizablePanelHandle` classes to `gridClasses` (alpha.3).
- Refactor `headerAlign` style calls (alpha.3).
- **DataGridPro:** add `role="presentation"` to detail panel toggle header content (alpha.3).
- **DataGridPro:** fix sorting not reflected in nested server-side data (alpha.3).

## AI Assistant

<!-- feature-media:img DataGrid AI Assistant -->

The v9 Data Grid is built for AI‑native workflows, with the Data Grid AI Assistant as a key example.

### How it works conceptually

The AI Assistant is designed as a first‑class part of the Data Grid, not an external chatbot:

- Users ask questions in natural language.
- The assistant translates them into structured grid changes (filters, sorting, grouping, aggregations, pivoting).
- Those changes are visible, inspectable, and editable in the UI.

Conceptually:

```text
User question → semantic interpretation → grid API calls → visible configuration changes
```

To explore the current surface area, see the [AI Assistant docs](/x/react-data-grid/ai-assistant/).

### Why it matters for v9

This pattern is central to how we think about AI‑native component design:

- Components expose clear intents and actions an agent can call.
- Component state is observable and reversible.
- The UI includes purpose‑built surfaces (history, diffs, applied changes), not a generic chat window.

## Migration notes

Migration notes for Data Grid in v9:

- Lazy loading + data source patterns (cache behavior and invalidation).
- Selection + editing flows (`rowModesModel`, selection column customization).
- Server-side data with tree or nested structures.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Charts highlights](/blog/introducing-mui-v9-charts/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [Chatbox (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

Docs:

- [Data Grid overview](/x/react-data-grid/)
- [Server‑side data](/x/react-data-grid/server-side-data/)
- [AI Assistant](/x/react-data-grid/ai-assistant/)

