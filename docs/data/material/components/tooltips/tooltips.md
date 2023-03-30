---
product: material-ui
title: React Tooltip component
components: Tooltip
githubLabel: 'component: tooltip'
materialDesign: https://m2.material.io/components/tooltips
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
---

# Tooltip

<p class="description">Tooltips display informative text when users hover over, focus on, or tap an element.</p>

When activated, Tooltips display a text label identifying an element, such as a description of its function.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic tooltip

{{"demo": "BasicTooltip.js"}}

## Positioned tooltips

The `Tooltip` has 12 **placement** choices.
They don't have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "PositionedTooltips.js"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedTooltips.js"}}

## Arrow tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "ArrowTooltips.js"}}

## Custom child element

The tooltip needs to apply DOM event listeners to its child element.
If the child is a custom React element, you need to make sure that it spreads its props to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <div {...props} ref={ref}>
      Bin
    </div>
  );
});

// ...

<Tooltip title="Delete">
  <MyComponent />
</Tooltip>;
```

You can find a similar concept in the [wrapping components](/material-ui/guides/composition/#wrapping-components) guide.

If using a class component as a child, you'll also need to ensure that the ref is forwarded to the underlying DOM element. (A ref to the class component itself will not work.)

```jsx
class MyComponent extends React.Component {
  render() {
    const { innerRef, ...props } = this.props;
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={innerRef}>
        Bin
      </div>
    );
  }
}

// Wrap MyComponent to forward the ref as expected by Tooltip
const WrappedMyComponent = React.forwardRef(function WrappedMyComponent(props, ref) {
  return <MyComponent {...props} innerRef={ref} />;
});

// ...

<Tooltip title="Delete">
  <WrappedMyComponent />
</Tooltip>;
```

## Triggers

You can define the types of events that cause a tooltip to show.

The touch action requires a long press due to the `enterTouchDelay` prop being set to `700`ms by default.

{{"demo": "TriggersTooltips.js"}}

## Controlled tooltips

You can use the `open`, `onOpen` and `onClose` props to control the behavior of the tooltip.

{{"demo": "ControlledTooltips.js"}}

## Variable width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "VariableWidth.js"}}

## Interactive

Tooltips are interactive by default (to pass [WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)).
It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.
You can disable this behavior (thus failing the success criterion which is required to reach level AA) by passing `disableInteractive`.

{{"demo": "NonInteractiveTooltips.js"}}

## Disabled elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

:::warning
In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.
:::

{{"demo": "DisabledTooltips.js"}}

:::warning
If you're not wrapping a MUI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property _pointer-events: none;_ to your element when disabled:
:::

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: 'none' } : {}}>
      A disabled button
    </button>
  </span>
</Tooltip>
```

## Transitions

Use a different transition.

{{"demo": "TransitionsTooltips.js"}}

## Follow cursor

You can enable the tooltip to follow the cursor by setting `followCursor={true}`.

{{"demo": "FollowCursorTooltips.js"}}

## Virtual element

In the event you need to implement a custom placement, you can use the `anchorEl` prop:
The value of the `anchorEl` prop can be a reference to a fake DOM element.
You need to create an object shaped like the [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

{{"demo": "AnchorElTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the `enterDelay` and `leaveDelay` props, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` prop.

{{"demo": "DelayTooltips.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

By default, the tooltip only labels its child element.
This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label.
For example, in:

```html
<button title="some more information">A button</button>
```

the `title` acts as an accessible description.
If you want the tooltip to act as an accessible description you can pass `describeChild`.
Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "AccessibilityTooltips.js"}}
