---
title: Select React component
components: Select, NativeSelect
---

# Selects

<p class="description">Select components are used for collecting user provided information from a list of options.</p>

## Simple Select

Menus are positioned over their emitting elements such that the currently selected menu item appears on top of the emitting element.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Native Select

As the user experience can be improved on mobile using the native select of the platform, we allow such pattern.

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Customized selects

Voici quelques exemples de personnalisation du composant. Vous pouvez en apprendre plus sur [la page de documentation de personnalisation](/customization/components/).

The first step is to style the `InputBase` component. Once it's styled, you can either use it directly as a text field or provide it to the select `input` property to have a `select` field.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## Multiple Select

The `Select` component can handle multiple selections. It's enabled with the `multiple` property.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## Controlled Open Select

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Avec un dialogue

Bien que cela soit découragé par la spécification Material Design, vous pouvez utiliser une sélection dans une boîte de dialogue.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Text Fields (Champs de texte)

Le composant d'encapsulation `TextField` est un contrôle de formulaire complet comprenant une étiquette, une entrée et un texte d'aide. You can find an example with the select mode [in this section](/components/text-fields/#textfield).