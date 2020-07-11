---
title: Componentes React para Transição
components: Collapse, Fade, Grow, Slide, Zoom
---

# Transições

<p class="description">Transições ajudam a deixar a interface expressiva e fácil de usar.</p>

Material-UI provê um número de transições que podem ser usadas para introduzir alguns [movimentos](https://material.io/design/motion/) básicos para os componentes de sua aplicação.

Para um melhor suporte a renderização no servidor, Material-UI provê uma propriedade `style` para o filho de alguns componentes de transição (Fade, Grow, Zoom, Slide). A propriedade `style` deve ser aplicada ao DOM para que a animação funcione conforme esperado.

```jsx
// O objeto `props` contém uma propriedade `style`.
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

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade

Esmaecer de transparente para opaco.

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow

Expande para fora a partir do centro do elemento filho, enquanto também desvanece em efeito de transparente para opaco.

O segundo exemplo demonstra como alterar `transform-origin` e condicionalmente aplica a propriedade `timeout` para alterar a velocidade de entrada.

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide

Deslize a partir da borda da tela. A propriedade `direction` controla em qual borda da tela a transição começa.

A propriedade `mountOnEnter` do componente de transição impede que o componente filho seja montado até que `in` seja `true`. Isso evita que o componente relativamente posicionado role para a visão a partir da posição de fora da tela. Da mesma forma, a propriedade `unmountOnExit` remove o componente do DOM após a transição ter sido exibida para fora da tela.

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom

Expandir para fora partindo do centro do elemento filho.

Este exemplo também demonstra como atrasar a transição de entrada.

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## Propriedade TransitionComponent

Os componentes aceitam uma propriedade `TransitionComponent` para customizar as transições padrão. Você pode usar qualquer um dos componentes acima ou seu próprio componente. Ele deve respeitar as seguintes condições:

- Aceitar uma propriedade `in`. Isso corresponde ao estado de aberto/fechado.
- Chamar a propriedade de callback `onEnter` quando a transição de entrada iniciar.
- Chamar a propriedade de callback `onExited` quando a transição de saída for concluída. Esses dois callbacks permitem desmontar os elementos filhos quando em estado fechado e totalmente transitados.

Para obter maiores informações sobre como criar transações customizadas, visite a [documentação de transições do React Transition Group](http://reactcommunity.org/react-transition-group/transition).