---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switches

<p class="description">Switches toggle the state of a single setting on or off.</p>

[Switches](https://material.io/design/components/selection-controls.html#switches) are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label.

{{"demo": "pages/components/switches/Switches.js"}}

## Switches with FormControlLabel

`Switch` can also be used with a label description thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Switches with FormGroup

`FormGroup` est un wrapper utile utilisé pour regrouper les composants de contrôles de sélection et qui fournit une API plus simple. However, we encourage you to use a [Checkbox](#checkboxes) instead.

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customized switches

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## Emplacement du label

Vous pouvez changer l'emplacement du label:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Accessibilité

Tous les contrôles de formulaire doivent avoir des labels, cela vaut également pour les boutons radio, les cases à cocher et les interrupteurs. Dans la plupart des cas, cela se fait en utilisant l'élément `<label>` ([FormControlLabel](/api/form-control-label/)).

Lorsqu'un label ne peut pas être utilisé, il est nécessaire d'ajouter un attribut directement au composant input. Dans ce cas, vous pouvez appliquer l'attribut supplémentaire (ex: `aria-label`, `aria-labelledby`, `title`) via la propriété `inputProps`.

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```