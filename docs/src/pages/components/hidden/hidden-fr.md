---
title: Composant React Hidden
components: Hidden
githubLabel: 'component: Hidden'
---

# Hidden

<p class="description">Quickly and responsively toggle the visibility value of components and more with the hidden utilities.</p>

Tous les éléments sont visibles à moins **qu'ils soient explicitement cachés**. To ease integration with Material-UI's [responsive breakpoints](/customization/breakpoints/), this component can be used to hide any content, or you can use it in conjunction with the [`Grid`](/components/grid/) component.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Comment ça marche

Hidden works with a range of breakpoints e.g. `xsUp` or `mdDown`, or one or more breakpoints e.g. `only='sm'` or `only={['md', 'xl']}`. Ranges and individual breakpoints can be used simultaneously to achieve very customized behavior. The ranges are inclusive of the specified breakpoints.

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## Implémentations

### js

By default, the `js` implementation is used, responsively hiding content based on using the [`withWidth()`](/customization/breakpoints/#withwidth) higher-order component that watches screen size. This has the benefit of not rendering any content at all unless the breakpoint is met.

### css

If you are using server-side rendering, you can set `implementation="css"` if you don't want the browser to re-flow your content on the screen.

## Breakpoint up

En utilisant n'importe quel accessoire de point d'arrêt `up`, les _enfants_ donnés seront cachés _à ou au-dessus_ le point d'arrêt.

{{"demo": "pages/components/hidden/BreakpointUp.js", "bg": true}}

## Breakpoint down

En utilisant n'importe quel accessoire de point d'arrêt `down`, les _enfants_ donnés seront cachés _à ou en dessous_ le point d'arrêt.

{{"demo": "pages/components/hidden/BreakpointDown.js", "bg": true}}

## Breakpoint only

En utilisant le point d'arrêt `uniquement` prop, les _enfants_ donnés seront cachés _au_ spécifié point(s) d'arrêt.

Le prop `only` peut être utilisée de deux manières :

- list a single breakpoint
- list an array of breakpoints

{{"demo": "pages/components/hidden/BreakpointOnly.js", "bg": true}}

## Integration with Grid

It is quite common to alter `Grid` at different responsive breakpoints, and in many cases, you want to hide some of those elements.

{{"demo": "pages/components/hidden/GridIntegration.js", "bg": true}}
