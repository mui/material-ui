---
title: React 容器组件
components: Container
---

# 容器

<p class="description">容器会将其内容水平居中。 这是最基本的布局元素。</p>

While containers can be nested, most layouts do not require a nested container.

## 自适应

自适应容器的最大宽度可以通过设置 `maxWidth` 属性来限制

```jsx
<Container maxWidth="sm">
```

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true}}

## 固定大小

If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the `fixed` property. The max-width matches the min-width of the current breakpoint.

```jsx
<Container fixed>
```

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true}}