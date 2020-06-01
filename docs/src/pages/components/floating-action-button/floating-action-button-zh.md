---
title: React Fab 浮动操作按钮组件
components: Fab
---

# Floating action button 浮动操作按钮

<p class="description">浮动操作按钮 (FAB) 通常用于在屏幕上执行一些主要的或是最为常见的操作。</p>

## Floating Action Buttons 浮动操作按钮

[浮动操作按钮](https://material.io/design/components/buttons-floating-action-button.html) 出现在所有屏幕内容的前面，通常是以圆形的形状出现，中间有一个图标。 FAB 有两种类型：常规的和扩展的。

仅在最适合显示屏幕主要操作的方式时才使用 FAB。

在每个屏幕中，我们建议只有一个浮动操作按钮来表示最常见的操作。

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size 大小

使用 `size` prop 属性来控制 FAB 的大小。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation 动画

默认情况下，浮动操作按钮会以展开的动画出现在屏幕上。

跨越多个横向屏幕（例如标签式屏幕）的浮动操作按钮应该短暂消失， 然后如果其动作改变则重新出现。

可以用缩放过渡来实现。 请注意，由于退出和进入 动画同时被触发，我们使用 `enterDelay` 来允许传出的浮动操作按钮的 动画，在新的动画进入之前完成。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
