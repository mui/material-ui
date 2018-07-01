---
title: Tooltip React component
components: Tooltip
---

# Tooltips

<p class="description">Tooltips display informative text when users hover over, focus on, or tap an element.</p>

When activated, [Tooltips](https://material.io/design/components/tooltips.html) display a text label identifying an element, such as a description of its function.

## Simple Tooltips

{{"demo": "pages/demos/tooltips/SimpleTooltips.js"}}

## Positioned Tooltips

The `Tooltip` has 12 placements choice.
They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/demos/tooltips/PositionedTooltips.js"}}

## Controlled Tooltips

{{"demo": "pages/demos/tooltips/ControlledTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.
