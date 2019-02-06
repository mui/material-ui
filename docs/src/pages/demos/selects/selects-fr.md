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

As the user experience can be improved on mobile using the native select of the platform, we allow such pattern.

{{"demo": "pages/demos/selects/NativeSelects.js"}}

## Customized selects

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here's an example of how you can change the main color of an Input.

⚠️ Bien que les spécifications de conception des matériaux encouragent la thématisation, ces exemples sortent des sentiers battus.

{{"demo": "pages/demos/selects/CustomizedSelects.js"}}

## Multiple Select

The `Select` component can handle multiple selections. It's enabled with the `multiple` property.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

{{"demo": "pages/demos/selects/MultipleSelect.js"}}

## Controlled open Select

{{"demo": "pages/demos/selects/ControlledOpenSelect.js"}}

## With a Dialog

While it's discouraged by the Material Design specification, you can use a select inside a dialog.

{{"demo": "pages/demos/selects/DialogSelect.js"}}

## Champ de texte

Le composant d'encapsulation `TextField` est un contrôle de formulaire complet comprenant une étiquette, une entrée et un texte d'aide. You can find an example with the select mode [in this section](/demos/text-fields/#textfield).