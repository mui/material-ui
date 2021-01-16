---
title: Componentes React para Transição
components: Collapse, Fade, Grow, Slide, Zoom
githubLabel: 'component: Transition'
---

# Transições

<p class="description">Transições ajudam a deixar a interface expressiva e fácil de usar.</p>

Material-UI provê um número de transições que podem ser usadas para introduzir algumas [animações](https://material.io/design/motion/) básicas para os componentes de sua aplicação.

[A paleta](/system/palette/) com funções de estilo.

Para um melhor suporte a renderização no servidor, Material-UI provê uma propriedade `style` para o elemento filho de alguns componentes de transição, (Fade, Grow, Zoom, Slide). A propriedade `style` deve ser aplicada ao DOM para que a animação funcione conforme esperada.

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

Expandir para fora partindo do centro do elemento filho. Use a propriedade `orientation` se você precisar de um colapso na horizontal. A propriedade `collapsedHeight` pode ser usada para definir a altura mínima quando não expandida.

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade

Esmaecer de transparente para opaco.

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow

Expande para fora a partir do centro do elemento filho, enquanto também desvanece em efeito de transparente para opaco.

The second example demonstrates how to change the `transform-origin`, and conditionally applies the `timeout` prop to change the entry speed.

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide

Deslize a partir da borda da tela. A propriedade `direction` controla em qual borda da tela a transição começa.

A propriedade de transição do componente `mountOnEnter` impede que o componente filho seja montado até que `in` seja `true`. Isso evita que o componente relativamente posicionado role para a visão a partir da posição fora da tela. Da mesma forma, a propriedade `unmountOnExit` remove o componente do DOM após a transição ter sido exibida (`in` = `false`).

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom

Expandir para fora partindo do centro do elemento filho.

Este exemplo também demonstra como atrasar a transição de entrada.

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionGroup

To animate a component when it is mounted or unmounted, you can use the [`TransitionGroup`](https://reactcommunity.org/react-transition-group/transition-group) component from _react-transition-group_. As components are added or removed, the `in` prop is toggled automatically by `TransitionGroup`.

{{"demo": "pages/components/transitions/TransitionGroupExample.js"}}

## Propriedade TransitionComponent

Alguns componentes do Material-UI usam essas transições internamente. Estas aceitam uma propriedade `TransitionComponent` para customizar a transição padrão. Você pode usar qualquer um dos componentes acima ou seu próprio componente. Ele deve respeitar as seguintes condições:

- Aceitar uma propriedade `in`. Isso corresponde ao estado de aberto/fechado.
- Chamar a propriedade de callback `onEnter` quando a transição de entrada iniciar.
- Chamar a propriedade de callback `onExited` quando a transição de saída for concluída. Esses dois callbacks permitem desmontar os elementos filhos quando em estado fechado e totalmente transitados.

For more information on creating a custom transition, visit the _react-transition-group_ [`Transition` documentation](http://reactcommunity.org/react-transition-group/transition). Você também pode visitar as seções dedicadas de alguns dos componentes:

- [Modal](/components/modal/#transitions)
- [Dialog](/components/dialogs/#transitions)
- [Popper](/components/popper/#transitions)
- [Snackbar](/components/snackbars/#transitions)
- [Tooltip](/components/tooltips/#transitions)
