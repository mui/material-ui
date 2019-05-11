---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Botones de radio

<p class="description">Botones de radio permiten al usuario seleccionar una opción de un conjunto.</p>

Usa [botones de radio](https://material.io/design/components/selection-controls.html#radio-buttons) cuando el usuario necesita ver todas las opciones disponibles. Si las opciones disponibles se pueden colapsar, considere usar un menú desplegable porque utiliza menos espacio.

Radio buttons should have the most commonly used option selected by default.

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Standalone Radio Buttons

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Label placement

You can change the placement of the label:

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## Accesibilidad

All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).

When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' } }
/>
```

## Guidance

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)