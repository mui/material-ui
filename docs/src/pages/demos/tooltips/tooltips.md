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

## Customized Tooltips

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in, here's an example of how you can theme a tooltip.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/tooltips/CustomizedTooltips.js"}}

## Custom child element

The tooltip needs to apply DOM event listeners to its child element.
If the child is a custom React element, you need to make sure that it spreads its properties  to the underlying DOM element.

```jsx
function MyComponent(props) {
  // We spread the properties to the underlying DOM element.
  return <div {...props}>Bin</div>
}

// ...

<Tooltip title="Delete">
  <MyComponent>
</Tooltip>
```

You can find a similar concept in the [wrapping components](/guides/composition/#wrapping-components) guide.

## Triggers

You can define the types of events that cause a tooltip to show.

{{"demo": "pages/demos/tooltips/TriggersTooltips.js"}}

## Controlled Tooltips

You can use the `open`, `onOpen` and `onClose` properties to control the behavior of the tooltip.

{{"demo": "pages/demos/tooltips/ControlledTooltips.js"}}

## Variable Width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/demos/tooltips/VariableWidth.js"}}

## Interactive

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/demos/tooltips/InteractiveTooltips.js"}}

## Disabled Elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element like a `span`.

{{"demo": "pages/demos/tooltips/DisabledTooltips.js"}}

## Transitions

Use a different transition.

{{"demo": "pages/demos/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/demos/tooltips/DelayTooltips.js"}}
