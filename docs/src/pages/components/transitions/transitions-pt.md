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

{{"demo": "pages/components/transitions/SimpleCollapse.js"}}

## Fade

Fade in de transparente para opaco.

{{"demo": "pages/components/transitions/SimpleFade.js"}}

## Grow

Expande para fora a partir do centro do elemento filho, enquanto também desvanece em efeito de transparente para opaco.

O segundo exemplo demonstra como alterar `transform-origin` e condicionalmente aplica a propriedade `timeout` para alterar a velocidade de entrada.

{{"demo": "pages/components/transitions/SimpleGrow.js"}}

## Slide

Slide (Deslize) a partir da borda da tela. A propriedade `direction` controla em qual borda da tela a transição começa.

A propriedade de transição do componente `mountOnEnter` impede que o componente filho seja montado até que `in` seja `true`. Isso evita que o componente relativamente posicionado role para a visão a partir da posição fora da tela. Da mesma forma, a propriedade `unmountOnExit` remove o componente do DOM após a transição ter sido exibida (`in` = `false`).

{{"demo": "pages/components/transitions/SimpleSlide.js"}}

## Zoom

Expandir para fora partindo do centro do elemento filho.

Este exemplo também demonstra como atrasar a transição de entrada.

{{"demo": "pages/components/transitions/SimpleZoom.js"}}