---
title: 骨架屏 React 组件
components: Skeleton
---

# Skeleton 骨架屏

<p class="description">骨架屏可以在获取到数据之前显示一个预览占位符，从而减轻由加载时间造成的困扰。</p>

当组件需要的数据或许无法立即获取时， 你就可以使用骨架屏来提升用户观感上的表现。 就好像能够感觉到事情马上就要发生了，然后信息在逐步的显示在屏幕上(Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797))。

这个组件可以**直接在你的组件中**使用。 就像这样：

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## 变种

该组件支持 3 个形状变体 (shape variants)。

{{"demo": "pages/components/skeleton/Variants.js"}}

## 动画

默认情况下，骨骼使用 "pulsate"，但是您可以更改为 "wave" 动画或完全禁用它。

{{"demo": "pages/components/skeleton/Animations.js"}}

## YouTube 示例

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

## Facebook 示例

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Inferring dimensions

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

But when it comes to other components, you may not want to repeat the width and height. In these instances, you can pass `children` and it will infer its width and height from them.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}