---
title: MUI Core libraries support the Next.js App Router
description: Material UI, Base UI, and Joy UI are now compatible with the App Router as Client Components. Get started using the latest Next.js features with MUI!
date: 2023-07-18T00:00:00.000Z
authors: ['samuelsycamore']
manualCard: true
tags: ['Product']
---

With [v5.14.0](https://github.com/mui/material-ui/releases/tag/v5.14.0), MUI's Core component libraries—Material UI, Base UI, and Joy UI—are now compatible with the Next.js App Router. 🚀

<img alt="MUI and Next.js logos" src="/static/blog/mui-next-js-app-router/logos.png" loading="lazy" width="2076" height="900" />

## Adapting to the new paradigm

React 18 introduced the concept of React Server Components, and Next.js 13 gave us the most mature framework implementation of RSCs to date with the App Router.
While these two changes have caused major waves among the React community, it's clear that this is the path forward, and it's our responsibility as library maintainers to adapt to the new paradigm.

As a first step towards this goal, we've updated all Material UI, Base UI, Joy UI, and MUI System components to ship with the `"use client"` directive, to let your apps know that these are Client Components (since Server Components are now the default).

:::info
**A note on terminology:** although no Material UI, Base UI, Joy UI, or MUI System components can be used as React Server Components (RSCs) at this time, they _do_ support server-side rendering (SSR).
See [this explanation of Client Components and SSR](https://github.com/reactwg/server-components/discussions/4) from the React Working Group for more details on the distinction between RSC and SSR.
:::

Additionally, we've created guides to walk you through setting up an app using the Next.js App Router with each of the Core libraries:

- [Material UI setup](https://mui.com/material-ui/guides/next-js-app-router/)
- [Base UI setup](https://mui.com/base-ui/guides/next-js-app-router/)
- [Joy UI setup](https://mui.com/joy-ui/integrations/next-js-app-router/)

<img alt="Screenshot of the Material UI documentation" src="/static/blog/mui-next-js-app-router/docs.png" loading="lazy" width="2400" height="1394" style="margin-bottom:24px;" />

We also have example repos for each, with everything already set up for you:

- [Material UI example](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts)
- [Base UI with Tailwind CSS example](https://github.com/mui/material-ui/tree/master/examples/base-ui-nextjs-tailwind-ts)
- [Joy UI example](https://github.com/mui/material-ui/tree/master/examples/joy-ui-nextjs-ts)

## What comes next

In the world of Server Components, "traditional" CSS-in-JS poses a serious challenge that may require us to move beyond Emotion, which is the default styling solution for Material UI and Joy UI in v5.
We're currently exploring ways to offer our own zero-runtime CSS-in-JS solution that will enable you to use relevant MUI System, Material UI, and Joy UI components as Server Components.
This will also have the added benefit of improving performance across the board.
Keep an eye out for an RFC from us very soon that will detail the proposed solution.

In the meantime, please let us know if you have any questions or encounter any issues when using Material UI components, MUI System, or Joy UI with the Next.js App Router.
