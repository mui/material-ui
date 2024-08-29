---
title: 'Material UI Sync: a Figma plugin that exports theme code'
description: Enable designers to generate production-ready code directly from the Material UI Figma Design Kit.
date: 2024-04-30T00:00:00.000Z
authors: ['danilo-leal', 'DavidCnoops']
tags: ['Material UI', 'Product']
manualCard: true
---

Over the last few years, we've seen designers increasingly seeking out ways to participate more directly and collaborate more effectively in the development process.
The [Material UI Design Kit for Figma](/store/items/figma-react/) was our first attempt to meet those needs by providing designers with one-to-one mockups of Material UI components for implementing custom design systems.
But it doesn't go far enough on its own to bridge the gap between design and code—the developer still needs to write the designer's custom styles from scratch.

That got us thinking:
What if designers could generate production-ready code directly from their design software to hand off to developers working with a Material UI codebase?

That's why we created Sync, a Figma plugin for generating styles that can be copied and pasted straight into your Material UI app's theme.
We're happy to share that the beta version is [available now on Figma](https://www.figma.com/community/plugin/1336346114713490235/material-ui-sync). 🚀

<img src="/static/blog/introducing-sync-plugin/card.png" alt="Material UI Sync is a Figma plugin that lets you generate a theme from the Material UI for Figma Design Kit." width="1280" height="640" />

Let's take a look at some of its key features:

## Theme customization

Figma's local variables significantly matured the use of design tokens, making it possible to mirror Material UI more closely.
Sync relies on these local variables to generate code corresponding to each element and state.
(As such, it requires [v5.16.0 or later](https://github.com/mui/mui-design-kits/releases/tag/v5.16.0) of the Material UI Design Kit; earlier versions do not support local variables.)

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-sync-plugin/sync-theme.mp4" type="video/mp4">
</video>

Visit the documentation to learn [how to insert the generated code into your theme file](/material-ui/design-resources/material-ui-sync/#using-the-generated-theme).

## Component customization

You can fully customize a component's appearance across multiple states in the Design Kit and then generate the corresponding theme code.
This is one of the most exciting features because it enables designers to use the visual design tools they're already comfortable with to make changes to the code itself.

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-sync-plugin/sync-component.mp4" type="video/mp4">
</video>

:::warning
While in beta, not all components are supported yet.
We'll expand component coverage progressively in the coming months.
For now, you can experiment with the Button, Switch, and Typography.
:::

## Quick Storybook preview

The Material UI Sync plugin also bakes in an embedded Storybook preview panel so that you can conveniently play around with your changes and see how they interact with other props and states available in the component API.

<video preload="metadata" autoplay muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-sync-plugin/sync-storybook.mp4" type="video/mp4">
</video>

## Try Sync now

Get the beta version of Material UI Sync now, available to try for free in the [Figma Community](https://www.figma.com/community/plugin/1336346114713490235/material-ui-sync)!

There's still a lot to do, and we're looking forward to hearing from all of you [who requested this plugin years ago](https://github.com/mui/mui-design-kits/issues/10).

- Check out the documentation for [the Sync plugin](/material-ui/design-resources/material-ui-sync/) and [the Material UI Design Kit](/material-ui/design-resources/material-ui-for-figma/).
- If you've got any feedback, we'd love to [hear from you](https://github.com/mui/mui-design-kits/discussions/84).

Happy designing! 👨‍🎨
