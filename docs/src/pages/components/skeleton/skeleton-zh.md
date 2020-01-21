---
title: Skeleton React component
components: Skeleton
---

# 骨架屏

<p class="description">骨架屏可以在获取到数据之前显示一个预览占位符，从而减轻由加载时间造成的困扰。</p>

当组件需要的数据或许无法立即获取时， 你就可以使用骨架屏来提升用户观感上的表现。 就好像能够感觉到事情马上就要发生了，然后信息再逐步的显示在屏幕上(Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797))。

这个组件可以**直接在你的组件中**使用。 就像这样：

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## 变种(Variants)

The component supports 3 shape variants.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Animations

By default, the skeleton pulsate, but you can change the animation for a wave or disable it entirely.

{{"demo": "pages/components/skeleton/Animations.js"}}

## YouTube example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

## Facebook example

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}