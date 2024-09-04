---
title: Introducing Toolpad Core
description: Material UI-based components and tools for building dashboards and internal apps.
date: 2024-09-03T00:00:00.000Z
authors: ['prakhargupta']
manualCard: true
tags: ['Product', 'Toolpad']
---

At MUI, our vision is to provide a unified UI creation ecosystem for web developers. We try to reflect the diverse ways in which developers build UIs in our product offerings:

- Material UI: Low-level components that developers use to build UIs of varying complexity and size.
- MUI X: Advanced components that enable developers to include data-intensive functionality in their apps.
- Templates: Ready-to-use interfaces for developers who need a good-looking starting point to extend from.

Today, we're extending that ecosystem by launching Toolpad Core. If you're someone who's started out with templates before but found them to require too much manual setup, or built internal tools with Material UI and MUI X but found it difficult to integrate them together and with other third-party libraries, then [Toolpad Core](https://mui.com/toolpad/) is for you.

## Toolpad Core

<a href="https://mui.com/toolpad/">
<img alt="MUI public app for tracking KPIs" src="/static/blog/introducing-toolpad-core/toolpad-core.png" width="2400" height="1394" />
</a>

With Toolpad Core we're building a set of higher-level abstractions to get you from zero to one faster. We're also building a CLI tool to help scaffold your project. The goal is for your project to contain less code for common UI use cases that don't require frequent updates.

The beta release includes the following component sets:

- [layout and navigation](https://mui.com/toolpad/core/react-dashboard-layout/)
- [page container](https://mui.com/toolpad/core/react-page-container/)
- [sign-in and account display](https://mui.com/toolpad/core/react-sign-in-page/)
- [dialogs](https://mui.com/toolpad/core/react-use-dialogs/)
- [notifications](https://mui.com/toolpad/core/react-use-notifications/)
- [persisted state](https://mui.com/toolpad/core/react-persistent-state/)

<video controls width="100%" height="auto" style="contain" alt="toolpad core product walkthrough">
  <source src="/static/blog/introducing-toolpad-core/toolpad_core_walkthrough.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

By integrating Toolpad Core components with your existing Material UI and MUI X components, you can build dashboards and internal apps faster than ever before.

We plan to continue to work on MUI's mission—to enable developers of any level to quickly and efficiently build UIs that feel amazing. We'll be rolling out more features and updates regularly as we accelerate Toolpad Core's development. We're actively seeking feedback and feature requests, and we encourage you to get involved by [creating an issue](https://github.com/mui/mui-toolpad)!

## What's next

In the coming months, we'll offer a well-designed dashboard template powered by Toolpad components. This should help you kickstart your next internal tool faster.

In another initiative, we want to offer a CRUD component in Toolpad Core. It's a critical internal tool feature that a lot of users build from scratch. If this interests you, please visit [this](https://github.com/mui/mui-toolpad/discussions/3311) RFC for more details.

In case you need any further information, feel free to reach out to the team at toolpad@mui.com.
