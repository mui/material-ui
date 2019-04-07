---
title: React 容器组件
components: Container
---
# 容器

<p class="description">容器会将其内容水平居中。 这是最基本的布局元素。</p>

While containers can be nested, most layouts do not require a nested container.

## Fluid

A fluid container width is bounded by that `maxWidth` property value.

```jsx
<Container maxWidth="sm">
```

{{"demo": "pages/layout/container/SimpleContainer.js", "iframe": true}}

## Fixed

If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the `fixed` property. The max-width matches the min-width of the current breakpoint.

```jsx
<Container fixed>
```

{{"demo": "pages/layout/container/FixedContainer.js", "iframe": true}}