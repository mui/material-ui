---
title: MUI Core libraries support the Next.js App Router
description: Material UI, Base UI, and Joy UI are now compatible with the App Router as Client Components. Get started using the latest Next.js features with MUI!
date: 2023-07-18T00:00:00.000Z
authors: ['samuelsycamore']
card: true
tags: ['News']
---

With v5.14.0, MUI's core component libraries—Material UI, Base UI, and Joy UI—are now compatible with the Next.js App Router. 🚀

<img alt="MUI and Next.js logos" src="/static/blog/mui-next-js-app-router/logos.png" loading="lazy" width="2076" height="900" />

## Adapting to the new paradigm

React 18 introduced the concept of React Server Components, and Next.js 13 gave us the first framework implementation of RSCs with the App Router.
While these two changes have caused major waves among the React community, it's clear that this is the path forward, and it's our responsibility as library maintainers to adapt to the new paradigm.

As a first step towards this goal, we've updated all MUI Core components to ship with the `"use client"` directive, to let your apps know that these are Client Components since Server Components are now the default.

Additionally, we've created guides to walk you through setting up an app using the Next.js App Router with each of the Core libraries:

- [Material UI setup](#)
- [Base UI setup](#)
- [Joy UI setup](#)

<img alt="Screenshot of the Material UI documentation" src="/static/blog/mui-next-js-app-router/docs.png" loading="lazy" width="2400" height="1394" style="margin-bottom:24px;" />

We also have example repos for each, with everything already set up for you:

- [Material UI example](#)
- [Base UI with Tailwind CSS example](#)
- [Joy UI example](#)

## What comes next

In the world of Server Components, "traditional" CSS-in-JS poses a serious challenge that may require us to move beyond Emotion, which is the default styling solution for Material UI and Joy UI in v5.
We're currently exploring ways to offer our own zero-runtime CSS-in-JSS solution, similar to what Chakra UI now offers with Panda CSS.
