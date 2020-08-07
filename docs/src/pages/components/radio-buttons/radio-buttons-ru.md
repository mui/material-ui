---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Радиокнопка

<p class="description">Radio buttons allow the user to select one option from a set.</p>

Use [radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons) when the user needs to see all available options. Если доступные параметры можно свернуть, возможно лучше использовать раскрывающееся меню, так как оно занимает меньше места.

Для радиокнопок наиболее часто используемый параметр должен быть выбран по умолчанию.

## RadioGroup

`RadioGroup` - это полезная обертка, используемая для группировки `компонентов Radio`, она обеспечивает более простой API и управление с клавиатуры.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

To lay out the buttons horizontally, set the `row` prop: `<RadioGroup row />`.

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Расположение метки

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## Customized radios

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## Бесплатно

- [Чекбоксы. Radio Buttons (радиокнопки)](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).
- Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```