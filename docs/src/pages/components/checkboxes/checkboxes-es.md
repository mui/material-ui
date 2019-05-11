---
title: Checkbox React component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkboxes

<p class="description">Los Checkbox permiten al usuario seleccionar uno o más elementos de un conjunto.</p>

[Checkboxes](https://material.io/design/components/selection-controls.html#checkboxes) se pueden usar para activar o desactivar una opción.

Si tienes varias opciones en una lista, puedes ahorrar espacio usando checkboxes en lugar de utilizar interruptores de encendedido/apagado. Si tienes una única opción, evita usar un checkbox y utiliza un interruptor de encendido/apagado en su lugar.

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

`Checkbox` can also be used with a label description thanks to the `FormControlLabel` component.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Checkboxes with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Label placement

You can change the placement of the label:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Accesibilidad

All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).

When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' } }
/>
```

## Guidance

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)