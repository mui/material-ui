---
title: React 容器组件
components: Container
---

# 容器

<p class="description">容器会将其内容水平居中。 这是最基本的布局元素。</p>

虽然容器可以嵌套，但大多数布局不需要嵌套容器。

## 流体

自适应容器的最大宽度可以通过设置 `maxWidth` 属性来限制

```jsx
<Container maxWidth="sm">
```

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true}}

## 固定大小

如果您希望设计固定大小而不是尝试完全流体的视口，则可以设置 `fixed` 属性。 最大宽度和当前断点的最小宽度相同。

```jsx
<Container fixed>
```

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true}}