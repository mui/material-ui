---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio

<p class="description">Les radios buttons permettent a l'utilisateur de sélectionner un choix parmi un ensemble de choix.</p>

Ici [buttons radio](https://material.io/design/components/selection-controls.html#radio-buttons) toutes les options. Si les options disponibles peuvent être réduites, envisagez d'utiliser un menu déroulant, car il utilise moins d'espace disponibles.

Généralement, les cases d'option doivent avoir l'option la plus utilisée sélectionnée par défaut.

`RadioGroup` est un gestionnaire utile pour regrouper des composants `Radio` qui fournit une API plus facile et une accessibilité adéquate au clavier.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Standalone Radio Buttons

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Emplacement du label

Vous pouvez changer l'emplacement du label:

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## Customized radios

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## Quand les utiliser

- [Checkboxes vs. Cases d’option](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- Tous les contrôles de formulaire doivent avoir des labels, cela vaut également pour les boutons radio, les cases à cocher et les interrupteurs. Dans la plupart des cas, cela se fait en utilisant l'élément `<label>` ([FormControlLabel](/api/form-control-label/)).
- Lorsqu'un label ne peut pas être utilisé, il est nécessaire d'ajouter un attribut directement au composant input. Dans ce cas, vous pouvez appliquer l'attribut supplémentaire (ex: `aria-label`, `aria-labelledby`, `title`) via la propriété `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```