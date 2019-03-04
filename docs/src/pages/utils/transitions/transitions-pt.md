---
title: Componentes de Transição React
components: Collapse, Fade, Grow, Slide, Zoom
---
# Transições

<p class="description">Transições ajudam a fazer a INTERFACE expressiva e fácil de usar.</p>

Material-UI provê um número de transições que podem ser usadas para introduzir algumas [animações](https://material.io/design/motion/) básicas para os componentes de sua aplicação.

Para um melhor suporte ao server rendering Material-UI provê uma propriedade de `estilo` para o filho de alguns componentes de transição (Fade, Grow, Zoom, Slide). A propriedade `style` deve ser aplicada ao DOM para que a animação funcione conforme esperada.

```jsx
// O objeto `props` contém uma propriedade` style`.
// Você precisa fornecê-lo ao elemento `div` como mostrado aqui.
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

Expanda verticalmente a partir do topo do elemento filho. A propriedade `collapsedHeight` pode ser usada para definir a altura mínima quando não expandida.

{{"demo": "pages/utils/transitions/SimpleCollapse.js"}}

## Fade

Fade in de transparente para opaco.

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

Expandir para fora partindo do centro do elemento filho.

Este exemplo também demonstra como atrasar a transição de entrada.

{{"demo": "pages/utils/transitions/SimpleZoom.js"}}