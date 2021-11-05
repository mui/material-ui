---
title: React Container（容器）组件
components: Container
githubLabel: 'component: Container'
---

# Container 容器

<p class="description">通过容器组件，您页面的内容会呈现水平居中。 这是最基本的布局元素。</p>

虽然容器可以嵌套，但大多数布局不需要嵌套的容器。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Fluid 流体布局

一个 fluid 容器所能达到的宽度被 `maxWidth` 属性的值所限制。

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## 固定大小

通过设置 `fixed` 属性，您可以设计固定的大小而不是尝试完全流体布局的视口。 max-width 和当前断点的 min-width 则相同。

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```
