---
title: Select React component
components: Select, NativeSelect
---

# Select

<p class="description">Los componentes seleccionados se utilizan para recopilar información relegado por el usuario de una lista de opciones.</p>

## Selección simple

Los menús son colocados sobre sus emisores de elementos tales que el elemento de menú seleccionado actualmente aparece arriba de la emisión de elemento.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Selección nativa

Dado que la experiencia del usuario puede mejorarse en móvil usando la selección nativa de la plataforma, permitimos ese patrón.

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Campos de texto

El componente `TextField` es un control de formulario completo, incluyendo una etiqueta, el campo de texto y texto de ayuda. You can find an example with the select mode [in this section](/components/text-fields/#select).

## Selecciones personalizadas

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

The first step is to style the `InputBase` component. Once it's styled, you can either use it directly as a text field or provide it to the select `input` property to have a `select` field.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## Multiple Select

The `Select` component can handle multiple selections. It's enabled with the `multiple` property.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## Controlled Open Select

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## With a Dialog

While it's discouraged by the Material Design specification, you can use a select inside a dialog.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Grouping

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Accesibilidad

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

```jsx
<TextField id="select" label="Age" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```