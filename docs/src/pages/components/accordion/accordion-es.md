---
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion (panel de expansión)

<p class="description">Los paneles de expansión contienen flujos de creación y permiten una edición simple de un elemento.</p>

Un [panel de expansión](https://material.io/archive/guidelines/components/expansion-panels.html) es un contenedor liviano que puede ser ya sea único o estar conectado a una superficie más grande, como una tarjeta.

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them. Antes era conocido como "panel de expansión".

## Panel de expansión simple

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Acordeón controlado

Extiende el comportamiento por defecto del panel para crear un acordeón con el componente `Accordion`.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Panel de expansión personalizados

He aquí un ejemplo de personalización del componente. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Acciones Adicionales

In order to put an action such as a `Checkbox` or a button inside of the `AccordionSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the accordion expansion.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## Rendimiento

The content of Accordions is mounted by default even if the panel is not expanded. Este comportamiento por defecto tiene el renderizado del lado del servidor y SEO en mente. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Como en cualquier optimización de rendimiento esto no es una bala de plata. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Cabecera secundaria y columnas

Múltiples columnas pueden ser usadas para estructurar el contenido, y un texto de ayuda puede ser agregado al panel para asistir al usuario.

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Para óptima accesibilidad recomendamos establecer `id` y `aria-controls` en `AccordionSummary`. El `Accordion` derivará los necesarios `aria-labelledby` y `id` para la región de contenido del panel.
