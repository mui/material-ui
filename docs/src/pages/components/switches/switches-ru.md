---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switch (переключатель)

<p class="description">Переключатели изменяют состояние одного отдельного параметра между "включено" и "выключено".</p>

[Переключатели](https://material.io/design/components/selection-controls.html#switches) – предпочтительный способ установки параметров на мобильных устройствах. Опция, которую контролирует переключатель, и её состояние должны быть четко описаны в соответствующей метке.

{{"demo": "pages/components/switches/Switches.js"}}

## Переключатели с FormControlLabel

`Переключатель` также можно использовать с меткой благодаря компоненту `FormControlLabel`.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Переключатели с FormGroup

`FormGroup` - это полезная обертка, используемая для группировки компонентов элементов управления выбором, она предоставляет более простой API. However, we encourage you to use a [Checkbox](/components/checkboxes/) instead.

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

- It will render an element with the `checkbox` role not `switch` role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with `<Switch inputProps={{ role: 'switch' }}>`
- Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).
- Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```