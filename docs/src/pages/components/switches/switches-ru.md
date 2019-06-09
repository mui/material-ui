---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switch (переключатели)

<p class="description">Переключатели изменяют состояние одного отдельного параметра между "включено" и "выключено".</p>

[Переключатели](https://material.io/design/components/selection-controls.html#switches) – предпочтительный способ установки параметров на мобильных устройствах. Опция, которую контролирует переключатель, и её состояние должны быть четко описаны в соответствующей метке.

{{"demo": "pages/components/switches/Switches.js"}}

## Переключатели с FormControlLabel

`Переключатель` также можно использовать с меткой благодаря компоненту `FormControlLabel`.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Переключатели с FormGroup

`FormGroup` - это полезная обертка, используемая для группировки компонентов элементов управления выбором, она предоставляет более простой API. However, we encourage you to use a [Checkbox](#checkboxes) instead.

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Кастомизация переключателей

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## Расположение метки

Расположение метки можно изменить:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Доступность

Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).

Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```