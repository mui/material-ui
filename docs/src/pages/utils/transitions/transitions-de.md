---
title: Transition React component
components: Collapse, Fade, Grow, Slide, Zoom
---
# Transitions

<p class="description">Übergänge helfen, eine Oberfläche ausdrucksvoll und einfach zu benutzen zu gestalten.</p>

Material-UI bietet eine Anzahl von Übergängen, die verwendet werden können, um einige einfache [Bewegungen](https://material.io/design/motion/) in deiner Anwendung einzuführen.

Um Server Rendering besser zu unterstützen, bietet Material-UI ein `style` Property auf den Kindern einiger Übergangs-Komponenten (Fade, Grow, Zoom, Slide). Das `style` Property muss auf das DOM angewendet werden, damit die Animation wie gewünscht funktioniert.

```jsx
// The `props` object contains a `style` property.
// Dieses musst du, wie hier gezeigt, an das `div` Element übergeben.
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

Klappt senkrecht vom oberen Rand des Kind-Elementes ausgehend auf. Das ` collapsedHeight` Property kann benutzt werden, um die minimale Höhe festzulegen, wenn nicht ausgeklappt.

{{"demo": "pages/utils/transitions/SimpleCollapse.js"}}

## Fade

Blende von Transparent zu Undurchsichtig ein.

{{"demo": "pages/utils/transitions/SimpleFade.js"}}

## Grow

Expand outwards from the center of the child element, while also fading in from transparent to opaque.

The second example demonstrates how to change the `transform-origin`, and conditionally applies the `timeout` property to change the entry speed.

{{"demo": "pages/utils/transitions/SimpleGrow.js"}}

## Slide

Slide in from the edge of the screen. The `direction` property controls which edge of the screen the transition starts from.

The Transition component's `mountOnEnter` property prevents the child component from being mounted until `in` is `true`. This prevents the relatively positioned component from scrolling into view from it's off-screen position. Similarly the `unmountOnExit` property removes the component from the DOM after it has been transition off screen.

{{"demo": "pages/utils/transitions/SimpleSlide.js"}}

## Zoom

Expand outwards from the center of the child element.

This example also demonstrates how to delay the enter transition.

{{"demo": "pages/utils/transitions/SimpleZoom.js"}}