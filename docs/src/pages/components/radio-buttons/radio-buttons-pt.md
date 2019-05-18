---
title: Botões de Radio React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio Buttons

<p class="description">Radio buttons permitem o usuário selecionar uma das opções de um conjunto.</p>

Use [radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons) quando um usuário precisar ver todas as opções disponíveis. Se várias opções podem ser retráteis, considere usar um dropdown menu, pois ele utiliza menos espaço.

Radio buttons should have the most commonly used option selected by default.

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Standalone Radio Buttons

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Posicionamento do Label

Você pode alterar o posicionamento do label:

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## Acessibilidade

Todos os form controls devem ter labels, e isso inclui radio buttons, checkboxes e switches. Na maioria dos casos, isso é feito usando `<label>` ([FormControlLabel](/api/form-control-label/)).

Quando uma label não pode ser usada, é necessário adicionar um atributo diretamente no componente de input. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através do `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' } }
/>
```

## Orientação

- [Checkboxes vs. Butões de Rádio](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)