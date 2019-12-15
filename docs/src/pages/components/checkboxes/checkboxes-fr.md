---
title: Checkbox React component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox (case à cocher)

<p class="description">Les cases à cocher permettent à l'utilisateur de sélectionner un ou plusieurs objets d'un ensembe.</p>

[Les cases à cocher](https://material.io/design/components/selection-controls.html#checkboxes) peuvent être utilisées pour activer ou désactiver une option.

Si vous avez plusieurs options dans une liste, vous pouvez conserver de l'espace en utilisant des cases à cocher au lieu d'interrupteurs d'activation / désactivation. Si vous n'avez qu'une seule option, évitez d’utiliser une case à cocher et utilisez plutôt un interrupteur on / off à la place.

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

`La case à cocher` peut également être utilisée avec une description label grâce au composant `FormControlLabel`.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Cases à cocher avec FormGroup

`FormGroup` est un wrapper utile utilisé pour regrouper les composants de contrôles de sélection et qui fournit une API plus simple.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Emplacement du label

Vous pouvez changer l'emplacement du label:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Case à cocher personnalisée

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

## Quand les utiliser

- [Cases à cocher vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Cases à cocher vs. Switches (interrupteurs)](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Tous les contrôles de formulaire doivent avoir des labels, cela vaut également pour les boutons radio, les cases à cocher et les interrupteurs. Dans la plupart des cas, cela se fait en utilisant l'élément `<label>` ([FormControlLabel](/api/form-control-label/)).
- Lorsqu'un label ne peut pas être utilisé, il est nécessaire d'ajouter un attribut directement au composant input. Dans ce cas, vous pouvez appliquer l'attribut supplémentaire (ex: `aria-label`, `aria-labelledby`, `title`) via la propriété `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```