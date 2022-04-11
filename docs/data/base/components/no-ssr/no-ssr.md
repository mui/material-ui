---
product: base
title: No SSR React component
components: NoSsr
packageName: '@mui/base'
---

# No SSR

<p class="description">The <code>NoSsr</code> component defers the rendering of children components from the server to the client.</p>

This component can be useful in a variety of situations:

- To create an escape hatch for broken dependencies that don't support server-side rendering (SSR)
- To improve the time to first paint by only rendering above the fold
- To reduce the rendering time on the server
- To turn on service degradation when the server load is too heavy
- To improve the Time to Interactive (TTI) by only rendering what's important (using the `defer` prop)

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic usage

At its core, the `NoSsr` component's purpose is to **defer rendering** from the server to the client, as shown in the following demo:

{{"demo": "SimpleNoSsr.js"}}

## Frame deferring

You can also use `NoSsr` to defer rendering within the client itself.
You can **wait a screen frame** with the `defer` property to render the children.

> **Note**: when using `NoSsr` in this way, React applies [two commits](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) instead of one.

{{"demo": "FrameDeferring.js"}}
