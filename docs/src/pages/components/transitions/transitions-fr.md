---
title: Composants React de transitions
components: Collapse, Fade, Grow, Slide, Zoom
---

# Les transitions

<p class="description">Les transitions contribue à rendre une interface utilisateur expressif et facile à utiliser.</p>

Material-UI fournit un certain nombre de transitions qui peuvent être utilisées pour introduire [des transitions de base](https://material.io/design/motion/) dans votre applications.

Afin de mieux prendre en charge le rendu du serveur, Material-UI fournit une propriété `style` pour les enfants de certains composants de transition (Fade, Grow, Zoom, Slide). La propriété `style` doit être appliquée au DOM pour que l'animation fonctionne comme prévu.

```jsx
// L'objet `props` contient une propriété `style`.
// Vous devez le fournir à l'élément `div` comme indiqué ici.
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

Fondu de transparent à opaque.

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

Cet exemple montre également comment retarder la transition d'entrée.

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionComponent prop

The components accept a `TransitionComponent` prop to customize the default transitions. You can use any of the above components or your own. It should respect the following conditions:

- Accepts an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow to unmount the children when in a closed state and fully transitioned.