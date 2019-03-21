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

{{"demo": "pages/demos/expansion-panels/SimpleExpansionPanel.js"}}

## Acordeón controlado

Extiende el comportamiento por defecto del panel para crear un acordeón con el componente `ExpansionPanel`.

{{"demo": "pages/demos/expansion-panels/ControlledExpansionPanels.js"}}

## Cabecera secundaria y columnas

Múltiples columnas pueden ser usadas para estructurar el contenido, y un texto de ayuda puede ser agregado al panel para asistir al usuario.

{{"demo": "pages/demos/expansion-panels/DetailedExpansionPanel.js"}}

## Panel de expansión personalizado

Si has estado leyendo la [página de documentación de sobreescritura](/customization/overrides/) pero aún no te sientes seguro, aquí hay un ejemplo de cómo puedes personalizar el color de fondo del `ExpansionPanelSummary` y el padding de `ExpansionPanelDetails`.

⚠️ A pesar de que la especificación de material design anima a usar temas, estos ejemplos no son comunes.

{{"demo": "pages/demos/expansion-panels/CustomizedExpansionPanel.js"}}