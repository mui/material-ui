---
components: Collapse, Fade, Grow, Slide, Zoom
---

# Transitions

Material-UI provides a number of transitions that can be used to introduce some basic
[motion](https://material.io/guidelines/motion/material-motion.html)
to your applications components.

## Collapse

Expand vertically from the top of the child element.
The `collapsedHeight` property can be used to set the minimum height when not expanded.

{{"demo": "pages/utils/transitions/SimpleCollapse.js"}}

## Fade

Fade in from transparent to opaque.

{{"demo": "pages/utils/transitions/SimpleFade.js"}}

## Grow

Expand outwards from the center of the child element, while also fading in
from transparent to opaque.

{{"demo": "pages/utils/transitions/SimpleGrow.js"}}

## Slide

Slide in from the edge of the screen.
The `direction` property controls which edge of the screen the transition starts from.

The Transition component's  `mountOnEnter` property prevents the child component from being mounted
until `in` is `true`. This prevents the relatively positioned component from scrolling into view
from it's off-screen position. Similarly the `unmountOnExit` property removes the component
from the DOM after it has been transition off screen.

{{"demo": "pages/utils/transitions/SimpleSlide.js"}}

## Zoom

Expand outwards from the center of the child element.

This example demonstrates how to delay the enter transition.

{{"demo": "pages/utils/transitions/SimpleZoom.js"}}
