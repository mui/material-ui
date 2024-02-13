---
productId: material-ui
title: React Container component
components: Container
githubLabel: 'component: Container'
---

# Container

<p class="description">The Container component centers primary layout elements with a responsive or fixed width.</p>

The Container component is intended to be a top-level generic container for centering the layout of your page or app.
Containers can have a [responsive](#responsive) or [fixed](#fixed) width.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Fluid

A fluid container width is bounded by the `maxWidth` prop value.

{{"demo": "SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fixed

If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the `fixed` prop.
The max-width matches the min-width of the current breakpoint.

{{"demo": "FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```
