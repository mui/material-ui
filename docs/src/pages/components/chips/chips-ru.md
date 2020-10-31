---
title: Компонент React Chip
components: Chip
---

# Chip (фишка)

<p class="description">Фишки - это компактные элементы, представляющие входные данные, атрибут или действие.</p>

[Фишки](https://material.io/design/components/chips.html) позволяют пользователям вводить информацию, делать выбор, фильтровать контент или инициировать действия.

Несмотря на то, что он включен здесь как автономный компонент, наиболее распространенное использование будет в той или иной форме ввода, поэтому некоторые из продемонстрированных здесь действий не показаны в контексте.

## Chip

Примеры фишек, использующих изображения, SVG-иконку, «Символ» и строку в качестве аватара.

- Фишки с заданным свойством `onClick` могут изменять внешний вид при фокусировке, наведении курсора и клике.
- Фишки с определенным свойством `onDelete` будут отображать значок удаления который меняет внешний вид при наведении курсора.

{{"demo": "pages/components/chips/Chips.js"}}

### Контурные фишки

Контурные фишки предлагают альтернативный стиль.

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## Массив фишек

Пример рендеринга нескольких фишек из массива значений. Удаление фишки удаляет ее из массива. Обратите внимание, что поскольку свойство `onClick` не определено, фишка может быть сфокусирована, но не получает глубины при щелчке или касании.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Маленькая фишка

Для определения маленькой фишки можно использовать свойство `size`.

### Вариант по умолчанию

{{"demo": "pages/components/chips/SmallChips.js"}}

### Контурный вариант

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## Песочница

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Доступность

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (e.g. when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.