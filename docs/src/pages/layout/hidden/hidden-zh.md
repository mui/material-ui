---
title: Hidden React component
components: Hidden
---
# Hidden

<p class="description">使用我们的Hidden组件快速并响应式地切换元素的显隐。</p>

除非**明确隐藏**，否则所有元素都可见。 为了简化与[响应式断点](/layout/basics/)的集成， 此组件可用于隐藏任何内容， 或者您可以将它与我们的[ ` 栅格 ` ](/layout/grid/)组件结合使用。

## 工作方式

Hidden works with a range of breakpoints e.g. `xsUp` or `mdDown`, or one or more breakpoints e.g. `only='sm'` or `only={['md', 'xl']}`. Ranges and individual breakpoints can be used simultaneously to achieve very customized behavior. The ranges are inclusive of the specified breakpoints.

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## Implementations

### js

By default, the `js` implementation is used, responsively hiding content based on using the [`withWidth()`](/layout/breakpoints/#withwidth-) higher-order component that watches screen size. This has the benefit of not rendering any content at all unless the breakpoint is met.

### css

If you are using server-side rendering, you can set `implementation="css"` if you don't want the browser to re-flow your content on the screen.

## Breakpoint up

Using any breakpoint `up` property, the given *children* will be hidden *at or above* the breakpoint.

{{"demo": "pages/layout/hidden/BreakpointUp.js"}}

## Breakpoint down

Using any breakpoint `down` property, the given *children* will be hidden *at or below* the breakpoint.

{{"demo": "pages/layout/hidden/BreakpointDown.js"}}

## Breakpoint only

Using the breakpoint `only` property, the given *children* will be hidden *at* the specified breakpoint(s).

The `only` property can be used in two ways:

- list a single breakpoint
- list an array of breakpoints

{{"demo": "pages/layout/hidden/BreakpointOnly.js"}}

## Integration with Grid

It is quite common to alter `Grid` at different responsive breakpoints, and in many cases, you want to hide some of those elements.

{{"demo": "pages/layout/hidden/GridIntegration.js"}}