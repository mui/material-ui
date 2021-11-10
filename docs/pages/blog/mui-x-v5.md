---
title: Introducing MUI X v5.0
description: We are excited to introduce MUI X v5.0.0!
date: 2021-11-12T00:00:00.000Z
authors:
  ['oliviertassinari', 'm4theushw', 'flaviendelangle', 'DanailH', 'alexfauquette']
card: true
---

We are excited to introduce [MUI X v5.0.0](https://github.com/mui-org/material-ui-x/releases/tag/v5.0.0)!

<!-- TODO: upload a MUI X v5 specific banner -->
<img src="/static/blog/mui-x-v5/card.png" alt="" style="width: 100%; margin-bottom: 16px;" />

This release features some major highlights:

- [High-level goals for v5](#high-level-goals-for-v5)
- [A new virtualization engine](#a-new-virtualization-engine)
- [Improved state management](#improved-state-management)
- [Reduced style specificity for easier customization](#reduced-style-specificity-for-easier-customization)
- [Features highlights](#features-highlights)
- [v4 migration](#v4-migration)
  - [Change of the package names](#change-of-the-package-names)
  - [Change of the styling solution](#change-of-the-styling-solution)
- [What's next?](#whats-next)
  - [A public roadmap](#a-public-roadmap)
- [Thank you](#thank-you)

## High-level goals for v5

## A new virtualization engine

The `DataGrid` and `DataGridPro` features a brand-new virtualization engine.
We decided to rewrite it completely to address the many issues raised by the community and to make easier to release new features that impact the rendering of rows and columns.
One of the many advantages over the previous version is that now we use the native scroll.
This means that scrolling the grid is like scrolling a webpage.
The jittering caused when the scroll is overridden is gone.
Another advatange is that scrolling horizontally will have the same performance as scrolling vertically.

To summarize, the new virtualization has the following features:

- Scrolling runs at 40 FPS, on average
- Same performance for horizontal and vertical scroll
- No more jumps when changing the rendered rows
- Better performance on mobile devices
- Calling `apiRef.current.scrollToIndexes` works no matter where the cell is
- Improved support for when virtualization is disabled.

## Improved state management

## Reduced style specificity for easier customization

## Features highlights

<!-- TODO: add subsections for the features we want to mentune, if any -->

## v4 migration

### Change of the package names

### Change of the styling solution

## What's next?

### A public roadmap

You can use our public roadmap on GitHub to learn about what features we're working on, what stage they're at, and when we expect to bring them to you:

- [MUI X](https://github.com/mui-org/material-ui-x/projects/1)

## Thank you
