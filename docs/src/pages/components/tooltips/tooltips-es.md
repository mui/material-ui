---
title: React Tooltip component
components: Tooltip
---

# Tooltip

<p class="description">Tooltips muestran texto informativo cuando los usuarios se desplazan, se concentran o tocan un elemento.</p>

Cuando se activa, [Tooltips](https://material.io/design/components/tooltips.html) muestran una etiqueta de texto que identifica un elemento, como una descripción de su función.

## Tooltips sencillos

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Tooltips posicionados

El `Tooltip` tiene 12 **posiciones** para elegir. No tienen flechas direccionales; en cambio, dependen del movimiento que emana de la fuente para transmitir la dirección.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Tooltips personalizados

Here are some examples of customizing the component. Here are some examples of customizing the component.

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Tooltip Flecha

Puedes usar el apoyo del prop `flecha` para dar a tu tooltip una flecha indicando a qué elemento se refiere.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Elemento child personalizado

El tooltip necesita aplicar los oyentes de eventos DOM a su elemento hijo. Si el child es un elemento React personalizado, necesita asegurarse de que difunde sus propiedades al elemento DOM subyacente.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="Delete">
  <MyComponent>
</Tooltip>
```

Puede encontrar un concepto similar en la guía de [componentes de envoltura](/guides/composition/#wrapping-components).

## Triggers

Puede definir los tipos de eventos que causan que se muestre un tooltip.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Tooltips controlados

You can use the `open`, `onOpen` and `onClose` properties to control the behavior of the tooltip.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Ancho variable

El `Tooltip` envuelve texto largo por defecto para hacerlo legible.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Explora

Un tooltip puede ser interactivo. No se cerrará cuando el usuario pase sobre el tooltip antes de que el `leaveDelay` expire.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Elementos deshabilitados

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️ Para trabajar con Safari, necesitas al menos un display block o un elemento flexionado debajo del envoltorio del tooltip.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="No tiene permiso de hacer esto">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'A disabled button'}
    </button>
  </span>
</Tooltip>
```

## Transiciones

Usar una transición diferente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Mostrar y ocultar

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}