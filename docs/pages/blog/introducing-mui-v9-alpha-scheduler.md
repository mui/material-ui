---
title: MUI X v9 Scheduler (alpha)
description: An early look at Scheduler in MUI X v9: event and resource planning, calendar and timeline views, Community vs Premium, and how it fits the advanced stack.
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
hideFromHomeList: true
---

The Scheduler is a new advanced component in MUI X aimed at time‑ and resource‑centric applications: not just a decorative calendar, but events bound to people, rooms, equipment, and projects, with interactions that match how real products schedule work.

It is alpha / not yet a stable published product: useful for prototypes and roadmap planning, but APIs will move.
This post explains what we’re building, how Community and Premium differ, and where it sits next to Data Grid, Charts, and Chat.
For the broader v9 context, read the [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/).

## Table of contents

- [What alpha means](#what-alpha-means)
- [What you can build](#what-you-can-build)
- [Calendar and timeline views](#calendar-and-timeline-views)
- [Community and Premium](#community-and-premium)
- [Docs and feedback](#docs-and-feedback)
- [Fit with the rest of MUI X](#fit-with-the-rest-of-mui-x)
- [Where to go next](#where-to-go-next)

## What alpha means

We expect the same arc as past advanced components: alpha, then beta, then stable, with migration notes as the surface hardens.
Today that means you should prototype and send feedback, not assume frozen imports or unchanged slot APIs.
If you’ve shipped on Data Grid or Charts through early majors, the expectations will feel familiar.

## What you can build

<!-- feature-media:img Scheduler event timeline -->

At the center is an event model with start and end times, titles and metadata, and links back to your domain (tickets, customers, orders, and so on).
You can place those events on resources (people, rooms, assets) or looser groupings that match your product.

Recurring events target real calendars: daily/weekly/monthly and custom rules, editable as a series or as one‑off exceptions, with locale‑aware behavior as the recurrence layer matures.

Drag and drop is first‑class: create, move, and resize on the canvas with snapping, business constraints, and keyboard paths so accessibility isn’t an afterthought.

Timezones are modeled so you can store canonically (for example UTC), render in the user’s zone, and lean on the stack for DST and regional rules instead of reinventing offsets in every app.

## Calendar and timeline views

Event Calendar views read like classic planners: day, week, month, filtered slices such as “this project only” or “my meetings”.
They suit appointments, team coordination, and smaller‑scale capacity questions.

Timeline views put time on one axis and resources on the other, which matches operations, shifts, and long‑running work next to short meetings.
The point is one underlying schedule that can be re‑visualized without rewriting your domain layer.

## Community and Premium

As with other MUI X products, Scheduler ships in two tiers (see [MUI X Scheduler](/x/react-scheduler/)).

Community (MIT) targets the core interactive calendar: resource‑aware layouts, multiple views, drag to move and resize, and a fast path to a credible scheduling UI without hand‑rolling hit targets and DnD.

Premium (commercial) adds what enterprises usually need next: recurrence, lazy loading, virtualization for huge grids of events, and richer timeline experiences for dense schedules.

Most teams can prove UX on Community and move up when recurrence or massive event counts demand it.

## Docs and feedback

We’re lining up quickstart, installation, and deeper guides the same way we’ve onboarded other advanced components: start with a minimal working schedule, then layer customization.

If something is missing or confusing in the alpha docs, treat that as signal; we iterate quickly while the API contracts settle.

## Fit with the rest of MUI X

Technically, Scheduler follows the v9 peer and theme story: align versions with Material UI and sibling MUI X packages, use shared theme augmentation and `sx` like the rest of the line, and keep Premium features packaged so you opt in explicitly.

Conceptually it closes a gap: Data Grid for tabular workflows, Charts for visual analytics, Scheduler for calendaring and capacity, and Chat for conversational assistance.
Together they’re the workflow‑heavy side of the stack we’re pushing in v9.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI primitives](/blog/introducing-mui-v9-primitives/)
- [Data Grid highlights](/blog/introducing-mui-v9-data-grid/)
- [Charts highlights](/blog/introducing-mui-v9-charts/)
- [Tree View and Date and Time Pickers](/blog/introducing-mui-v9-tree-view-and-pickers/)
- [Chat (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

Docs:

- [Scheduler overview](/x/react-scheduler/)
- [Scheduler quickstart](/x/react-scheduler/quickstart/)

To share feedback or report issues, use [How to get involved](/blog/introducing-mui-v9/#how-to-get-involved) on the v9 overview.
