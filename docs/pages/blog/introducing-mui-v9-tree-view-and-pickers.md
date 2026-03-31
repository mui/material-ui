---
title: 'MUI X v9 Tree View and Date and Time Pickers'
description: 'Tree View and Date and Time Pickers in MUI X v9: virtualization-by-default trees, picker field and focus ergonomics, locales, and migration-oriented cleanups.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

Tree View and Date and Time Pickers are the everyday workhorses of MUI X: hierarchies everywhere, dates in almost every form.
Their v9 slice of the cycle is deliberately focused: large trees that stay fast and predictable, and pickers that behave well on keyboard, in forms, and next to other controls, with locale and adapter coverage that stays aligned with the Data Grid and the rest of the suite.

This single post covers both because they share that "foundational UX" role compared with heavier hitters like Data Grid or Charts in this major.

For the full v9 narrative, see the [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).

## Table of contents

- [Tree View](#tree-view) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [Date and Time Pickers](#date-and-time-pickers)
- [Where to go next](#where-to-go-next)

## Tree View [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

Rich Tree View Pro in v9 ships virtualization on by default, with an explicit opt‑out when you need a non‑virtualized layout.
That shift comes with practical defaults (for example row height, set `itemHeight` when content differs) and a flatter events surface on Pro so focus and performance stay easier to reason about on big trees.

API and styling hygiene matter too: older model and ref hooks are replaced by the richer variants (`useRichTreeViewApiRef`, `useSimpleTreeViewApiRef`, `useRichTreeViewProApiRef`), `TreeViewBaseItem` is removed in favor of documented model shapes, and state tokens on `treeItemClasses` that encoded expanded/selected styling are dropped in favor of `data-*` attributes you can target in CSS.

If you maintain custom themes or imperative code against trees, budget time to revisit refs, virtualization assumptions, and selectors that depended on the old classes.

Full API and migration notes live in the [Tree View](/x/react-tree-view/) documentation.

## Date and Time Pickers

Pickers in v9 continue the keyboard‑first calendar work: move through day, month, and year without treating pointer interaction as mandatory.
`fieldRef` stabilizes with `clearValue`, which matters in long forms, filters, and anywhere "reset this field" must be reliable.

We also smoothed focus when dismissing the popover so click‑away is less likely to strand focus on the wrong control, especially near dialogs, drawers, and embedded grid filters.
Locales and adapters expand (for example `thTH` in step with the Data Grid, and `AdapterDayjsBuddhist` for non‑Gregorian cases); if you use range pickers across zones, re‑validate edge cases after upgrading.

The [Date and Time Pickers](/x/react-date-pickers/) docs (including migration notes) remain the source of truth for API deltas as v9 stabilizes.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Data Grid](/blog/introducing-mui-v9-data-grid/)
- [Charts](/blog/introducing-mui-v9-charts/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [Chat (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

To share feedback or report issues, visit [mui/mui-x on GitHub](https://github.com/mui/mui-x).
