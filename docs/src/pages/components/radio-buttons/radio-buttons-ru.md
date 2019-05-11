---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio buttons

<p class="description">Radio buttons allow the user to select one option from a set.</p>

Use [radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons) when the user needs to see all available options. Если доступные параметры можно свернуть, возможно лучше использовать раскрывающееся меню, так как оно занимает меньше места.

Для радиокнопок наиболее часто используемый параметр должен быть выбран по умолчанию.

`RadioGroup` - это полезная обертка, используемая для группировки `компонентов Radio`, она обеспечивает более простой API и управление с клавиатуры.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Автономные радиокнопки

`Радио` также можно использовать отдельно, без обертки.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Расположение метки

Расположение метки можно изменить:

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## Доступность

Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).

Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' } }
/>
```

## Guidance

- [Checkboxes vs. Radio Buttons (радиокнопки)](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)