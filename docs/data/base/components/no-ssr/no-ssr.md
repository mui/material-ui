---
productId: base-ui
title: No SSR React component
components: NoSsr
---

# No SSR

<p class="description">The No-SSR component defers the rendering of children components from the server to the client.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

No-SSR is a utility component that prevents its children from being rendered on the server.

This component can be useful in a variety of situations:

- To create an escape hatch for broken dependencies that don't support server-side rendering (SSR)
- To improve the time to first paint by only rendering above the fold
- To reduce the rendering time on the server
- To turn on service degradation when the server load is too heavy
- To improve the Time to Interactive (TTI) by only rendering what's important (using the `defer` prop)

## Component

```jsx
import { NoSsr } from '@mui/base/NoSsr';
```

At its core, the No-SSR component's purpose is to defer rendering from the server to the client, as shown in the following demo:

{{"demo": "SimpleNoSsr.js"}}

## Customization

### Delay client-side rendering

You can also use No-SSR to delay the rendering of specific components on the client-side—for example, to let the rest of the application load before an especially complex or data-heavy component.

The following demo shows how to use the `defer` prop to prioritize rendering the rest of the app outside of what is nested within No-SSR:

{{"demo": "FrameDeferring.js"}}

:::warning
When using No-SSR in this way, React applies [two commits](https://react.dev/learn/render-and-commit) instead of one.
:::
