---
productId: system
title: React Container component
components: Container
githubLabel: 'component: Container'
---

# Container

<p class="description">The container centers your content horizontally. It's the most basic layout element.</p>

While containers can be nested, most layouts do not require a nested container.

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

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
