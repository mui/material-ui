---
title: 'Introducing Connect: a Figma plugin that exports Material UI code'
description: Connect is perfect for designing and developing using the Material UI React library and Design Kit.
date: 2022-09-07T00:00:00.000Z
authors: ['danilo-leal', 'DavidCnoops']
tags: ['Connect', 'Material UI', 'Product']
card: false
---

A few years ago, we released the [Material UI Design Kit for Figma](/store/items/figma-react/).
Since then, we've heard from many designers who use Material UI as their React component library of choice.
They've expressed how much faster their process could be if they could hand over production-ready code generated directly from the design software to developers.

That's precisely why we developed Connect.
Ultimately, the goal for the Design Kits has always been to increase the efficiency and speed of the whole team that uses Material UI.
The Connect plugin, that's [available now in beta](https://www.figma.com/community/plugin/1336346114713490235/connect), is a bridge that draws designers and developers closer, facilitating the way new designs reach the codebase.

## Theme customizations

Connect works from the Design Kit's v0 up because that was when it started to support Figma's local variables.
This feature has significantly matured the world of design tokens for Figma, and Material UI has been doing this for a while with all of its theming features.

So, you can use Connect to generate a theme for any local variable and style included in the Design Kit.
Maybe you want to go very far from a standard Material Design-looking button and explore something different?
Quickly generate the code with all the tokens you've modified and apply it to your codebase.

## Component customization

You can also drastically change a component's appearance (in multiple states) in the Design Kit and generate the corresponding theme code.
This is one of the most exciting features because it makes tweaking components incredibly fast!

While in beta, not all components are supported yet.
We'll be expanding component coverage progressively in the coming months.
At the moment, you can play around with the Button, Switch, and Typography!

## Quick Storybook preview

On Figma, it's easy to see all states of a certain component but not necessarily interact with them.
That's why we've included a quick Storybook preview panel on the plugin so that you can conveniently play around with your changes and see how they interact with other props available in the component interface.

## Try Connect now!

Get the beta version of Connect now, [availble for free](https://www.figma.com/community/plugin/1336346114713490235/connect) on MUI's Figma community profile.
We're excited to see you take it for a spin.
There's still a lot to do, but we're looking forward to hearing from all of you [who requested this plugin years ago](https://github.com/mui/mui-design-kits/issues/10).

- Check out further documentation for the Connect plugin and the Material UI Design Kit (To-be-removed note: I'll add links here once the corresponding PR for their docs is merged).
- If you've got any feedback, we'd love to [hear from you here](https://mui-connect.canny.io/feedback).

Happy designing!
