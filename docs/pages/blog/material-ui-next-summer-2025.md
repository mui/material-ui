---
title: The next evolution of Material UI
description: Learn about “new-lib”, the spiritual successor to Material UI.
date: 2025-09-09T08:00:00.000Z
authors: ['josefreitas', 'colmtuite', 'oliviertassinari']
tags: ['Material UI', 'Product']
manualCard: false
---

<style>
  #blog-responsive-image {
    height: 230px;
    @media (max-width: 600px) {
      height: 167px;
    }
  }
</style>

<a href="https://github.com/newco/new-lib">
  <img
    id="blog-responsive-image"
    src="/static/blog/material-ui-next-summer-2025/intro.png"
    alt=""
    height="2400"
    width="800"
    style="width: 100%; object-fit: cover; object-position: center; border: 0px;"
  />
</a>

We’re thrilled to share a different kind of message today. In one of our last announcement updates, we committed to shipping the next major version of Material UI with Material Design 3 (MD3) support in time for September 2025. As we dug deeper into that work, it became obvious that simply layering MD3 on top of the existing codebase wouldn’t deliver the experience the community deserves.

Instead, we decided to rebuild the entire component library on top of Base UI, our headless foundation, and incorporate all the lessons we’ve learned from years of maintaining Material UI.

The result is a new library—codenamed new-lib. A modular, theme-agnostic component library that delivers white-label design, out of the box features, and composability for enterprise applications. New-lib is the spiritual successor to Material UI and carry our ecosystem forward.

> **TL;DR** We’re rebuilding Material UI on top of Base UI to deliver a white-label, theme-agnostic, highly composable library. Material UI will remain supported (v6/v7 stay in Long term support) and you’ll get support for migration, npm distribution (no copy-paste), and MD3 as an optional theme if the community votes for it.

## Table of contents

