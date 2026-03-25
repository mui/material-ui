---
title: Introducing Material UI and MUI X v9
description: Introducing Material UI + MUI X v9: unified major version, new primitives, advanced components, and AI-native workflows.
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['Material UI', 'MUI X', 'Product']
manualCard: true
---

Material UI and MUI X ship together on v9.
In this cycle we’re aligning major versions, growing both the primitive and advanced component portfolios, and preparing the ecosystem for AI‑native workflows.

This post is the aggregator for v9.
It introduces the shared version story, our long‑term direction, and links to dedicated deep dives:

- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Data Grid highlights](/blog/introducing-mui-v9-data-grid/)
- [Charts highlights](/blog/introducing-mui-v9-charts/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [Chatbox (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

<!-- feature-media:img v9 ecosystem overview -->

## Table of contents

- [One major version, one ecosystem](#one-major-version-one-ecosystem)
- [v9 cycle highlights](#v9-cycle-highlights)
- [New Console application](#new-console-application)
- [Scheduler and Chatbox debut](#scheduler-and-chatbox-debut)
- [What’s next](#whats-next)
  - [Component portfolio expansion](#component-portfolio-expansion)
  - [v10 styling layer and modern theme layering](#v10-styling-layer-and-modern-theme-layering)
  - [AI-native workflows](#ai-native-workflows)
- [Deep dives](#deep-dives)
- [We want your feedback](#we-want-your-feedback)

## One major version, one ecosystem

When we shipped MUI X v6 in 2023, [we decoupled MUI X’s major version from Material UI and the rest of MUI Core](/blog/mui-x-v6/#decoupling-versions-from-mui-core), at a time when Material UI was still on v5.
The goal was to give advanced components a faster, predictable release rhythm without tying every breaking change to Material UI’s schedule.
We also assumed that, over time, breaking-change pressure might push the two major lines further apart.

In practice, that divergence never really showed up the way we expected, while keeping independent major numbers still made upgrades, peer dependencies, and communication across the stack heavier than we liked.
So for v9 we’re realigning: Material UI moves from v7 straight to v9 (there is no Material UI v8), in step with MUI X v9, restoring a single shared major for the suite for the first time since that split.

With v9, we’re synchronizing the major version across the stack:

- **Material UI v9:** the design‑system primitives and layout foundations.
- **MUI X v9:** the advanced components built on top: Data Grid, Charts, Scheduler, and more.

A single shared version number makes it easier to:

- Align upgrade windows and migration guides across packages.
- Communicate compatibility, for example, “MUI X v9 is designed to pair with Material UI v9”.
- Stage cross‑cutting improvements, such as accessibility and keyboard navigation upgrades, across both layers at once.

Beyond version alignment, v9 tightens how primitives and advanced components work together:

- **Material UI** provides the design system and layout primitives: typography, color, layout, and foundational components.
- **MUI X** builds on those primitives with advanced, task‑oriented components for real workflows: data analysis, scheduling, collaboration, and more.
- The new **Console** and workflow‑driven experiences help teams operate and extend that stack in production.

### Refreshing the Material Design layer

The next step is to modernize the Material Design layer itself:

- Update the visual system so it feels cohesive and tuned to today’s product expectations.
- Keep design tokens and theming APIs flexible enough for teams to express their own brand.
- Ensure advanced components inherit those improvements without breaking established workflows.

As the v9 cycle continues, expect more on design evolution, migration guidance, and advanced workflows across Material UI and MUI X.

## v9 cycle highlights

We’ve focused on stability, accessibility, and new building blocks across the v9 cycle.
The deep dives cover each area in full; these bullets summarize the direction:

- **Material UI:** safer defaults for accessibility, smarter CSS variable handling (including `color-mix()`), and clean‑up work to prepare the library for v9.
- **Data Grid:** multiple rounds of fixes and ergonomics improvements to filtering, lazy loading, dynamic data, selection, and header rendering.
- **Charts:** ongoing work on keyboard navigation, tooltip control, and composition APIs, plus the stabilization of core components like Sankey.
- **Scheduler (alpha):** a new advanced component for time‑based workflows, with event scheduling, recurring events, drag interactions, and timeline views.
- **Chatbox (alpha):** a new `@mui/x-chat` package family, built for streaming and AI‑ready message structures from day one.

Use the links at the top of this post when you’re ready to go deeper on a specific area.

## New Console application

Alongside v9, we’re rolling out a new Console application to bring license, usage, and service management into one place.

The Console is designed to help teams:

- See license status and seat assignments at a glance.
- Understand usage across advanced components and services, for example, which projects are using Data Grid Pro or assistant experiences.
- Manage billing, renewals, and service add‑ons without having to juggle multiple dashboards.

Over time, the Console will also become the home for usage‑aware recommendations, for example, surfacing where assistant‑enhanced workflows or advanced components could help, based on how your team is already using the suite.

## Scheduler and Chatbox debut

v9 is where we widen MUI X into scheduling and conversational UI. **Scheduler** and **Chatbox** are the newest advanced-component tracks in this cycle. They are intentionally early: we want teams to prototype, stress the APIs, and send feedback while we iterate toward stable releases.

### Scheduler (alpha)

Many products now need real **resource management** (people, rooms, equipment, projects) on top of an honest calendar, not a decorative date picker. The Scheduler is aimed at that layer: events bound to resources, recurrence that matches how real organizations plan, and drag interactions for moving and resizing events on the calendar or timeline views.

**Event Calendar** views cover familiar day, week, and month layouts; **Timeline** views lay time along one axis and resources along the other, which fits capacity planning, shifts, and operations-style workflows. The same underlying model can move between those visualizations without a rewrite.

- Scheduling events across resources, people, or projects.
- Recurring events and patterns that match real‑world calendars.
- Drag interactions for resizing, moving, and reassigning events.

Scheduler is in alpha and not yet published as a stable product; explore the surface and roadmap in the [Scheduler post](/blog/introducing-mui-v9-alpha-scheduler/).

### Chatbox (alpha)

Across the industry, primary UIs are often **simplifying** while **chat and assistive surfaces** sit closer to the center of day‑to‑day work. Chatbox is our answer in the MUI stack: foundations for streaming, tool calls, and structured message parts, not a one‑off demo, so you can theme and extend chat the same way you do other advanced components.

Shipped as the `@mui/x-chat` family, Chatbox is MUI X’s **newest surface area**, aimed at products where chat is central to the workflow:

- A three‑layer architecture (`x-chat-headless`, `x-chat-unstyled`, `x-chat`) separating logic, structure, and theming.
- A normalized store and adapter contract so you can plug in your own backends, message formats, and AI providers.
- A streaming‑first design with explicit message parts for tool calls, results, sources, and reasoning.

Learn more in the [Chatbox deep dive](/blog/introducing-mui-v9-alpha-chatbox/).

## What’s next

The next phase keeps building developer workflows, with a stronger focus on design‑system updates, continued component portfolio expansion, and AI‑native experiences.

### Component portfolio expansion

Advanced components keep getting more complete surfaces: time‑based scheduling in Scheduler, and workflow‑driven data experiences in Data Grid.

- Scheduler delivers event scheduling, recurrence, drag interactions, and calendar + timeline views.
- Chatbox (alpha) introduces a structured architecture for conversational UI components.
- Data Grid continues to evolve advanced workflow surfaces, including AI workflows where they enhance the user’s job.

These updates are designed for full product workflows, not just side‑by‑side experiments.
They help developers ship UIs that stay transparent and controllable, with state that users can understand and that apps can integrate with cleanly.

### v10 styling layer and modern theme layering

For v10, we’re reworking the styling layer and theme layering model to better support modern design‑system workflows:

- Peel back the Material Design styling layer and introduce a more flexible, modern theme layering model.
- Use current Material (MD3) styling, adopt your own brand, or mix both, without having to override every class.
- Target independence from Emotion and better integration paths for teams using Tailwind.

### AI-native workflows

Over the past year we shipped the [Data Grid AI Assistant](/blog/introducing-mui-v9-data-grid/#ai-assistant): people describe what they want in natural language, and the grid applies structured changes to filters, sorting, grouping, aggregations, pivoting, and related controls, while keeping the resulting state visible, inspectable, and editable.

Together with the [Console](#new-console-application), that gives teams a more coherent **end-to-end** path from first evaluation through licensing, usage, and rollout, instead of stitching together separate tools for assistants and account management.

We believe thoughtfully integrated AI workflows can **materially improve everyday UX** when they speed up repetitive data and configuration work without hiding the underlying model from the user. Throughout the v9 cycle, expect **broader feature coverage** for assistant-style experiences, tighter polish on the flows we have today, and deeper integration with the advanced components where automation genuinely helps teams ship.

## Deep dives

Each area below has a dedicated post with highlights, migration notes where relevant, and links into the docs:

- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Data Grid highlights](/blog/introducing-mui-v9-data-grid/)
- [Charts highlights](/blog/introducing-mui-v9-charts/)
- [Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [Chatbox (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

## We want your feedback

v9 spans Material UI and MUI X, and the best upgrades are shaped with real-world input. If you run into bugs, missing APIs, or rough edges in migration, tell us. If you have ideas for Scheduler, Chatbox, the Data Grid AI Assistant, or the Console, we want those too.

- **Material UI** (primitives, theming, and related packages): open an [issue](https://github.com/mui/material-ui/issues/new/choose) or start a [discussion](https://github.com/mui/material-ui/discussions) in [`mui/material-ui`](https://github.com/mui/material-ui).
- **MUI X** (Data Grid, Charts, Scheduler, Pickers, and the rest of the advanced components): open an [issue](https://github.com/mui/mui-x/issues/new/choose) or start a [discussion](https://github.com/mui/mui-x/discussions) in [`mui/mui-x`](https://github.com/mui/mui-x).
