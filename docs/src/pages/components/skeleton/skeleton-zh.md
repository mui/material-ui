---
title: React Skeleton 骨架屏组件
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

### 脉动动画例子

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### 波浪动画例子

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## 推断尺寸

除了接受 `width` 和 `height` props 外，组件还可以推断出尺寸。

当涉及到排版时，它很好用，因为它的高度是用 `em` 单位设置的。

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

但是，当涉及到其他组件时，你可能不想重复宽度和 高度 在这些情况下，你可以通过 `children`，然后它将会 从它们中推断出它的宽度和高度。

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## 可访问性

骨架屏提供了一个可替代传统 进度条(spinner) 的解决方案。 骨架屏不是一个抽象的小部件，而是提供一个对未来事件的预期，来减少人们的认知负荷。

骨架屏使用的背景色是在良好条件下可见的最小亮度（良好的环境光、良好的屏幕、无视觉障碍）。