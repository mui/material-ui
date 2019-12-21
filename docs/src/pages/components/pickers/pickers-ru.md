---
title: Date picker, Time picker React components
components: TextField
---

# Поля выбора даты/времени

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- На мобильном устройстве лучше всего отображать в модальном окне.
- Для инлайн-отображения, например в формах стоит рассмотреть возможность использования более компактных элементов управления, таких как сегментированные выпадающие кнопки.

## @material-ui/pickers

![stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date picker and time picker controls.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠️ Поддержка нативных типов полей ввода [не идеальна](https://caniuse.com/#feat=input-datetime). Взгяните на [@material-ui/pickers](https://material-ui-pickers.dev/) для более детального решения.

### Выбор даты

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Поля выбора даты & времени

Нативное поля выбора даты и времени с помощью `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Поля выбора времени

Нативное поле выбора времени с помощью `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}