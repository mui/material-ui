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

## Delay client-side rendering

You can also use `NoSsr` to delay the rendering of specific components on the client side—for example, to let the rest of the application load before an especially complex or data-heavy component.

The following demo shows how to use the `defer` prop to prioritize rendering the rest of the app outside of what is nested within `NoSsr`:

{{"demo": "FrameDeferring.js"}}

> **Note**: when using `NoSsr` in this way, React applies [two commits](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) instead of one.
