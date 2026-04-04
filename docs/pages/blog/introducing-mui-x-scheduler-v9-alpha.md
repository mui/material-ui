---
title: 'MUI X Scheduler v9 alpha'
description: 'An early look at MUI X Scheduler v9 alpha: event and resource planning, calendar and timeline views, Community vs Premium, and how it fits the advanced stack.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
---

The Scheduler is a new advanced component in MUI X aimed at time‑ and resource‑centric applications: not just a decorative calendar, but events bound to people, rooms, equipment, and projects, with interactions that match how real products work.

We're shipping it in alpha: useful for prototypes and roadmap planning, but the APIs are subject to change until the stable release—and we're hoping to get your feedback so we can move through this phase quickly.

This post explains what we're building, how Community and Premium differ, and where it sits next to Data Grid, Charts, and Chat.
For the broader v9 context, read [Introducing Material UI and MUI X v9](/blog/introducing-mui-v9/).

## Table of contents

- [Quick start](#quick-start)
- [What alpha means](#what-alpha-means)
- [When to expect the stable](#when-to-expect-the-stable)
- [What you can build](#what-you-can-build)
- [Event Calendar](#event-calendar)
- [Timeline](#timeline) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
- [Community and Premium](#community-and-premium)
- [Fit with the rest of MUI X](#fit-with-the-rest-of-mui-x)
- [Where to go next](#where-to-go-next)

## Quick start

Install the package and render the Scheduler in minutes: start in the [MUI X Scheduler docs](/x/react-scheduler/) and follow [the quickstart guide](/x/react-scheduler/quickstart/) for your first working calendar.
Then layer your event model and resources on top, and switch to Timeline when your use case needs dense resource planning.

## What alpha means

We expect the same release arc that we've followed for other advanced components: alpha, then beta, then stable, with migration notes as the surface hardens.
Today, that means you should prototype and send feedback—don't assume imports are frozen or that slot APIs can't be changed.
If you've shipped on Data Grid or Charts through early majors, the process should feel familiar.

## When to expect the stable

We're targeting a stable Scheduler release in early July, based on the feedback and usage signals we collect during alpha.
The date is an expectation, not a hard promise: we ship when quality is there.

Keeping Scheduler in alpha right now is intentional because it gives us the room to make necessary breaking changes before the next major, while APIs are still being validated in real projects.

## What you can build

<figure>
  <img
    src="/static/blog/introducing-mui-v9/introducing-mui-x-scheduler-v9-alpha/stub_scheduler-showcase.png"
    alt="Scheduler event planning in MUI X."
    width="1600"
    height="900"
    loading="lazy"
    style="border: 0; width: 100%; height: auto;"
  />
  <figcaption>Scheduler in MUI X v9 alpha.</figcaption>
</figure>

At the center is an event model with start and end times, titles, and metadata, and links back to your domain (tickets, customers, orders, and so on).
You can place those events on resources (people, rooms, assets) or looser groupings that match your product.

Recurring events target real calendars: daily/weekly/monthly and custom rules, editable as a series or as one‑off exceptions, with timezone‑aware evaluation so a daily 09:00 meeting stays at 09:00 local time even across DST changes.

Timezones are modeled so you can store canonically (for example, UTC), render in the user's zone, and lean on the stack for DST and regional rules instead of reinventing offsets in every app.

## Event Calendar

Event Calendar views read like classic planners: day, week, month, filtered slices such as "this project only" or "my meetings".
They suit appointment booking, service desks, team coordination, and smaller‑scale capacity questions where users think in calendar blocks first.

This is the best default when your users already understand calendar metaphors and need fast navigation across dates with a lightweight resource context.

<figure>
  <video
    autoplay
    muted
    loop
    playsinline
    width="1600"
    height="900"
    controls
    style="border: 0; width: 100%; max-width: 800px; height: auto"
  >
    <source
      src="/static/blog/introducing-mui-v9/introducing-mui-x-scheduler-v9-alpha/stub_ghost_scheduler-calendar.mov"
      type="video/quicktime"
    />
  </video>
  <figcaption>Event Calendar in MUI X Scheduler.</figcaption>
</figure>

## Timeline [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

Timeline puts time on one axis and resources on the other, which is the model teams use for operations scheduling in products like FullCalendar Timeline and Bryntum Scheduler.
It fits dispatching, workforce shifts, room/equipment allocation, manufacturing plans, and logistics boards where the key question is "who is doing what, when" across many parallel resources.

The point is one underlying schedule that can be re-visualized without rewriting your domain layer: start in Event Calendar when date-first UX is enough, move to Timeline when resource density and conflict management become central.

<figure>
  <video
    autoplay
    muted
    loop
    playsinline
    width="1600"
    height="900"
    controls
    style="border: 0; width: 100%; max-width: 800px; height: auto"
  >
    <source
      src="/static/blog/introducing-mui-v9/introducing-mui-x-scheduler-v9-alpha/stub_ghost_scheduler-timeline.mov"
      type="video/quicktime"
    />
  </video>
  <figcaption>Timeline in MUI X Scheduler (Premium).</figcaption>
</figure>

## Community and Premium

As with other MUI X products, Scheduler ships with Community and commercial tiers (see [MUI X pricing](/pricing/)).

Community (MIT) targets the core interactive calendar: resource‑aware layouts, multiple views, drag to move and resize, and a fast path to a credible scheduling UI without hand‑rolling hit targets and DnD.

Premium (commercial) adds what enterprises usually need next: recurrence, lazy loading, and richer timeline experiences for dense schedules, with virtualization for huge event grids planned for the stable release.

Most teams can prove UX on Community and move up when recurrence or massive event counts demand it.

## Fit with the rest of MUI X

Technically, Scheduler follows the v9 peer and theme story: align versions with Material UI and sibling MUI X packages, use shared theme augmentation and `sx` like the rest of the line, and keep Premium features packaged so you opt in explicitly.

Conceptually, it closes a gap: Data Grid for tabular workflows, Charts for visual analytics, Scheduler for resource management and capacity, and Chat for conversational assistance.
Together, they're the workflow-heavy side of the stack we're shipping in v9.

## Where to go next

- [Material UI and MUI X v9 overview](/blog/introducing-mui-v9/)
- [Material UI](/blog/introducing-material-ui-v9/)
- [MUI X Data Grid](/blog/introducing-mui-x-data-grid-v9/)
- [MUI X Charts](/blog/introducing-mui-x-charts-v9/)
- [MUI X Tree View and Date and Time Pickers](/blog/introducing-mui-x-tree-view-and-pickers-v9/)
- [MUI X Chat (alpha)](/blog/introducing-mui-x-chat-v9-alpha/)

To share feedback or report issues, visit [mui/mui-x on GitHub](https://github.com/mui/mui-x).
