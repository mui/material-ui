---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# Toggle Buttons

<p class="description">Los botones de alternancia se pueden utilizar para agrupar opciones relacionadas.</p>

Para enfatizar los grupos de botones Toggle relacionados, un grupo debe compartir un contenedor común.

El `ToggleButtonGroup` controlará el estado seleccionado de sus botones hijos cuando se le dé su propio `valor` prop.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Tamaños

Botones más grandes o más pequeños? Usa la propiedad `size`.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Botón de conmutación independiente

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Botón de conmutación personalizado

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Accesibilidad

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.