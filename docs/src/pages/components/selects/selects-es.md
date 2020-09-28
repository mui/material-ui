---
title: Select React component
components: Select, NativeSelect
githubLabel: 'component: Select'
---

# Selección

<p class="description">Los componentes seleccionados se utilizan para recopilar información relegado por el usuario de una lista de opciones.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Selección simple

Los menús son colocados sobre sus emisores de elementos tales que el elemento de menú seleccionado actualmente aparece arriba de la emisión de elemento.

{{"demo": "pages/components/selects/BasicSelect.js"}}

## Advanced features

The Select component is meant to be interchangeable with a native `<select>` element.

If you are looking for more advanced features, like combobox, multiselect, autocomplete, async or creatable support, head to the [`Autocomplete` component](/components/autocomplete/). Esto pretende ser una versión mejorada de los paquetes "react-select" y "downshift".

## Props

### Filled and outlined variants

{{"demo": "pages/components/selects/NativeSelects.js"}}

### Labels and helper text

{{"demo": "pages/components/selects/SelectLabels.js"}}

### Auto width

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### Other props

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## Campos de texto

Dado que la experiencia del usuario puede mejorarse en móvil usando la selección nativa de la plataforma, permitimos ese patrón.

{{"demo": "pages/components/selects/NativeSelect.js"}}

## TextField

El componente `TextField` es un control de formulario completo, incluyendo una etiqueta, el campo de texto y texto de ayuda. The first step is to style the `InputBase` component.

## Selecciones personalizadas

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

The first step is to style the `InputBase` component. El componente `TextField` es un control de formulario completo, incluyendo una etiqueta, el campo de texto y texto de ayuda.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/select).

## Controlled Open Select

The `Select` component can handle multiple selections. The `Select` component can handle multiple selections.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

### Por defecto

{{"demo": "pages/components/selects/MultipleSelect.js"}}

### Checkmarks

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}

### Chip

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

### Placeholder

{{"demo": "pages/components/selects/MultipleSelectPlaceholder.js"}}

### Native

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}

## With a Dialog

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## With a dialog

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
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

For a [native select](#native-select), you should mention a label by giving the value of the `id` attribute of the select element to the `InputLabel`'s `htmlFor` attribute:

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```
