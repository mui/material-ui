---
title: Date Picker, Time Picker React компоненты
components: TextField
---
# Поля выбора

<p class="description">Поля выбора предоставляют возможность выбрать единственное значение из заранее заданного множества.</p>

- На мобильном устройстве лучше всего отображать в модальном окне.
- Для инлайн-отображения, например в формах стоит рассмотреть возможность использования более компактных элементов управления, таких как сегментированные выпадающие кнопки.

## Native pickers

⚠️ Поддержка нативных типов полей ввода [не идеальна](https://caniuse.com/#feat=input-datetime). Have a look at the [complementary projects](#complementary-projects) for a richer solution.

### Поля выбора даты

A native date picker example with `type="date"`.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

### Поля выбора даты & времени

Нативное поля выбора даты и времени с помощью `type="datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

### Поля выбора времени

Нативное поле выбора времени с помощью `type="time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться.

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) предоставляет поля ввода даты и времени, в соответствии c Material Design спецификацией.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Прочее

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): поле выбора времени.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): поле выбора даты и времени.