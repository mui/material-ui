---
title: Scheduler in MUI X v9 – alpha preview
description: An early look at the Scheduler component in the MUI X v9 alpha cycle, including event scheduling, recurring events, drag interactions, and engineering notes.
date: 2026-03-16T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
---

The **Scheduler** is a new advanced component in MUI X, focused on complex, time‑based workflows.
Scheduler is available as **Alpha / not yet published**, so you can explore the product surface and plan how it might fit into your roadmap.

This post covers the **product surface of the Scheduler**, the **docs prep work** we’re doing for early adoption, and a short set of **engineering notes** about how it fits into the broader MUI X architecture.
For the complete v9 story across Material UI and MUI X, see the [v9 shared major version overview](/blog/introducing-mui-v9/).

## Table of contents

- [Alpha status](#alpha-status-not-published-yet)
- [Scheduling events](#scheduling-events)
- [Recurring events](#recurring-events)
- [Drag interactions](#drag-interactions)
- [Timezone support](#timezone-support)
- [Event Calendar views and Timeline](#event-calendar-views-and-timeline)
- [Docs and onboarding items](#docs-and-onboarding-items)
- [Engineering notes](#engineering-notes-alpha)

## Alpha status: not published yet

The Scheduler is currently in **Alpha**:

- APIs may still change.
- We’re actively collecting feedback and iterating.
- It’s **not yet a published stable product**, and production usage should be approached with caution.

If you’re familiar with how we’ve iterated on other advanced components (like Data Grid and Charts), the Scheduler will follow a similar trajectory: **alpha**, then **beta**, then **stable**, with migration guidance along the way.

## Product surface: events, recurrence, drag interactions, and timezones

<!-- feature-media:img Scheduler event timeline -->

The Scheduler is designed to help teams build **event‑centric applications** without starting from scratch.

### Scheduling events

At its core, the Scheduler lets you **schedule events on a timeline**, across:

- Individual users.
- Resources (like rooms, equipment, or projects).
- Arbitrary groupings that match your domain.

Events can include:

- Start and end times.
- Metadata such as titles, descriptions, statuses, and custom fields.
- Links to external entities (e.g., tickets, customers, or orders).

### Recurring events

Real‑world schedules rarely consist only of one‑off events.
The Scheduler aims to support **recurring events** that:

- Repeat daily, weekly, monthly, or on custom patterns.
- Respect locale and calendar rules.
- Can be edited as a series or as exceptions.

The goal for v9 is to provide a **recurrence model that feels native to the rest of MUI X**— predictable, well‑typed, and easy to integrate with your existing business logic.

### Drag interactions

Modern scheduling experiences are highly interactive.
The Scheduler is being built with **drag‑and‑drop as a first‑class interaction**:

- **Drag to create** a new event directly on the calendar or timeline.
- **Drag to move** an event to a new time slot or resource.
- **Drag to resize** (extend or shorten) event durations.

These interactions are designed to respect:

- Your **business constraints** (e.g., minimum duration, working hours).
- **Snap rules** (e.g., 15‑minute increments).
- Accessibility expectations, including keyboard equivalents.

### Timezone support

Scheduling often spans multiple timezones.
The Scheduler’s timezone model is built to:

- Represent events in a **canonical timezone** (like UTC).
- Render them in **user‑local timezones**.
- Handle **offset changes** due to daylight saving time and regional rules.

The end goal is a Scheduler that can support **global teams** without forcing you to reimplement timezone logic.

## Event Calendar views and Timeline

The Scheduler supports multiple **visualizations of the same underlying data**, so users can choose the mental model that works best for them.

### Event Calendar views

Event Calendar views present data in familiar calendar layouts:

- **Day, week, and month** views.
- Grouped or filtered views—for example, “only my schedule” or “only this project”.

These views are designed to work well for:

- Planning meetings and appointments.
- Managing capacity across small teams.
- Coordinating personal and shared calendars.

### Timeline views

Timeline views focus on **time along one axis and resources along another**, ideal for:

- Project and resource planning.
- Shift scheduling and operations rooms.
- Visualizing **long‑running tasks** alongside short events.

The goal is to make it possible to **move between Event Calendar and Timeline views** without changing your data model—only the visualization.

## Docs and onboarding items

The Scheduler has docs and onboarding items that cover the initial alpha surface:

- **“Prepare Scheduler doc for alpha”** – initial documentation structure and content, so early adopters can see the surface area and usage patterns.
- **“Create quickstart page”** – a dedicated quickstart that shows how to:
  - Install the relevant Scheduler packages.
  - Render a basic schedule or timeline.
  - Wire up minimal data and interaction.

These steps mirror how we’ve introduced past advanced components: **a clear quickstart, followed by deeper guides** for customization and advanced use cases.

## Engineering notes (alpha)

This section is intentionally a bit more “under the hood” than the rest of the post, to help teams planning early adoption.

The Scheduler is being built to align with the **MUI X v9 architecture**:

- **Peer dependency alignment**: the Scheduler is aligned with the v9 major versions of Material UI and other MUI X packages, simplifying installation and reducing version‑mismatch issues.
- **Theme augmentation**: it integrates with the shared theming system so that **component tokens, density, and modes** (light/dark) are consistent across advanced components.
- **`sx` prop support**: like the rest of MUI X, the Scheduler is designed to work smoothly with the `sx` prop, allowing you to apply layout and design tweaks without abandoning the theme.
- **Premium packaging split**:
  - A **base calendar and timeline experience** suitable for common use cases.
  - Premium features like **advanced timeline behaviors, lazy loading, or extended resource views** planned as separate, opt‑in layers.

Internally, we’re also investing in:

- A data model that can **scale to large schedules**, where thousands of events and resources must stay responsive.
- Hooks and composition patterns that make it straightforward to **plug the Scheduler into existing backends and domain models**.

## Where Scheduler fits into the v9 story

The Scheduler is part of the broader **v9 push toward workflow‑centric components**:

- Data Grid handles **data analysis and tabular workflows**.
- Charts handle **visual data exploration**.
- Scheduler handles **time‑based and resource‑based planning**.
- Chatbox provides **conversational, AI‑assisted interfaces**.

To see how these pieces connect:

- Start with the [v9 shared major version overview](/blog/introducing-mui-v9/).
- Explore related posts:
  - [Material UI v9 primitives](/blog/introducing-mui-v9-primitives/)
  - [Data Grid v9 highlights](/blog/introducing-mui-v9-data-grid/)
  - [Charts v9 highlights](/blog/introducing-mui-v9-charts/)
  - [Chatbox foundations](/blog/introducing-mui-v9-alpha-chatbox/)

And to follow Scheduler as it evolves toward beta and stable, keep an eye on the **Scheduler docs**:

- [Scheduler overview](/x/react-scheduler/)
- [Scheduler quickstart](/x/react-scheduler/quickstart/)

