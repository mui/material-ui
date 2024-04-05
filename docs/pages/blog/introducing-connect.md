---
title: 'Introducing Connect: a Figma plugin that exports Material UI code'
description: Connect is perfect for designing and developing using the Material UI React library and Design Kit.
date: 2024-04-06T00:00:00.000Z
authors: ['danilo-leal', 'DavidCnoops']
tags: ['Connect', 'Material UI', 'Product']
card: true
---

A few years ago, we released the [Material UI Design Kit for Figma](/store/items/figma-react/).
Since then, many designers who use it expressed how much faster their process would be if they could hand over production-ready code generated directly from the design software to developers using the Material UI React library.

That's why Connect, a Figma plugin, was developed and it's now [available now in beta](https://www.figma.com/community/plugin/1336346114713490235/connect)! 🎉

Ultimately, the goal for the Design Kits is to increase the efficiency and speed of the entire team that is using Material UI, drawing designers and developers closer by facilitating the way new designs reach the codebase.

## Theme customization

Connect works from the [Design Kit's v5.16.0](https://github.com/mui/mui-design-kits/releases/tag/v5.16.0) up as that was when it started to support Figma's local variables.
This feature has significantly matured the use of design tokens, which is something Material UI has been doing for a while with all of [its theming features](/material-ui/customization/theming/).

That means you can use Connect to generate code for any customized local variable and style included in the Design Kit.

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/theme-customization.mp4" type="video/mp4">
</video>

<!-- Visit the documentation to learn [how to insert the generated code into your theme file](/material-ui/design-resources/connect/#using-the-generated-theme/). -->
<!-- I remove the comment from the line above once we publish the docs, otherwise this PR's checks will fail -->

## Component customization

You can also drastically change a component's appearance (in multiple states) in the Design Kit and generate the corresponding theme code.
This is one of the most exciting features because it makes tweaking components incredibly fast!

<video preload="metadata" controls muted loop playsinline width="1584" height="1080">
  <source src="/static/blog/introducing-connect/custom-component.mp4" type="video/mp4">
</video>

:::warning
While in beta, not all components are supported yet.
We'll expand component coverage progressively in the coming months.
For now, you can play around with the Button, Switch, and Typography!
:::

## Quick Storybook preview

On Figma, it's possible to see all states of a certain component but not necessarily interact with them.
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
