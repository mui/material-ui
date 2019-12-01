---
title: Componente React para Dicas
components: Tooltip
---

# Dicas

<p class="description">Dicas exibem texto informativo quando os usuários passam o mouse, focalizam ou tocam em um elemento.</p>

Quando ativada, [dicas](https://material.io/design/components/tooltips.html) exibem um rótulo de texto identificando o elemento, como uma descrição de sua função.

## Dicas simples

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Posicionamento de dicas

O `Tooltip` tem 12 **posicionamentos** para ser escolhido. Eles não têm setas direcionais; em vez disso, eles dependem do movimento que emana da fonte para transmitir direção.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Dicas customizadas

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Arrow Tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Custom child element

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="Excluir">
  <MyComponent>
</Tooltip>
```

You can find a similar concept in the [wrapping components](/guides/composition/#wrapping-components) guide.

## Triggers

You can define the types of events that cause a tooltip to show.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Controlled Tooltips

You can use the `open`, `onOpen` and `onClose` properties to control the behavior of the tooltip.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Variable Width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interativo

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Disabled Elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️ In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="Você não tem permissão para esta tarefa">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'Um botão desabilitado'}
    </button>
  </span>
</Tooltip>
```

## Transições

Use uma transição diferente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}