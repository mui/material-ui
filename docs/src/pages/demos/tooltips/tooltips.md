---
components: Tooltip
---

# Tooltips

The [tooltips](https://material.io/guidelines/components/tooltips.html#) are text labels that appear when the user hovers over, focuses on, or touches an element.

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

## Append to Body

By default, a tooltip is rendered inside its immediate parent element.
This decision keeps tooltips closer to the content they describe,
which can improve a page's SEO.

However, there may be situations when a tooltip needs to be attached
to the body of the DOM in order to avoid rendering issues; for example,
if the parent of the tooltip sets `overflow: hidden`, e.g. `GridListTile`.
The `appendToBody` prop allows you to choose this behavior over the default.

{{"demo": "pages/demos/tooltips/AppendToBodyTooltips.js"}}
