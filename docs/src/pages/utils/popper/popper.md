---
title: Popper React component
components: Popper
---

# Popper

<p class="description">A Popper can be used to display some content on top of another.</p>

Things to know when using the `Popper` component:
- Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
- The children is [`Portal`](/utils/portal) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll and click away aren't blocked like with the [`Popover`](/utils/popover) component.
The placement of the popper updates with the available area in the viewport.

## Simple Popper

{{"demo": "pages/utils/popper/SimplePopper.js" }}

## Scroll playground

{{"demo": "pages/utils/popper/ScrollPlayground.js"}}

## Positioned Popper

{{"demo": "pages/utils/popper/PositionedPopper.js"}}

## Without transition Popper

{{"demo": "pages/utils/popper/NoTransitionPopper.js"}}
