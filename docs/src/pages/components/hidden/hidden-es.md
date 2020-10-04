---
title: React Hidden component
components: Hidden
---

# Hidden

<p class="description">Hidden: Cambia rápida y de manera responsiva el valor de visibilidad de los componentes y más con nuestras utilidades ocultas.</p>

Todos los elementos son visibles a menos que **estén explícitamente ocultos**. Para facilitar la integración con [interrupción responsivas](/customization/breakpoints/) de Material-UI, éste componente se puede usar para ocultar cualquier contenido, o puede usarlo junto con el componente [`Grid`](/components/grid/).

## Cómo funciona

Hidden funciona con un rango de puntos de interrupción, por ejemplo, `xsUp` o `mdDown`, o uno o más puntos de interrupción, por ejemplo, `only = 'sm'` o `only = {['md', 'xl']}`. Los rangos y los puntos de interrupción individuales se pueden usar simultáneamente para lograr un comportamiento muy personalizado. Los rangos son inclusivas de los puntos de interrupción.

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## Implementación

### js

By default, the `js` implementation is used, responsively hiding content based on using the [`withWidth()`](/customization/breakpoints/#withwidth) higher-order component that watches screen size. This has the benefit of not rendering any content at all unless the breakpoint is met.

### css

If you are using server-side rendering, you can set `implementation="css"` if you don't want the browser to re-flow your content on the screen.

## Breakpoint up

Using any breakpoint `up` property, the given *children* will be hidden *at or above* the breakpoint.

{{"demo": "pages/components/hidden/BreakpointUp.js", "bg": true}}

## Breakpoint down

Using any breakpoint `down` property, the given *children* will be hidden *at or below* the breakpoint.

{{"demo": "pages/components/hidden/BreakpointDown.js", "bg": true}}

## Breakpoint only

Using the breakpoint `only` property, the given *children* will be hidden *at* the specified breakpoint(s).

The `only` property can be used in two ways:

- list a single breakpoint
- list an array of breakpoints

{{"demo": "pages/components/hidden/BreakpointOnly.js", "bg": true}}

## Integration with Grid

It is quite common to alter `Grid` at different responsive breakpoints, and in many cases, you want to hide some of those elements.

{{"demo": "pages/components/hidden/GridIntegration.js", "bg": true}}