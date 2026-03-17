---
title: v9 is the shared major version for Material UI and MUI X
description: We’re unifying Material UI and MUI X under a single v9 major version and laying the groundwork for AI‑native workflows across the ecosystem.
date: 2026-03-16T08:00:00.000Z
authors: ['josefreitas']
tags: ['Material UI', 'MUI X', 'Product']
manualCard: true
---

Material UI and MUI X are entering the **v9 major‑version cycle** together.
Across the first v9 prereleases, we’re aligning the foundations, expanding the advanced components portfolio, and preparing the ecosystem for AI‑native workflows.

This post is the **aggregator** for v9.
It introduces the shared version story, our long‑term direction, and links to dedicated deep dives:

- [Material UI v9 (primitives and platform updates)](/blog/material-ui-v9/)
- [Data Grid v9 highlights](/blog/mui-x-v9-data-grid/)
- [Charts v9 highlights](/blog/mui-x-v9-charts/)
- [Scheduler (alpha)](/blog/mui-x-v9-alpha-scheduler/)
- [Chatbox (alpha foundations)](/blog/mui-x-v9-alpha-chatbox/)

## One version for the whole ecosystem: Material UI + MUI X are both v9

Historically, Material UI and MUI X have occasionally moved on different major versions.
With v9, we’re **synchronizing the major version across the ecosystem**:

- **Material UI v9**: the design‑system primitives and layout foundations.
- **MUI X v9**: the advanced components built on top—Data Grid, Charts, Scheduler, and more.

Having a **single shared version number** makes it easier to:

- Align upgrade windows and migration guides across packages.
- Communicate compatibility—for example, “MUI X v9 is designed to pair with Material UI v9”.
- Stage cross‑cutting improvements, like accessibility and keyboard navigation upgrades, across both layers at once.

Throughout the v9 cycle, you’ll see us increasingly talk about **“Material as a complete ecosystem”** rather than isolated packages.

## v9 prerelease highlights so far

Across the first four v9 prereleases (`v9.0.0-alpha.0`–`v9.0.0-alpha.3`), we’ve focused on **stability, accessibility, and new building blocks**.
You’ll find full details in the deep dives, but here are a few highlights:

- **Material UI**: safer defaults for accessibility, smarter CSS variable handling (including `color-mix()`), and clean‑up work to prepare the library for v9.
- **Data Grid**: multiple rounds of fixes and ergonomics improvements to filtering, lazy loading, dynamic data, selection, and header rendering.
- **Charts**: ongoing work on keyboard navigation, tooltip control, and composition APIs—plus the stabilization of core components like Sankey.
- **Scheduler (alpha)**: a new advanced component for time‑based workflows, with event scheduling, recurring events, drag interactions, and timeline views.
- **Chatbox (alpha foundations)**: a new `@mui/x-chat` package family, built for streaming and AI‑ready message structures from day one.

If you’re primarily interested in a specific area, jump straight into the dedicated posts:

- [Material UI v9 (primitives and platform updates)](/blog/material-ui-v9/)
- [Data Grid v9 highlights](/blog/mui-x-v9-data-grid/)
- [Charts v9 highlights](/blog/mui-x-v9-charts/)
- [Scheduler (alpha) overview](/blog/mui-x-v9-alpha-scheduler/)
- [Chatbox (alpha foundations)](/blog/mui-x-v9-alpha-chatbox/)

## What’s next: AI‑native workflows

v9 is where we start treating **AI as a first‑class interaction pattern**, not just an add‑on API.

### Data Grid AI Assistant as a native workflow

In the Data Grid, the **AI Assistant** (for example, the “Ask Your Table” experience) is our reference for what an **AI‑native workflow** looks like:

- Users ask questions in natural language.
- The grid responds by **applying concrete configuration changes**—filters, sorting, grouping, aggregations—directly in the UI.
- The assistant exposes a **clear history of actions** so users can inspect and adjust what happened.

This isn’t simply “chat next to a table”.
It’s an **embedded workflow**: the AI understands the grid’s schema and capabilities and manipulates the component state in a way that users can inspect, debug, and refine.

In v9, we’re using this pattern as a **blueprint for other components**:

