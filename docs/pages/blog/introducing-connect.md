---
title: 'Introducing Connect: a Figma plugin that exports Material UI code'
description: Connect is a Figma plugin that lets you generate a theme from the Material UI for Figma Design Kit.
date: 2024-04-16T00:00:00.000Z
authors: ['danilo-leal', 'DavidCnoops']
tags: ['Connect', 'Material UI', 'Product']
card: true
---

Ever since we released the [Material UI Design Kit for Figma](/store/items/figma-react/), designers continuously expressed how much faster and more efficient their experience collaborating with developers would be if they could hand over production-ready code generated directly from the design software that nicely integrates with a codebase using Material UI.

That's why Connect, a Figma plugin, was developed and it's now [available now in beta](https://www.figma.com/community/plugin/1336346114713490235/connect)!
Let's walkthough some of the available features.

## Theme customization

Connect is compatible with [v5.16.0 and later versions of the Design Kit](https://github.com/mui/mui-design-kits/releases/tag/v5.16.0), because it relies on Figma's local variables.
This feature has significantly matured the use of design tokens, making it possible to more closely mirror [Material UI's theming features](/material-ui/customization/theming/).

That means you can use Connect to generate code for any customized local variable and style included in the Design Kit.

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/theme-customization.mp4" type="video/mp4">
</video>

Visit the documentation to learn [how to insert the generated code into your theme file](/material-ui/design-resources/connect/#using-the-generated-theme/).

## Component customization

You can fully customize a component's appearance across multiple states in the Design Kit and then generate the corresponding theme code.
This is one of the most exciting features because it makes tweaking components incredibly fast!

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/custom-component.mp4" type="video/mp4">
</video>

:::warning
While in beta, not all components are supported yet.
We'll expand component coverage progressively in the coming months.
For now you can experiment with the Button and Switch.
:::

## Quick Storybook preview

In Figma you can see all states of any given component, but you may not be able to interact with them.
That's why there's an embedded Storybook preview panel in Connect so that you can conveniently play around with your changes and also see how they interact with other props available in the component API.

<video preload="metadata" autoplay muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/storybook.mp4" type="video/mp4">
</video>

## Try Connect now

Get the beta version of Connect now, availble **for free** on the [Figma Community](https://www.figma.com/community/plugin/1336346114713490235/connect).
There's still a lot to do, and we're looking forward to hearing from all of you [who requested this plugin years ago](https://github.com/mui/mui-design-kits/issues/10).

- Check out further documentation for the Connect plugin and the Material UI Design Kit (To-be-removed note: I'll add links here once the corresponding PR for their docs is merged).
- If you've got any feedback, we'd love to [hear from you here](https://mui-connect.canny.io/feedback).

Happy designing!
