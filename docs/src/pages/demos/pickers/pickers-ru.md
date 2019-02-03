---
title: Date Picker, Time Picker React компоненты
components: TextField
---
# Пикеры

<p class="description">Пикеры предоставляют возможность выбрать единственное значение из заранее заданного множества.</p>

- На мобильном устройстве лучше всего отображать в модальном окне.
- Для инлайн-отображения, например в формах стоит рассмотреть возможность использования более компактных элементов управления, таких как сегментированные выпадающие кнопки.

#### Внимание

Мы поддерживаем только **нативные типы полей ввода**.

⚠️ Поддержка нативных типы полей ввода [не идеальна](https://caniuse.com/#feat=input-datetime). Рассмотрите [дополнительные проекты](#complementary-projects) для более сложных решений.

## Поля ввода времени

Пример нативного поля ввода даты с помощью `type="date"`, может быть использована как календарь.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Поля ввода даты и времени

Нативное поля ввода даты и времени с помощью `type="datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## Поля ввода даты

Нативное поле ввода времени с помощью `type="time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Дополнительные проекты

For more advanced use cases you might be able to take advantage of.

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) предоставляет поля ввода даты и времени, в соответствии c Material Design спецификацией.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Другое

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): time pickers.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): date pickers and time pickers.