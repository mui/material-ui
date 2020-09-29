---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Switch

<p class="description">Los conmutadores alternan los estados de un solo ajuste.</p>

[Switches](https://material.io/design/components/selection-controls.html#switches) are the preferred way to adjust settings on mobile. La opcion controllada por el switch asi como el estado internmo de este, deben especificarse de manera clara en la etiqueta inline correspondiente.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Conmutadores Básicos

{{"demo": "pages/components/switches/Switches.js"}}

## Switch with FormControlLabel

`Switch` can be provided with a description thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Switches with FormGroup

`FormGroup` es un contenedor muy útil usado para agrupar componentes de controles de selección que proporciona una API más sencilla. However, you are encouraged you to use [Checkboxes](/components/checkboxes/) instead if multiple related controls are required. However, you are encouraged you to use [Checkboxes](/components/checkboxes/) instead if multiple related controls are required.

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customized switches

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch).

## Tamaños

Fancy smaller switches? Use the `size` prop.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Ubicación de Etiqueta

Puede cambiar la ubicación de la etiqueta:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Cuándo usarlo

- [Checkboxes vs. Interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accesibilidad

- It will render an element with the `checkbox` role not `switch` role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with `<Switch inputProps={{ role: 'switch' }}>`
- Todos los controles de formulario deben tener etiquetas, y esto incluye radio buttons, checkboxes, and switches. En la mayoría de los casos, esto se hace usando el elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Cuando no se puede usar una etiqueta, es necesario agregar un atributo directamente al componente de entrada. En este caso, puede aplicar el atributo adicional (por ejemplo, `aria-label`, `aria-labelledby`, `title`) a través de la propiedad `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
