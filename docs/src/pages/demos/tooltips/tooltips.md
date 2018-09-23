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

The `Tooltip` has 12 **placements** choice.
They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/demos/tooltips/PositionedTooltips.js"}}

## Controlled Tooltips

You can use the `open`, `onOpen` and `onClose` properties to control the behavior of the tooltip.

{{"demo": "pages/demos/tooltips/ControlledTooltips.js"}}

## Triggers

You can define the types of events that cause a tooltip to show.

{{"demo": "pages/demos/tooltips/TriggersTooltips.js"}}

## Transitions

Use a different transition.

{{"demo": "pages/demos/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/demos/tooltips/DelayTooltips.js"}}

## Disabled Elements

By default disabled elements like `Button` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accomodate disabled elements, add a simple wrapper element like a `span`.

{{"demo": "pages/demos/tooltips/DisabledTooltips.js"}}

## Customized Tooltips

{{"demo": "pages/demos/tooltips/CustomizedTooltips.js"}}

## Variable Width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/demos/tooltips/VariableWidth.js"}}
