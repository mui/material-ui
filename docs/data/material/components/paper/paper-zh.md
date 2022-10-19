---
product: material-ui
title: React Paper（纸张）组件
components: Paper
githubLabel: 'component: Paper'
---

# Paper 纸张

<p class="description">在 Material Design 中，我们在屏幕上展现了纸张的物理属性。 </p>

应用程序的背景类似于纸张的平坦、不透明的纹理，应用程序的行为模仿了纸张的能力，可以重新调整大小、洗牌和装订成多张纸。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础的纸张组件

{{"demo": "SimplePaper.js", "bg": true}}

## 变体

如果你想要一个轮廓的曲面，你可以使用 `variant` 属性。

{{"demo": "Variants.js", "bg": "inline"}}

## 高度

The elevation can be used to establish a hierarchy between other content. 实际上，高度控制着表面的阴影大小。 在黑暗模式下，提高高度也使表面变得更亮。

{{"demo": "Elevation.js", "bg": "inline"}}

黑暗模式下的阴影更改是通过对 `background-image` 属性应用半透明渐变来完成的。 当覆盖 `Paper`的样式时，这可能会导致混乱。 仅设置 `background-color` 属性不会影响与高度相关的阴影。 要在黑暗模式下忽略阴影并设置不受高度影响的背景颜色，请覆盖 `background<code> 属性（或同时覆盖 <code>background` 和 `background-image`）。
