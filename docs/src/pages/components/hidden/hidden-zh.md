---
title: React Hidden（隐藏）组件
components: Hidden
---

# Hidden 隐藏组件

<p class="description">您可以使用隐藏组件来实现快速并响应式地控制元素的显隐。</p>

除非**明确指定是隐藏的**，所有元素都是可见的。 为了简化与 [响应式断点](/customization/breakpoints/) 的集成，此组件可用于隐藏任何内容，或者您可以将它与我们的 [`栅格（Grid）`](/components/grid/) 组件结合使用。

## 它是如何工作的

通常我们将隐藏组件和一系列 breakpoint（断点）放在一起使用。例如 `xsUp` 或 `mdDown`，或一个或多个断点，例如 `only='sm'` 或 `only={['md', 'xl']}`。 可以同时使用范围（Ranges）和单独的断点（breakpoints）来实现极其定制的行为。 范围包括指定的断点。

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## 实现

### js

默认情况下，使用 `js` 实现，响应性的隐藏内容基于 [`withWidth()`](/customization/breakpoints/#withwidth) 这个高阶组件所观察到的屏幕大小。 这样的好处是，除非达到断点，否则根本不会呈现任何内容。

### css

如果您正在使用服务器端渲染，如果您不希望浏览器在屏幕上重新过一遍您的内容，则可以设置 `implementation="css"` 。

## 断点之上（Breakpoint up）

当使用任何断点 `up` 属性，给定的*子元素* 将在*断点及以上的范围*时被隐藏。

{{"demo": "pages/components/hidden/BreakpointUp.js", "bg": true}}

## 断点之下（Breakpoint down）

当使用任何断点 `down` 属性，给定的*子元素* 将在*断点及以下的范围*时被隐藏。

{{"demo": "pages/components/hidden/BreakpointDown.js", "bg": true}}

## 仅限断点

当使用断点 `only` 属性，给定的*子元素*将在 *在* 指定的断点（们）被隐藏。

使用 `only` 属性有这样两种方式：

- 列出单独一个断点
- 列出一个断点数组

{{"demo": "pages/components/hidden/BreakpointOnly.js", "bg": true}}

## 与栅格（Grid）整合

在不同的响应断点处更改 `Grid` 是很常见的，并且在许多情况下，您会希望隐藏其中一些元素。

{{"demo": "pages/components/hidden/GridIntegration.js", "bg": true}}