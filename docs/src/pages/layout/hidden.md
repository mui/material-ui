---
components: Hidden
---

# Hidden

All elements are visible unless **they are explicitly hidden**.
To ease integration with our [responsive breakpoints](/layout/basics),
this component can be used to hide any content,
or you can use it in conjunction with our [`Grid`](/layout/grid) component.

## How it works

Hidden works with a range of breakpoints e.g. `xsUp` or `mdDown`, or one or more breakpoints e.g. `only='sm'` or `only={['md', 'xl']}`.
Ranges and individual breakpoints can be used simultaneously to achieve very customized behavior.
The up range is inclusive while the down range is exclusive.

```js
innerWidth  |xs      sm      md      lg      xl
            |--------|-------|-------|-------|------->
width       |  xs    |  sm   |  md   |  lg   |  xl

smUp        |  show  | hide
mdDown      |  hide          |  show

```

## Implementations

### js

By default, the `js` implementation is used, responsively hiding content based on using the `withWidth()` Higher-order Component that watches screen size.
This has the benefit of not rendering any content at all unless the breakpoint is met.

### css

If you are using server side rendering, you can set `implementation="css"` if you don't want the browser to re-flow your content on the screen.

## Breakpoint up

Using any breakpoint `up` property, the given *children* will be hidden *at or above* the breakpoint.

{{"demo": "pages/layout/BreakpointUp.js"}}

## Breakpoint down

Using any breakpoint `down` property, the given *children* will be hidden *at or below* the breakpoint.

{{"demo": "pages/layout/BreakpointDown.js"}}

## Breakpoint only

Using the breakpoint `only` property, the given *children* will be hidden *at* the specified breakpoint(s).

The `only` property can be used in two ways:
 - list a single breakpoint
 - list an array of breakpoints

{{"demo": "pages/layout/BreakpointOnly.js"}}

## Integration with Grid

It is quite common to alter `Grid` at different responsive breakpoints, and in many cases, you want to hide some of those elements.
For brevity, where you are already using `Grid`, you may specify `Hidden` behaviors as the `hidden` property.

{{"demo": "pages/layout/GridIntegration.js"}}
