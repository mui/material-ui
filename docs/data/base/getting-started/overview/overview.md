---
title: Overview
---

# MUI Base - Overview

<p class="description">MUI Base is a library of headless ("unstyled") React components and low-level hooks. You gain complete control over your app's CSS and accessibility features.</p>

## Introduction

MUI Base is a library of unstyled React UI components and hooks.
These components were extracted from [Material UI](/material-ui/), and are now available as a standalone package.
They feature the same robust engineering but without implementing Material Design.

MUI Base includes prebuilt components with production-ready functionality, along with low-level hooks for transferring that functionality to other components.

With MUI Base, you can rapidly build on top of our foundational components using any styling solution you choose—no need to override any default style engine or theme.

:::warning
MUI Base's API is currently being revised; there will be no new features or components added to the current implementation.
Learn more about plans for MUI Base in [this blog post](/blog/base-ui-2024-plans/).
:::

## Advantages of MUI Base

- **Ship faster:** MUI Base gives you the foundational building blocks you need to assemble a sleek and sophisticated user interface in a fraction of the time that it would take to do it all from scratch.
- **You own the CSS:** unlike Material UI, which uses Emotion as a default style engine, MUI Base has no built-in styling solution.
  This means you have complete control over your app's CSS.
- **Accessibility:** MUI Base components are built with accessibility in mind.
  We do our best to make all components screen reader-friendly, and offer suggestions for optimizing accessibility throughout our documentation.

## MUI Base vs. Material UI

MUI Base features many of the same components as [Material UI](/material-ui/getting-started/), but without the Material Design implementation.

MUI Base is not packaged with any default theme or built-in style engine.
This makes it a great choice if you need complete control over how your app's CSS is implemented.

You could think of MUI Base as the "skeletal" or "headless" version of Material UI—in fact, future versions of Material UI will gradually adopt these components and hooks for their foundational structure.