- Components expose **structured intents and state transitions** that an AI agent can call into.
- We provide **reusable visual building blocks** (for history, diffs, and applied changes) that map cleanly onto the underlying APIs.

### Agentic interactions and reusable AI UI building blocks

Looking ahead, we’re orienting the ecosystem around **agentic, AI‑driven interactions**:

- **Reusable UI primitives** for AI features—result panels, diff views, explainer sidebars, tool output inspectors—that can be plugged into Data Grid, Scheduler, or custom workflows.
- A **consistent mental model** for “what the AI is allowed to do” and “how users can see and override it”.
- A **streaming‑first approach** for long‑running operations, so users get feedback as soon as the system has partial answers.

The **Chatbox foundations** in `@mui/x-chat` (see the [Chatbox deep dive](/blog/mui-x-v9-alpha-chatbox/)) are designed explicitly for this AI‑native world, with message parts for tool calls, tool results, sources, and reasoning.

## New Console application for licenses and services

Alongside v9, we’re rolling out a **new Console application** to bring license, usage, and service management into one place.

The Console is designed to help teams:

- See **license status and seat assignments** at a glance.
- Understand **usage across advanced components and services**—for example, which projects are using Data Grid Pro or AI Assistant features.
- Manage **billing, renewals, and service add‑ons** without having to juggle multiple dashboards.

Over time, the Console will also become the home for **usage‑aware recommendations**—for example, surfacing where AI‑assisted workflows or advanced components could help, based on how your team is already using the suite.

## New advanced components expanding the portfolio: Scheduler + Chatbox

v9 is also where we **expand the MUI X portfolio** into new problem spaces.

### Scheduler (alpha)

The **Scheduler** component is our answer to complex, time‑based workflows:

- **Scheduling events** across resources, people, or projects.
- **Recurring events** and patterns that match real‑world calendars.
- **Drag interactions** for resizing, moving, and reassigning events.
- Multiple **Event Calendar and Timeline views** so users can switch between “calendar” and “timeline” mental models.

It’s currently in **alpha / not yet published as a stable product**, but you can already explore its surface in the [Scheduler alpha post](/blog/mui-x-v9-alpha-scheduler/).

### Chatbox (alpha foundations)

The new **Chatbox foundations**, shipped as the `@mui/x-chat` family, aim to make **AI‑ready chat UIs** a first‑class part of the ecosystem:

- A **three‑layer architecture** (`x-chat-headless`, `x-chat-unstyled`, `x-chat`) for clean separation between logic, structure, and design.
- A **normalized store and adapter contract** so you can plug in your own backends, message formats, and AI providers.
- A **streaming‑first design** with explicit message parts for tool calls, results, sources, and reasoning.

Learn more in the [Chatbox deep dive](/blog/mui-x-v9-alpha-chatbox/).

## Material as a comprehensive ecosystem, and design updates next

Taken together, v9 is about **tightening the relationship between primitives and advanced components**:

- Material UI provides the **design system and layout primitives**: typography, color, layout, and foundational components.
- MUI X builds on top of those primitives with **advanced, task‑oriented components** that solve real workflows: data analysis, scheduling, collaboration, and more.
- The new Console and AI‑native experiences help teams **operate and extend** that stack in production.

The next step is to **refresh the Material Design layer itself**:

- Updating the **visual system** so it feels modern, cohesive, and tuned for today’s product expectations.
- Making sure the **design tokens and theming APIs** stay flexible enough for design teams to shape their own brand.
- Ensuring the **advanced components inherit those improvements** without breaking established workflows.

As we continue the v9 cycle, you can expect more updates on **design evolution**, **migration guidance**, and **AI‑native features** across Material UI and MUI X.

For details by area, continue with the deep dives:

- [Material UI v9 (primitives and platform updates)](/blog/material-ui-v9/)
- [Data Grid v9 highlights](/blog/mui-x-v9-data-grid/)
- [Charts v9 highlights](/blog/mui-x-v9-charts/)
- [Scheduler (alpha) overview](/blog/mui-x-v9-alpha-scheduler/)
- [Chatbox (alpha foundations)](/blog/mui-x-v9-alpha-chatbox/)

