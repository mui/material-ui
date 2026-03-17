---
title: MUI X v9 – Data Grid highlights and AI‑native direction
description: What’s new in the Data Grid in v9, including filtering, lazy loading, selection, and the AI Assistant direction.
date: 2026-03-16T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
---

The Data Grid is one of the main pillars of MUI X.
Across the first v9 prereleases, we’re refining core behaviors, improving dynamic data handling, and evolving toward **AI‑native workflows** built directly into the grid.

This post walks through the **Data Grid changes by prerelease** and closes with a dedicated section on the **Data Grid AI Assistant** and how it fits into v9.
For the shared ecosystem view, start with the [v9 shared major version overview](/blog/mui-v9-major-version-cycle/).

## Highlights by prerelease

### v9.0.0-alpha.0 – filtering behavior and docs clarity

- Update the **default `logicOperator` behavior in the filtering docs**.
- **Add the `thTH` locale**.
- Fix the **initial filter value state** in the `CustomMultiValueOperator` demo.
- **DataGridPro**: cleanup outdated rows on `dataSource` reference update.

### v9.0.0-alpha.1 – dynamic data and editing ergonomics

**Release‑level highlight: improved dynamic data support and cache invalidation in lazy loading (DataGridPro)**

- **DataGridPro**: improve dynamic data support and cache invalidation in lazy loading.
- Forward rest props in `GridFilterInputMultipleValue`.
- Preserve key input during row edit when using `rowModesModel`.
- Remove double RTL inversion logic for columns pinning.
- **DataGridPro**: fix number input visibility in header filters.

### v9.0.0-alpha.2 – selection, pagination, and performance

- Fix keyboard nav with single‑row checkbox selection.
- Add `checkboxColDef` prop to customize the selection column.
- Format pagination numbers by default.
- Prevent unnecessary row selection checkbox rerendering.
- Make GridScrollArea overrides resolver dynamic.
- **DataGridPro**: use `getRowId` prop to calculate tree data row update.

### v9.0.0-alpha.3 – robustness and header structure

- Fix crash when `rows` and `rowModesModel` are updated simultaneously.
- Add missing `resizablePanelHandle` classes to `gridClasses`.
- Refactor `headerAlign` style calls.
- **DataGridPro**: add `role="presentation"` to detail panel toggle header content.
- **DataGridPro**: fix sorting not reflected in nested server-side data.

## AI‑native Data Grid: the AI Assistant

The v9 cycle continues the journey toward **AI‑native workflows**, with the **Data Grid AI Assistant** as a key example.

### How it works conceptually

The AI Assistant is designed as a **first‑class part of the Data Grid**, not an external chatbot:

- Users ask questions in natural language.
- The assistant translates them into **structured grid changes** (filters, sorting, grouping, aggregations, pivoting).
- Those changes are **visible, inspectable, and editable** in the UI.

Conceptually:

```text
User question → semantic interpretation → grid API calls → visible configuration changes
```

To explore the current surface area, see the [AI Assistant docs](/x/react-data-grid/ai-assistant/).

### Why it matters for v9

This pattern is central to how we think about **AI‑native component design**:

- Components expose clear **intents and actions** an agent can call.
- Component state is **observable and reversible**.
- The UI includes purpose‑built surfaces (history, diffs, applied changes), not a generic chat window.

## Migration notes

Because v9 is still in prerelease, expect some APIs to evolve before stable.
For Data Grid, keep an eye on:

- **Lazy loading + data source** patterns (cache behavior and invalidation).
- **Selection + editing flows** (`rowModesModel`, selection column customization).
- **Server-side data** with tree or nested structures.

## Where to go next

- [v9 shared major version overview](/blog/mui-v9-major-version-cycle/)
- [Charts v9 highlights](/blog/mui-x-v9-charts/)
- [Scheduler (alpha) overview](/blog/mui-x-v9-alpha-scheduler/)
- [Chatbox (alpha foundations)](/blog/mui-x-v9-alpha-chatbox/)

Docs:

- [Data Grid overview](/x/react-data-grid/)
- [Server‑side data](/x/react-data-grid/server-side-data/)
- [AI Assistant](/x/react-data-grid/ai-assistant/)

