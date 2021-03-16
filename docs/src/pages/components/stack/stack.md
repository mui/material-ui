---
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack

<p class="description">The Stack component manages children along the vertical and horizontal axes with optional spacing between children.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Usage

`Stack` is concerned with one-dimensional layouts compared to [`Grid`](/components/grid/) that handles two-dimensional layouts. The default direction is `column` which stacks children vertically. To control space between children, use the `spacing` prop.

{{"demo": "pages/components/stack/IntroStack.js", "bg": true}}

## Direction

`Stack` can either position items in a `row` or `column`.

{{"demo": "pages/components/stack/DirectionStack.js", "bg": true}}

## Dividers

Use the `divider` prop to insert an element between each child.

{{"demo": "pages/components/stack/DividerStack.js", "bg": true}}

## Responsive values

Easily switch out `direction` or `spacing` based on the current active breakpoint. Note, that each breakpoint is required to define both properties.

{{"demo": "pages/components/stack/ResponsiveStack.js", "bg": true}}

## Playground

{{"demo": "pages/components/stack/InteractiveStack.js", "hideToolbar": true, "bg": true}}
