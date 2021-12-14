---
title: Componente React para Dicas
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Dicas

<p class="description">Dicas exibem texto informativo quando os usuários passam o mouse, focalizam ou tocam em um elemento.</p>

Quando ativada, [dicas](https://material.io/design/components/tooltips.html) exibem um rótulo de texto identificando o elemento, como uma descrição de sua função.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Dicas simples

{{"demo": "pages/components/tooltips/BasicTooltip.js"}}

## Dicas posicionadas

O `Tooltip` tem 12 **posicionamentos** para ser escolhido. They don't have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customization

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Dicas com seta

Você pode usar a propriedade `arrow` para dar à sua dica uma seta indicando a qual elemento se refere.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Elemento filho customizado

A dica precisa aplicar eventos DOM ao seu elemento filho. Se o filho for um elemento React personalizado, você precisará garantir que ele repasse suas propriedades para o elemento DOM subjacente.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Distribua as propriedades para o elemento DOM subjacente.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="Excluir">
  <MyComponent>
</Tooltip>
```

Você pode encontrar um conceito similar no guia [encapaulando componentes](/guides/composition/#wrapping-components).

## Gatilhos

Você pode definir os tipos de eventos que fazem com que uma dica seja exibida.

The touch action requires a long press due to the `enterTouchDelay` prop being set to `700`ms by default.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Dicas controladas

You can use the `open`, `onOpen` and `onClose` props to control the behavior of the tooltip.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Largura variável

A dica (`Tooltip`) quebra o texto longo por padrão para torná-lo legível.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interactive

Tooltips are interactive by default (to pass [WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)). Ela não será fechada quando o usuário passar por cima da dica antes que `leaveDelay` expire. You can disable this behavior (thus failing the success criterion which is required to reach level AA) by passing `disableInteractive`.

{{"demo": "pages/components/tooltips/NonInteractiveTooltips.js"}}

## Elementos desabilitados

Por padrão os elementos desativados como `<button>` não disparam interações do usuário, então uma `Tooltip` não será ativada em eventos normais, omo passar o mouse. Para acomodar elementos desabilitados, adicione um elemento encapsulador simples, como um `span`.

> ⚠️ Para trabalhar com o Safari, você precisa de pelo menos um display block ou flex item abaixo do elemento que encapsula a dica.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a MUI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property _pointer-events: none;_ to your element when disabled:

```jsx
<Tooltip title="Você não tem permissão para esta tarefa">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: 'none' } : {}}>
      Um botão desabilitado
    </button>
  </span>
</Tooltip>
```

## Transitions

Use a different transition.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Seguir o cursor

You can enable the tooltip to follow the cursor by setting `followCursor={true}`.

{{"demo": "pages/components/tooltips/FollowCursorTooltips.js"}}

## Elemento virtual

In the event you need to implement a custom placement, you can use the `anchorEl` prop: The value of the `anchorEl` prop can be a reference to a fake DOM element. You need to create an object shaped like the [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

{{"demo": "pages/components/tooltips/AnchorElTooltips.js"}}

## Exibindo e ocultando

A dica normalmente é mostrada imediatamente quando o mouse do usuário passa sobre o elemento e se oculta imediatamente quando o mouse do usuário sai. A delay in showing or hiding the tooltip can be added through the `enterDelay` and `leaveDelay` props, as shown in the Controlled Tooltips demo above.

No celular, a dica é exibida quando o usuário pressiona longamente o elemento e oculta após um atraso de 1500 ms. You can disable this feature with the `disableTouchListener` prop.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

By default, the tooltip only labels its child element. This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label. For example, in:

```html
<button title="alguma informação a mais">Um botão</button>
```

the `title` acts as an accessible description. If you want the tooltip to act as an accessible description you can pass `describeChild`. Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "pages/components/tooltips/AccessibilityTooltips.js"}}
