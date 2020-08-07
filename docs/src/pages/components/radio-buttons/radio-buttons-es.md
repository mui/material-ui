---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio

<p class="description">Botones de radio permiten al usuario seleccionar una opción de un conjunto.</p>

Usa [botones de radio](https://material.io/design/components/selection-controls.html#radio-buttons) cuando el usuario necesita ver todas las opciones disponibles. Si las opciones disponibles se pueden colapsar, considere usar un menú desplegable porque utiliza menos espacio.

Radio buttons should have the most commonly used option selected by default.

## RadioGroup

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

Para poner los botones de forma horizontal, establezca el `fila` prop: `<RadioGroup row />`.

## Standalone radio buttons

`Radio` también puede ser utilizado de forma independiente, sin el contenedor RadioGroup.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Ubicación de Etiqueta

Usted puede cambiar la ubicación de la etiqueta con el `FormControlLabel` del componente `labelPlacement` prop:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## Customized radios

He aquí un ejemplo de personalización del componente. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## Cuándo usarlo

- [Checkboxes vs. Botones de selección](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- Todos los controles de formulario deben tener etiquetas, y esto incluye radio buttons, checkboxes, and switches. En la mayoría de los casos, esto se hace usando el elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Cuando no se puede usar una etiqueta, es necesario agregar un atributo directamente al componente de entrada. En este caso, puede aplicar el atributo adicional (por ejemplo, `aria-label`, `aria-labelledby`, `title`) a través de la propiedad `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```