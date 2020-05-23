---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switch (interrupteur)

<p class="description">Switches toggle the state of a single setting on or off.</p>

[Switches](https://material.io/design/components/selection-controls.html#switches) are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label.

## Basic switches

{{"demo": "pages/components/switches/Switches.js"}}

## Switch with FormControlLabel

`Switch` can be provided with a description thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Switches with FormGroup

`FormGroup` est un wrapper utile utilisé pour regrouper les composants de contrôles de sélection et qui fournit une API plus simple. However, you are encouraged you to use [Checkboxes](/components/checkboxes/) instead if multiple related controls are required. (See: [When to use](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customized switches

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch).

## Tailles

Fancy smaller switches? Use the `size` property.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Emplacement du label

Vous pouvez changer l'emplacement du label:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Quand les utiliser

- [Cases à cocher vs. Switches (interrupteurs)](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibilité

- It will render an element with the `checkbox` role not `switch` role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with `<Switch inputProps={{ role: 'switch' }}>`
- Tous les contrôles de formulaire doivent avoir des labels, cela vaut également pour les boutons radio, les cases à cocher et les interrupteurs. Dans la plupart des cas, cela se fait en utilisant l'élément `<label>` ([FormControlLabel](/api/form-control-label/)).
- Lorsqu'un label ne peut pas être utilisé, il est nécessaire d'ajouter un attribut directement au composant input. Dans ce cas, vous pouvez appliquer l'attribut supplémentaire (ex: `aria-label`, `aria-labelledby`, `title`) via la propriété `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```