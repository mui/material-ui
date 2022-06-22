---
product: material-ui
title: React Paper（纸张）组件
components: Paper
githubLabel: 'component: Paper'
---

# Paper

<p class="description">在 Material Design 中，我们在屏幕上展现了纸张的物理属性。 </p>

应用程序的背景类似于纸张的平坦、不透明的纹理，应用程序的行为模仿了纸张的能力，可以重新调整大小、洗牌和装订成多张纸。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础的纸张组件

{{"demo": "SimplePaper.js", "bg": true}}

## 变体

如果你想要一个轮廓的曲面，你可以使用 `variant` 属性。

{{"demo": "Variants.js", "bg": "inline"}}

## Elevation

The elevation can be used to establish a hierarchy between other content. The elevation can be used to establish a hierachy between other content. In practical terms, the elevation controls the size of the shadow applied to the surface. In dark mode, raising the elevation also makes the surface lighter. 在黑暗模式下，提高高度也使表面变得更亮。

{{"demo": "Elevation.js", "bg": "inline"}}

黑暗模式下的阴影更改是通过对 `background-image` 属性应用半透明渐变来完成的。 当覆盖 `Paper`的样式时，这可能会导致混乱。 仅设置 `background-color` 属性不会影响与高度相关的阴影。 The change of shade in dark mode is done by applying a semi-transparent gradient to the `background-image` property. This can lead to confusion when overriding the styles of `Paper`, as setting just the `background-color` property will not affect the elevation-related shading. To ignore the shading and set the background color that is not affected by elevation in dark mode, override the `background` property (or both `background-color` and `background-image`). This can lead to confusion when overriding the styles of `Paper`, as setting just the `background-color` property will not affect the elevation-related shading. To ignore the shading and set the background color that is not affected by elevation in dark mode, override the `background` property (or both `background-color` and `background-image`).
