---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Boutons radio

<p class="description">Les radios buttons permettent a l'utilisateur de sélectionner un choix parmi un ensemble de choix.</p>

Ici [buttons radio](https://material.io/design/components/selection-controls.html#radio-buttons) toutes les options. Si les options disponibles peuvent être réduites, envisagez d'utiliser un menu déroulant, car il utilise moins d'espace disponibles.

Généralement, les cases d'option doivent avoir l'option la plus utilisée sélectionnée par défaut.

`RadioGroup` est un gestionnaire utile pour regrouper des composants `Radio` qui fournit une API plus facile et une accessibilité adéquate au clavier.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Standalone Radio Buttons

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Label placement

You can change the placement of the label:

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## Accessibilité

All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).

When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' } }
/>
```

## Guidance

- [Checkboxes vs. Cases d’option](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)