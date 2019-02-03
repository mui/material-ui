---
title: React-компонент Скрыть
components: Скрыть
---
# Скрыть

<p class="description">Быстро и оперативно переключайте значения видимости компонентов и многое другое с помощью наших утилит для скрытия.</p>

Все элементы видны, если **они явно не скрыты**. Чтобы упростить интеграцию с нашими [ точками остановки](/layout/basics/), этот компонент можно использовать для скрытия любого контента, или использовать его вместе с нашим компонентом [`Grid`](/layout/grid/).

## Как это работает

Скрытие работает с диапазоном точек остановки, например, `xsUp` или `mdDown`, или использует одну или несколько точек остановки, например, `only='sm'` или `only={['md', 'xl']}`. Диапазоны и отдельные точки остановки могут использоваться одновременно для достижения индивидуального поведения. The ranges are inclusive of the specified breakpoints.

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