---
title: 隐藏的React组件
components: Hidden
---

# Hidden

<p class="description">使用我们的Hidden组件快速并响应式地切换元素的显隐。</p>

除非**明确隐藏**，否则所有元素都可见。 To ease integration with Material-UI's [responsive breakpoints](/customization/breakpoints/), this component can be used to hide any content, or you can use it in conjunction with our [`Grid`](/components/grid/) component.

## 它是如何工作的

隐蔽工程与一系列断点例如 `xsUp` 或 `mdDown`，或一个或多个断点例如 `只= 'SM'` 或 `只= {[ 'MD'， 'XL']}`。 可以同时使用范围和单个断点来实现非常自定义的行为。 范围包括指定的断点。

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## 实现

### js

默认情况下，使用 `js` 实现，响应性地隐藏基于使用监视屏幕大小的 [`withWidth()`](/customization/breakpoints/#withwidth) 高阶组件的内容。 除非满足断点，否则这样做的好处是根本不呈现任何内容。

### css

如果您正在使用服务器端呈现，则可以设置 `implementation="css"` 如果您不希望浏览器在屏幕上重新流动您的内容。

## 断点了

使用任何断点 `up` 属性，给定 *孩子* 将被隐藏 *或高于* 的断点。

{{"demo": "pages/components/hidden/BreakpointUp.js"}}

## 断点下来

使用任何断点 `down` 属性，给定 *孩子* 将被隐藏 *或低于* 的断点。

{{"demo": "pages/components/hidden/BreakpointDown.js"}}

## 仅限断点

利用断点 `only` 属性，给定 *孩子* 将被隐藏 *在* 指定的断点（多个）。

`only` 属性可以两种方式使用：

- 列出一个断点
- 列出一个断点数组

{{"demo": "pages/components/hidden/BreakpointOnly.js"}}

## 与网格集成

在不同的响应断点处更改 `Grid` 是很常见的，并且在许多情况下，您希望隐藏其中一些元素。

{{"demo": "pages/components/hidden/GridIntegration.js"}}