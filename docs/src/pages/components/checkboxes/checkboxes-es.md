---
title: Componente Checkbox de React
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: 'https://material.io/components/selection-controls#checkboxes'
githubLabel:
  component: Checkbox
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#checkbox'
---

# Checkbox

<p class="description">Los Checkbox permiten al usuario seleccionar uno o más elementos de un conjunto.</p>

[Checkboxes](https://material.io/design/components/selection-controls.html#checkboxes) se pueden usar para activar o desactivar una opción.

Si tienes varias opciones en una lista, puedes ahorrar espacio usando checkboxes en lugar de utilizar interruptores de encendedido/apagado. Si tienes una única opción, evita usar un checkbox y utiliza un interruptor de encendido/apagado en su lugar.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Checkboxes básicos

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## Checkbox con FormControlLabel

`Checkbox` puede ser provisto de una etiqueta gracias al componente `FormControlLabel`.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Checkboxes con FormGroup

`FormGroup` es un contenedor muy útil usado para agrupar componentes de controles de selección que proporciona una API más sencilla.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Ubicación de Etiqueta

Puede cambiar la ubicación de la etiqueta:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Customized checkbox

He aquí un ejemplo de personalización del componente. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/checkbox).

## Cuándo usarlo

- [Checkboxes vs. Botones de selección](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Checkboxes vs. Interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Todos los controles de formulario deben tener etiquetas, y esto incluye radio buttons, checkboxes, and switches. En la mayoría de los casos, esto se hace usando el elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Cuando no se puede usar una etiqueta, es necesario agregar un atributo directamente al componente de entrada. En este caso, puede aplicar el atributo adicional (por ejemplo, `aria-label`, `aria-labelledby`, `title`) a través de la propiedad `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```
