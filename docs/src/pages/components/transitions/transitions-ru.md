---
title: Transition React component
components: Collapse, Fade, Grow, Slide, Zoom
---

# Transições

<p class="description">Transition helps make a UI expressive and easy to use.</p>

Material-UI provides a number of transitions that can be used to introduce some basic [motion](https://material.io/design/motion/) to your applications components.

To better support server rendering Material-UI provides a `style` property to the children of some transition components (Fade, Grow, Zoom, Slide). The `style` property must be applied to the DOM for the animation to work as expected.

```jsx
// The `props` object contains a `style` property.
// You need to provide it to the `div` element as shown here.
function MyComponent(props) {
  return (
    <div {...props}>
      Fade
    </div>
  );
}

export default Main() {
  return (
    <Fade>
      <MyComponent />
    </Fade>
  );
}
```

## Collapse

Expand vertically from the top of the child element. The `collapsedHeight` property can be used to set the minimum height when not expanded.

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade

Fade in from transparent to opaque.

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow

Expand outwards from the center of the child element, while also fading in from transparent to opaque.

The second example demonstrates how to change the `transform-origin`, and conditionally applies the `timeout` property to change the entry speed.

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide

Slide in from the edge of the screen. The `direction` property controls which edge of the screen the transition starts from.

The Transition component's `mountOnEnter` property prevents the child component from being mounted until `in` is `true`. This prevents the relatively positioned component from scrolling into view from it's off-screen position. Similarly the `unmountOnExit` property removes the component from the DOM after it has been transition off screen.

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom

Expand outwards from the center of the child element.

This example also demonstrates how to delay the enter transition.

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionComponent prop

The components accept a `TransitionComponent` prop to customize the default transitions. You can use any of the above components or your own. It should respect the following conditions:

- Accepts an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow to unmount the children when in a closed state and fully transitioned.