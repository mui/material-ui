---
title: Select React component
components: Select, NativeSelect
---

# Selects

<p class="description">Select components are used for collecting user provided information from a list of options.</p>

## Simple Select

Menus are positioned over their emitting elements such that the currently selected menu item appears on top of the emitting element.

{{"demo": "pages/demos/selects/SimpleSelect.js"}}

## Native Select

As the user experience can be improved on mobile using the native select of the platform,
we allow such pattern.

{{"demo": "pages/demos/selects/NativeSelects.js"}}

## Customized selects

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in, here's an example of how you can change the main color of an Input.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/selects/CustomizedSelects.js"}}

## Multiple Select

The `Select` component can handle multiple selections.
It's enabled with the `multiple` property.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

{{"demo": "pages/demos/selects/MultipleSelect.js"}}

## Controlled open Select

{{"demo": "pages/demos/selects/ControlledOpenSelect.js"}}

## With a Dialog

While it's discouraged by the Material Design specification, you can use a select inside a dialog.

{{"demo": "pages/demos/selects/DialogSelect.js"}}

## Text Fields

The `TextField` wrapper component is a complete form control including a label, input and help text. You can find an example with the select mode [in this section](/demos/text-fields/#textfield).
