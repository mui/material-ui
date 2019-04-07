---
title: Layout React component
components: Container
---
# Layout

<p class="description">Components and options for laying out your project.</p>

## CssBasline

The [`CssBasline` component](/getting-started/usage/#cssbaseline) removes the default browser margin on the `<body>` element. Use it, or make sure the margin is removed:

```css
body {
  margin: 0;
}
```

## Container

The container centers your content horizontally. It's the most basic layout element. While containers can be nested, most layouts do not require a nested container.

### Fluid

A fluid container width is bounded by that `maxWidth` property value.

```jsx
<Container maxWidth="sm">
```

{{"demo": "pages/layout/layout/SimpleContainer.js", "iframe": true}}

### Fixed

If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the `fixed` property. The max-width matches the min-width of the current breakpoint.

```jsx
<Container fixed>
```

{{"demo": "pages/layout/layout/FixedContainer.js", "iframe": true}}