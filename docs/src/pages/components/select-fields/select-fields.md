---
title: Select Field React component
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, SelectField
githubLabel: 'component: SelectField'
materialDesign: https://material.io/components/select-fields
---

# Select Field

<p class="description">Select fields let users choose an option.</p>

Text fields allow users to choose an option from UI. They typically appear in forms and dialogs.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic SelectField

The `SelectField` wrapper component is a complete form control including a label, select, and help text.

It supports standard, outlined, and filled styling.

{{"demo": "pages/components/select-fields/BasicSelectFields.js"}}

**Note:** The standard variant of the `SelectField` is no longer documented in the [Material Design guidelines](https://material.io/)
([here's why](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)),
but Material-UI will continue to support it.

## Form props

Standard form attributes are supported e.g. `required`, `disabled`, etc. as well as a `helperText` which is used to give context about a field's input, such as how the input will be used.

{{"demo": "pages/components/select-fields/FormPropsSelectFields.js"}}

## Validation

The `error` prop toggles the error state.
The `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/select-fields/ValidationSelectFields.js"}}

## Native select

As the user experience can be improved on mobile using the native select of the platform,
we allow such pattern.

{{"demo": "pages/components/select-fields/NativeSelectField.js"}}

## Multiple selection

The `Select` component can handle multiple selections. It's enabled with the `multiple` prop and `value` props must be an array of string.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

{{"demo": "pages/components/select-fields/MultipleSelectFields.js"}}

## Composition

`SelectField` is compose of `FormControl`, `InputLabel`, `Select`, `FormHelperText` and 3 variants of InputComponent (`Input`, `OutlinedInput`, `FilledInput`). If you have a particular use case that `SelectField` does not fit or it is hard to acheive the needs, take a look at [Select Documentation Page](/components/selects/#basic-select) for more control.
