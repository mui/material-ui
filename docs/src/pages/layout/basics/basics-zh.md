# 基础

<p class="description">Material Design布局鼓励通过统一的元素和间隔来实现跨平台、环境、屏幕尺寸的一致性。</p>

## 响应式UI

Material Design中的[响应式布局](https://material.io/design/layout/responsive-layout-grid.html)可适配任何可能的屏幕尺寸。 我们提供以下工具以实现响应式UI：

- [Grid](/layout/grid/)：网格在布局之间创建视觉一致性，同时允许各种设计的灵活性。
- [Breakpoints](/layout/breakpoints/)：我们提供了一个低级API，可以在各种环境中使用断点。
- [useMediaQuery](/layout/use-media-query/)：这是React的CSS媒体查询钩子。
- [Hidden](/layout/hidden/)： Hidden（隐藏）组件可用于改变元素的可见状态。

## z-index

一些Material-UI组件利用`z-index`这个CSS属性，通过提供编排内容的第三轴，来控制布局。 我们在Material-UI中使用一套默认的z-index刻度，被设计用于layer drawer、snackbars、tooltips等控件。

[这些值](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/zIndex.js)从任意数字开始，足够大和特别来避免冲突。

- mobile stepper（移动设备起步）: 1000
- app bar（应用栏）：1100
- drawer（抽屉）：1200
- modal（浮层）：1300
- snackbar：1400
- tooltip（提示）：1500

这些值可以自定义。 你可在theme（主题）的[`zIndex`](/customization/default-theme/?expend-path=$.zIndex)键中找到它们。 我们不建议自定义不同的值，如果你修改了其中一项，你很可能需要修改全部。