---
title: Date Picker, Time Picker React components
components: TextField
---
# Пикеры

<p class="description">Пикеры предоставляют возможность выбрать единственное значение из заранее заданного множества.</p>

- На мобильном устройстве лучше всего отображать в модальном окне.
- Для инлайн-отображения, например в формах стоит рассмотреть возможность использования более компактных элементов управления, таких как сегментированные выпадающие кнопки.

#### Внимание

Мы поддерживаем только **нативные типы полей ввода**.

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime). Have a look at the [complementary projects](#complementary-projects) for richer solutions.

## Date pickers

A native date picker example with `type="date"`, it can be used as a calendar too.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Date & Time pickers

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## Time pickers

A native time picker example with `type="time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Complementary projects

For more advanced use cases you might be able to take advantage of.

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) provides date and time controls that follow the Material Design spec.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Other

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): time pickers.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): date pickers and time pickers.