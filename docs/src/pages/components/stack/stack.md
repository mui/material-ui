---
title: Stack React component
components: Stack
---

# Stack

<p class="description">The Stack layout component makes it simple to provided consistent horizontal or vertical spacing between components. It behaves similarly to Grid, but does not require its children to be Grid items.</p>

## How it works

- It uses [CSS’s Flexible Box module](https://www.w3.org/TR/css-flexbox-1/) for high flexibility.
- Children have margin to create the spacing between individual items.
- The Stack can be nested in itself or grid.

If you are **new to or unfamiliar with flexbox**, we encourage you to read this [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) guide.

## Basic stack

{{"demo": "pages/components/stack/BasicStack.js", "resizable": "horizontal"}}

## Vertical stack

{{"demo": "pages/components/stack/VerticalStack.js", "resizable": "vertical"}}

## Nested stacks

This example shows three vertical stacks nested in a horizontal stack.

{{"demo": "pages/components/stack/NestedStack.js", "resizable": "horizontal"}}

## Interactive demo

This interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/components/stack/InteractiveStack.js", "hideHeader": true}}
