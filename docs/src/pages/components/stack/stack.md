---
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack

<p class="description">The Stack component manages layout of immediate children along the vertical and horizontal axes with optional spacing and/or dividers between each child.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Usage

`Stack` is concerned with one-dimensional layouts compared to [Grid](/components/grid/) that handles two-dimensional layouts. The default direction is `column` which stacks children vertically. To control space between children, use the `spacing` prop.

{{"demo": "pages/components/stack/IntroStack.js", "bg": true}}

## Direction

By default, `Stack` positions items vertically in a `column`. The `direction` prop can be used to position items horizontally in a `row` as well.

{{"demo": "pages/components/stack/DirectionStack.js", "bg": true}}

## Dividers

Use the `divider` prop to insert an element between each child. This works particularly well with the [Divider](/components/divider/) component.

{{"demo": "pages/components/stack/DividerStack.js", "bg": true}}

## Responsive values

Easily switch out `direction` or `spacing` based on the active breakpoint. Note, that each breakpoint is required to define each property.

{{"demo": "pages/components/stack/ResponsiveStack.js", "bg": true}}

## Playground

{{"demo": "pages/components/stack/InteractiveStack.js", "hideToolbar": true, "bg": true}}
