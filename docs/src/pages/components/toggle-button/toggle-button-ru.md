---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# Toggle Buttons

<p class="description">Toggle buttons can be used to group related options.</p>

To emphasize groups of related [Toggle buttons](https://material.io/components/buttons#toggle-button), a group should share a common container. The `ToggleButtonGroup` controls the selected state of its child buttons when given its own `value` prop.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Exclusive selection

С исключительным выделением выбор одной опции снимает выделение с остальных.

В этом примере кнопки переключения представляют варианты выравнивания текста left, center, right и fully justified text (отключено), с возможностью выбора лишь одного элемента.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Multiple selection

Множественное выделение позволяет выбрать несколько вариантов из логически связанных опций, таких как bold, italic, и underline.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Размеры

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Vertical buttons

Кнопки можно выстроить вертикально задав свойству `orientation` значение "vertical".

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Enforce value set

Если вы хотите, чтобы по крайней мере одна кнопка была активной, то можете адаптировать под себя функцию handleChange.

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Доступность

### ARIA

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.

### Keyboard

В настоящее время кнопки переключения расположены в порядке DOM. Для перемещения между ними используйте клавишу табуляции. Поведение кнопки следует стандартной семантике клавиатуры.
