---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switch (переключатель)

<p class="description">Переключатели изменяют состояние одного отдельного параметра между "включено" и "выключено".</p>

[Переключатели](https://material.io/design/components/selection-controls.html#switches) – предпочтительный способ установки параметров на мобильных устройствах. Опция, которую контролирует переключатель, и её состояние должны быть четко описаны в соответствующей метке.

## Basic switches

{{"demo": "pages/components/switches/Switches.js"}}

## Switch with FormControlLabel

`Switch` can be provided with a description thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Переключатели с FormGroup

`FormGroup` - это полезная обертка, используемая для группировки компонентов элементов управления выбором, она предоставляет более простой API. However, you are encouraged you to use [Checkboxes](/components/checkboxes/) instead if multiple related controls are required. (See: [When to use](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Кастомизация переключателей

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## Размеры

Fancy smaller switches? Use the `size` property.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Расположение метки

Расположение метки можно изменить:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Бесплатно

- [Чекбоксы. Switch (переключатели)](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Доступность

- У элемента будет роль `checkbox`, а не `switch`, так как эта роль пока слабо поддерживается. Если вы хотите использовать роль `switch`, пожалуйста, сперва проверьте что вспомогательные технологии вашей целевой аудитории её поддерживают. После этого вы можете изменить роль `<Switch inputProps={{ role: 'switch' }}>`
- Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).
- Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```