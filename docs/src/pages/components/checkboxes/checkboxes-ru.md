---
title: Checkbox React component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox

<p class="description">Чекбоксы позволяют выбрать один или несколько элементов из набора.</p>

[Чекбоксы](https://material.io/design/components/selection-controls.html#checkboxes) могут быть использованы для включения или выключения различных опций.

Если у вас есть несколько опций, отображаемых в списке, вы можете сохранить пространство, используя чекбоксы вместо переключателей. Если у вас есть только один вариант, лучше не использовать чекбокс, вместо него используйте переключатель включения / выключения.

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

`Чекбокс` также можно использовать с описанием метки благодаря компоненту `FormControlLabel`.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Чекбоксы с FormGroup

`FormGroup` - это полезная обертка, используемая для группировки компонентов элементов управления выбором, она предоставляет более простой API.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Расположение метки

Расположение метки можно изменить:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Customized checkbox

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

## Бесплатно

- [Чекбоксы. Radio Buttons (радиокнопки)](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Чекбоксы. Switch (переключатели)](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).
- Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```