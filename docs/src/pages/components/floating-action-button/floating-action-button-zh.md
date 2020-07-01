---
title: React 浮动操作按钮组件
components: Fab
---

# Floating action button 浮动操作按钮组件

<p class="description">浮动操作按钮 (FAB) 通常用于在屏幕上执行一些主要的或是最为常见的操作。</p>

## Floating Action Buttons 浮动操作按钮

一个 [浮动操作按钮](https://material.io/design/components/buttons-floating-action-button.html) 出现在当前屏幕的所有内容之上，并且通常是中间有一个图标的圆形状。 FAB 有两种类型：常规的和扩展的。

仅当 FAB 属于最适合呈现屏幕主要操作的方式时，才使用它。

在每个屏幕中，我们建议只安排一个浮动操作按钮来表示最常见的操作。

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size 大小

您可以使用 `size` 属性来控制浮动操作按钮的大小。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation 动画

默认情况下，浮动操作按钮会以展开一片区域的动画在屏幕上出现。

当跨越多个横向屏幕（如标签式屏幕）时，浮动操作按钮应短暂消失，然后当动作改变的时候，重新出现。

您可以使用缩放动画（Zoom transition）来实现这个效果。 请注意，因为退出动画和进入动画都是同时触发的，所以我们需要使 `enterDelay` 方法，确保在新的浮动操作按钮进入之前，就已经执行完旧的那个的退出动作。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
