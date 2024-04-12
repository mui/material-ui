---
title: 'Introducing Connect: a Figma plugin that exports Material UI code'
description: Connect is a Figma plugin that lets you generate a theme from the Material UI for Figma Design Kit.
date: 2024-04-16T00:00:00.000Z
authors: ['danilo-leal', 'DavidCnoops']
tags: ['Connect', 'Material UI', 'Product']
card: true
---

Ever since we released the [Material UI Design Kit for Figma](/store/items/figma-react/), designers continuously expressed how much faster and more efficient their experience collaborating with developers would be if they could hand over production-ready code generated directly from the design software that nicely integrates with a codebase using Material UI.

That's why Connect, a Figma plugin, was created and it's [available now in beta](https://www.figma.com/community/plugin/1336346114713490235/connect)!
Let's walkthough some of the available features.

## Theme customization

Figma's local variables significantly matured the use of design tokens, making it possible to mirror Material UI more closely.
Parting from version [v5.16.0 and later versions](https://github.com/mui/mui-design-kits/releases/tag/v5.16.0), Connect takes advantage of that to allow you to generate code for any available or created token using local variables.

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/theme-customization.mp4" type="video/mp4">
</video>

Visit the documentation to learn [how to insert the generated code into your theme file](/material-ui/design-resources/connect/#using-the-generated-theme/).

## Component customization

You can fully customize a component's appearance across multiple states in the Design Kit and then generate the corresponding theme code.
This is one of the most exciting features because it makes tweaking components incredibly fast and easier for designers!

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/custom-component.mp4" type="video/mp4">
</video>

:::warning
While in beta, not all components are supported yet.
We'll expand component coverage progressively in the coming months.
For now you can experiment with the Button and Switch.
:::

## Quick Storybook preview

The Connect plugin also bakes in an embedded Storybook preview panel so that you can conveniently play around with your changes and see how they interact with other props and states available in the component API.

<video preload="metadata" autoplay muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/storybook.mp4" type="video/mp4">
</video>

## Try Connect now

Get the beta version of Connect now, availble **for free** on the [Figma Community](https://www.figma.com/community/plugin/1336346114713490235/connect)!

There's still a lot to do, and we're looking forward to hearing from all of you [who requested this plugin years ago](https://github.com/mui/mui-design-kits/issues/10).

- Check out further documentation for [the Connect plugin](/material-ui/design-resources/connect/) and [the Material UI Design Kit](/material-ui/design-resources/material-ui-for-figma/).
- If you've got any feedback, we'd love to [hear from you](https://mui-connect.canny.io/feedback).

Happy designing! 👨‍🎨
