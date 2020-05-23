---
title: Fab React component
components: Fab
---

# Floating action button 提升动作按钮

<p class="description">提升动作按钮 (FAB) 通常用于在屏幕上执行一些主要的或是最为常见的操作。</p>

## Floating Action Button

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) appears in front of all screen content, 通常为圆形，且中间有一个图标。 FAB有两种类型：常规的和扩展的。

只使用FAB是最适合呈现屏幕主要操作的方法。

在每个屏幕中，我们建议只有一个浮动操作按钮来表示最常见的操作。

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size 大小

使用 `size` prop 属性来控制 FAB 的大小。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation 动画

默认情况下，浮动操作按钮会以展开的动画出现在屏幕上。

跨越多个横向屏幕（例如标签式屏幕）的浮动操作按钮应该短暂消失， 然后如果其动作改变则重新出现。

可以使用缩放转换来实现此目的。 注意，既然退出和进入动画同时被触发，我们使用`enterDelay`来允许旧的浮动动作按钮动画在新的按钮进入之前完成。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
