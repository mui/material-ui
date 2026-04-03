---
title: 'Introducing Material UI and MUI X v9'
description: 'Introducing Material UI + MUI X v9: unified major version, new foundations, advanced components, and AI-native workflows.'
date: 2026-04-08T08:00:00.000Z
authors: ['josefreitas']
tags: ['Material UI', 'MUI X', 'Product']
manualCard: true
---

<style>
  #blog-responsive-image {
    height: 230px;
    @media (max-width: 600px) {
      height: 167px;
    }
  }
</style>

<a href="https://github.com/mui/material-ui/releases/tag/v9.0.0">
  <img
    id="blog-responsive-image"
    src="/static/blog/introducing-mui-v9/intro.png"
    alt=""
    height="2400"
    width="800"
    style="width: 100%; object-fit: cover; object-position: center; border: 0px;"
  />
</a>

Material UI and MUI X ship together on v9.
In this cycle we're aligning major versions, growing both the primitive and advanced component portfolios, and preparing the ecosystem for AI-native workflows.

This post is the aggregator for v9.
It introduces the shared version story, our long‑term direction, and links to dedicated deep dives:

- [Material UI](/blog/introducing-mui-v9-foundation/)
- [MUI X Data Grid](/blog/introducing-mui-v9-data-grid/)
- [MUI X Charts](/blog/introducing-mui-v9-charts/)
- [MUI X Tree View and Date and Time Pickers](/blog/introducing-mui-v9-tree-view-and-pickers/)
- [MUI X Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [MUI X Chat (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

## Table of contents

- [One major version, one ecosystem](#one-major-version-one-ecosystem)
- [Components highlights](#components-highlights)
- [New Console application](#new-console-application)
- [Renaming MUI Chat to MUI Recipes](#renaming-mui-chat-to-mui-recipes)
- [What's next](#whats-next)
  - [Component portfolio expansion](#component-portfolio-expansion)
  - [AI-native workflows](#ai-native-workflows)
  - [Remove emotion and add modern theme layering](#remove-emotion-and-add-modern-theme-layering)
- [Deep dives](#deep-dives)
- [We want your feedback](#we-want-your-feedback)

## One major version, one ecosystem

When we shipped MUI X v6 in 2023, [we decoupled MUI X's major version from Material UI and the rest of MUI Core](/blog/mui-x-v6/#decoupling-versions-from-mui-core), at a time when Material UI was still on v5.
The goal was to give advanced components a faster, predictable release rhythm without tying every breaking change to Material UI's schedule.
We also assumed that, over time, breaking-change pressure might push the two major lines further apart.

In practice, that divergence never really increased the way we expected, while keeping independent major numbers still made upgrades, peer dependencies, and communication across the stack heavier than we liked.
So for v9 we're realigning: Material UI moves from v7 straight to v9 (there is no Material UI v8), in step with MUI X v9, restoring a single shared major for the suite for the first time since that split.

With v9, we're synchronizing the major version across the stack:

- **Material UI v9:** the design‑system and layouts foundation.
- **MUI X v9:** the advanced components built on top: Data Grid, Charts, Tree View, Date and Time Pickers, Scheduler, Chat, and more.

A single major version number makes it easier to:

- Align upgrade windows and migration guides across packages.
- Communicate compatibility, for example, "MUI X v9 is designed to pair with Material UI v9".
- Stage cross‑cutting improvements, such as accessibility and keyboard navigation upgrades, across both layers at once.

<figure>
  <img
    src="/static/blog/introducing-mui-v9/stub_v9-ecosystem-overview.png"
    alt="MUI v9 ecosystem overview."
    width="1600"
    height="900"
    loading="lazy"
    style="border: 0; width: 100%; height: auto;"
  />
  <figcaption>Material UI and MUI X v9 ecosystem overview.</figcaption>
</figure>

## Components highlights

We've focused on stability, accessibility, and new building blocks across the v9 cycle.
The deep dives cover each area in full; these bullets summarize the direction:

- **Material UI:** new NumberField and Menubar; clearer keyboard navigation; theme work that extends CSS variables with `color-mix()` for derived colors; plus smaller bundle size, improved accessibility, and other readiness clean‑up across the library. See the [Material UI](/blog/introducing-mui-v9-foundation/) post.
- **Data Grid:** dynamic data and lazy loading hardening; selection, header, and filter ergonomics; stable in-grid Charts integration for dashboards that mix tables and visuals; See [MUI X Data Grid](/blog/introducing-mui-v9-data-grid/).
- **Charts:** removal of long‑deprecated chart entry points in favor of `Charts*` APIs; keyboard navigation on by default; axis tooltip and legend refinements; Candlestick in Charts Premium; tooltips portaling through `ChartsLayerContainer` so you get predictable composition when charts live inside scroll regions, dialogs, or grids—tooltips stay visible instead of being clipped by ancestor `overflow`, and their stacking lines up with the rest of the chart layer model. See [MUI X Charts](/blog/introducing-mui-v9-charts/).
- **Tree View:** Rich Tree View Pro gets virtualization on by default (with opt‑out), and `treeItemClasses` / hook cleanups when you theme trees or call imperative APIs ([Tree View section](/blog/introducing-mui-v9-tree-view-and-pickers/#tree-view)).
- **Date and Time Pickers:** keyboard calendar navigation, stable `fieldRef` with `clearValue`, better click‑away focus behavior, and locale/adapter work (`thTH`, `AdapterDayjsBuddhist`) ([Date and Time Pickers section](/blog/introducing-mui-v9-tree-view-and-pickers/#date-and-time-pickers)).
- **Scheduler and Chat debut:** v9 starts with two new advanced components: Scheduler for resource‑aware calendars and timelines, and ChatBox for conversational UI with adapters and streaming. Both are debuting at alpha; product detail, tiers, and onboarding live in the [MUI X Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/) and [MUI X Chat (alpha)](/blog/introducing-mui-v9-alpha-chatbox/) posts.

Use the links at the top of this post when you're ready to go deeper on a specific area.

## New Console application

Last year we began offering [AI assistance for the Data Grid](/blog/introducing-mui-v9-data-grid/#ai-assistant): users describe what they want in natural language, and the grid applies structured changes while keeping state visible and editable. Until now, turning that on in production meant extra friction, teams had to request API keys through our support channel instead of generating and managing them next to licenses and the rest of their commercial setup.

[Console](https://console.mui.com) is the application we're rolling out to remove that friction. It gathers license keys, service API keys (including for assistant and add-on experiences), billing, and usage in one place: an operational hub for MUI's commercial offerings rather than scattered tickets and dashboards.

With Console, teams can:

- See license status and seat assignments at a glance.
- Manage billing, renewals, upgrades and service add‑ons in one workflow.
- Create, view, and rotate API keys for commercial services without relying on a support round‑trip for routine access.

Over time, Console will also surface usage‑aware guidance, based on how your organization already uses the suite.

## Renaming MUI Chat to MUI Recipes

MUI Chat is our generative UI tool in the same vein as products like v0 and Lovable: you describe what you want, and we help you land working Material UI and MUI X usage faster than writing from a blank file.

In practice we use it mostly to deliver custom recipes and customization grounded in what you already see in the docs: variations on our examples, tuned layouts, and branded panels that stay aligned with the same APIs and patterns we document.

v9 introduces something different: MUI X Chat, a real chat component (`@mui/x-chat`) meant to ship inside your product. Keeping the builder under the name "Chat" would collide with that surface and confuse two very different offerings.

So MUI Chat is being renamed to [MUI Recipes](https://recipes.mui.com), a name that matches what the tool is optimized for today: recipe-style outputs and tailored UIs built from our component set, not an embeddable chat runtime.

## What's next

The next phase keeps iterating on developer experience, with a stronger focus on design‑system updates, continued component portfolio expansion, and exploring new AI‑native workflows.

### Component portfolio expansion

Advanced components keep getting more complete surfaces: workflow‑driven data in Data Grid, time‑based planning in Scheduler, and conversational layers in MUI X Chat, each described in its deep dive rather than recapped here.

- Data Grid continues to evolve advanced workflow surfaces, including AI workflows where they enhance the user's job.
- NumberField and Menubar will ship as components in the npm package, not only as documentation recipes you copy from the docs. We'll keep growing the Material UI portfolio as Base UI releases new primitives.
- Scheduler will keep iterating on Event Calendar and Timeline so teams can move from classic appointment views to dense resource planning in one package, and we will keep shipping additional Base UI-powered components as they are ready.

These updates are designed for full product workflows, not just side‑by‑side experiments.
They help developers ship UIs that stay transparent and controllable, with state that users can understand and that apps can integrate with cleanly.

### AI-native workflows

The [Data Grid AI Assistant](/blog/introducing-mui-v9-data-grid/#ai-assistant) is the first large piece of that story in production. Together with [Console](#new-console-application), where you can handle licenses and service keys in one flow, it forms a clearer path from trying assistive features to rolling them out, without stitching together separate tools for assistants and account management.

We believe that integrated AI workflows can materially improve everyday UX, pun intended. They speed up repetitive data and configuration work that would usually require multiple menus, without hiding the underlying model from the user. Throughout the v9 cycle, expect broader feature coverage for assistant-style experiences, tighter polish on the flows we have today, and deeper integration with the advanced components where automation genuinely helps teams ship.

### Remove emotion and add modern theme layering

We're listening you, and for the next major we're going to explore refactoring the styling layer and theme layering model to better support modern design-system workflows:

- Target independence from Emotion and better integration paths for teams using Tailwind.
- The ability for you to use Material, or have a separate theme with your own brand, without having to override every class.

## Deep dives

Each area below has a dedicated post with more detail, migration notes where relevant, and doc links in context:

- [Material UI](/blog/introducing-mui-v9-foundation/)
- [MUI X Data Grid](/blog/introducing-mui-v9-data-grid/)
- [MUI X Charts](/blog/introducing-mui-v9-charts/)
- [MUI X Tree View and Date and Time Pickers](/blog/introducing-mui-v9-tree-view-and-pickers/)
- [MUI X Scheduler (alpha)](/blog/introducing-mui-v9-alpha-scheduler/)
- [MUI X Chat (alpha)](/blog/introducing-mui-v9-alpha-chatbox/)

## We want your feedback

Your input drives our innovation. Join our GitHub communities today to share your insights, report issues, and help shape the future of Material UI and MUI X.

[GitHub - Material UI](https://github.com/mui/material-ui)

[GitHub - MUI X](https://github.com/mui/mui-x)
