---
title: Componente React Panel de Expansión
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Paneles de Expansión

<p class="description">Los paneles de expansión contienen flujos de creación y permiten una edición simple de un elemento.</p>

Un [panel de expansión](https://material.io/archive/guidelines/components/expansion-panels.html) es un contenedor liviano que puede ser ya sea único o estar conectado a una superficie más grande, como una tarjeta.

> **Nota:** Los paneles de expansión ya no están documentados en la documentación de Material Design.

## Accesibilidad

Para óptima accesibilidad recomendamos establecer `id` y `aria-controls` en `ExpansionPanelSummary`. El `ExpansionPanel` derivará los necesarios `aria-labelledby` y `id` para la región de contenido del panel.

## Panel de expansión simple

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Acordeón controlado

Extiende el comportamiento por defecto del panel para crear un acordeón con el componente `ExpansionPanel`.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## Cabecera secundaria y columnas

Múltiples columnas pueden ser usadas para estructurar el contenido, y un texto de ayuda puede ser agregado al panel para asistir al usuario.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Rendimiento

The content of ExpansionPanels is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`: `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`. As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Customized expansion panels

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}