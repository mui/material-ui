# Hidden

All elements are visible unless they are explicitly hidden.  To ease integration with our [responsive breakpoints](/responsive/basics), this component can be used to hide any content, or you can use it in conjunction with our [`Layout`](/responsive/layout) component.

## Implementations

### js

By default, the `js` implementation is used, responsively hiding content based on using the `withWidth()` HOC that watches screen size.  This has the benefit of not rendering any content at all unless the breakpoint is met.  

### css

For those using server side rendering, you can set `implementation='css'` if you don't want the browser to re-flow your content on the screen.

## How it works

Hidden works with a range of breakpoints e.g. `xsUp` or `mdDown` or one or more breakpoints e.g. `only='sm'` or `only={['md', 'xl']}`.  Ranges and individual breakpoints can be used simultaneously to achieve very customized behavior.

## Breakpoint up

Using any breakpoint _up_ property, any children of `Hidden` will be hidden _at or above_ the breakpoint (inclusive).

{{demo='pages/responsive/hidden/BreakpointUp.js'}}

## Breakpoint down

Using any breakpoint _down_ property, any children of `Hidden` will be hidden _below_ the breakpoint (exclusive).

{{demo='pages/responsive/hidden/BreakpointDown.js'}}

## Breakpoint only

The `only` property can be used in two ways:
 - list a single breakpoint
 - list an array of breakpoints

{{demo='pages/responsive/hidden/BreakpointOnly.js'}}

## Integration with Layout

It is quite common to alter `Layout` at different responsive breakpoints, and in many cases, you want to hide some of those elements.  For brevity, where you are already using `Layout`, you may specify `Hidden` behaviors as the `hidden` prop.

{{demo='pages/responsive/hidden/LayoutIntegration.js'}}