- [Why rebuild Material UI?](#why-rebuild-material-ui)
- [Themes: white-label by default](#themes-white-label-by-default)
- [Composition: break down and build up](#composition-break-down-and-build-up)
- [Distribution: npm package vs copy-and-paste](#distribution-npm-package-vs-copy-and-paste)
- [What happens to Material UI?](#what-happens-to-material-ui)
- [Migration and continuity](#migration-and-continuity)
- [Material Design 3: your vote matters](#material-design-3-your-vote-matters)
- [What's next](#whats-next)
- [How to get involved](#how-to-get-involved)

## Why rebuild Material UI?

Over the last six years, the web has changed dramatically. Design standards are higher, applications are more complex, and the expectations of enterprise teams have grown. When we looked at our existing codebase through that lens, it became clear that a ground-up refactor was the best path forward.

- **Decouple from one look.** Most teams started with Material then overrode nearly everything. White-label by default removes that friction.
- **Unlock deeper control.** Composition lets you swap pieces instead of forking or wrestling specificity.
- **Meet modern demands.** Higher design standards, more complex use cases, and enterprise expectations pushed us to a ground-up refactor.

## Themes: white-label by default

One of the biggest lessons from Material UI is that developers often don’t need Material Design; they need their design. With new-lib, we’re introducing a white-label design system out of the box. You’ll find a range of polished starter themes that help your application look great from the start without configuration. When you’re ready to differentiate, new-lib’s token-based theming system lets you define your own palette, spacing, typography, radius values and etc—or switch to an entirely custom theme.

**< in-depth examples: we want to show some examples here of theming, customization and design >**

## Composition: break down and build up

Material UI has always been built on solid abstractions, but some components were hard to customize without forking code. New-lib takes composition to heart. Each component is a collection of smaller building blocks that you can assemble or replace as needed. For instance, you can still import a fully configured DataGrid, but you can also import only the pieces you need—like a column header or row renderer—and compose them together. This approach provides the best of both worlds: a batteries-included default for rapid development, and a composable foundation when you need to take over control.

**< in-depth examples: we want to show some examples of decomposition (starting from high level and going low level) >**

## Distribution: npm package vs copy-and-paste

New-lib ships as an npm package rather than a copy-and-paste library (e.g., shadcn/ui). That means you install, import, and update—without maintaining a local fork of duplicated source.

- **Centralized updates:** you get fixes, features, and security patches via semver, not by diffing pasted files.
- **Less drift:** avoid divergence between your app and the upstream library over time.
- **Better ownership:** compose and override what you need in code; you own what you need to own to deliver your design system.
- **Tooling-friendly:** first-class TypeScript types, tree-shaking, and CI-friendly upgrades.

If you prefer to vendor specific pieces, you still can—but the default path is clean, maintainable, and designed for long-term sustainability.

## What happens to Material UI?

We are not abandoning Material UI. New-lib is the next generation of the library you know and love. It builds on everything we've learned and preserves the developer-centric principles that have made Material UI successful, while introducing a modern API for improved customization and a much more flexible theming system that works with any styling tech stack (for example, Tailwind, Emotion, or plain CSS with CSS variables).

Material UI and MUI X remain in long-term support, and we’ll provide migration guides and hands-on support to help you upgrade. Think of new-lib as the natural evolution of Material UI rather than a separate product.

- **Active LTS.** Material UI v6 and v7 stay in long-term support (bug/security fixes and critical regressions).
- **Docs stay up.** Existing guides, examples, and API docs remain available.
- **Smooth migration.** You can install new-lib alongside Material UI and migrate screen-by-screen. We’ll provide guides, codemods, AI tooling, and office hours.
- **MD3 as optional theme.** If the community votes for it, Material Design 3 will ship as a theme in new-lib—no lock-in to the Material look.

<div style="max-width:80%; margin:0 auto;">

| Package        | Status                           | Support scope        |
| -------------- | -------------------------------- | -------------------- |
| Material UI v7 | Long term support until 2028     | bug & security fixes |
| Material UI v6 | Long term support until 2028     | bug & security fixes |
| new-lib        | pre-alpha - release by Sept 2026 | active development   |

</div>

## Migration and continuity

We understand that adopting a new major can be intimidating. That’s why we’re committed to making the transition as smooth as possible. When new-lib reaches beta later this year, you can expect:

**An incremental migration path.** You’ll be able to install new-lib alongside Material UI and gradually migrate screens or components. We’ll publish guides, codemods, AI tooling, and examples to help you update your code.

**Long-term support for prior majors.** Material UI will continue receiving critical fixes while you upgrade, similar to how MUI X extended the LTS window when v8 was released.

**Dedicated support options.** Our Customer Success team is scaling up to provide tailored assistance to our enterprise customers. Whether you need training, hands-on migration help, or architectural guidance, we’ll be there.

## Material Design 3: your vote matters

We acknowledge that Material Design may still have a place in the ecosystem, but we also recognise that it shouldn’t be the default for every product. To decide where to prioritize our resources, we’re asking the community to vote on whether Material Design 3 should be one of the first official themes for new-lib.

Have your say →: [Community Poll (1min)](https://tally.so/r/w8X8Po) 🗳️

## What's next

Our roadmap for new-lib is ambitious. Over the coming months, we’ll release RFCs, beta packages, and developer previews (starting at the end of 2025). In parallel, we’ll continue to deliver improvements to the existing Material UI ecosystem, including updates and new features for our advanced components scheduled for March 2026. Here are a few initiatives on our radar:

**Additional themes.** Beyond a default white-label theme, we plan to ship themes inspired by other design systems and brand palettes. Material Design 3 will be a theme depending on the community's wishes.

**AI-ready components.** Just as MUI X is exploring AI-assisted features, we’re experimenting with patterns and APIs that make AI-driven UIs straightforward to build.

**Stable release around September/October 2026,** though the exact timeline is still subject to change based on your feedback and the results of our beta program.

## How to get involved

Your feedback will shape all of these initiatives. We can’t wait to hear what you think and to build the next generation of UI components together.

- **Join the discussion:** [GitHub Discussions](https://github.com/mui/material-ui/discussions)
- **Vote on MD3:** [Community poll](https://tally.so/r/w8X8Po)
- **Try pre-release builds:** _(when available)_

We’re excited to build this with you.
