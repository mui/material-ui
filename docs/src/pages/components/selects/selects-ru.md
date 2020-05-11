---
title: Select React component
components: Select, NativeSelect
---

# Select (Список)

<p class="description">Компонент Select используются для сбора информации, предоставленной пользователем, из списка параметров.</p>

## Простой список

Меню располагаются над вызвавшими их элементами таким образом, чтобы элемент меню, выбранный в данный момент, перекрывал вызывающий элемент.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Расширенные возможности

Компонент Select взаимозаменяем с нативным элементом `<select>`.

Для более продвинутых опций, таких как Комбинированные Списки, Множественный Выбор, Автодополнения, а также поддержки async или Creatable, воспользуйтесь компонентом [`Autocomplete`](/components/autocomplete/). It's meant to be an improved version of the "react-select" and "downshift" packages.

## Нативный список

Мы допускаем этот подход, так как использование нативных списков на мобильных платформах улучшает опыт пользователя (User Experience).

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Текстовые поля

`TextField` представляет собой полноценный элемент управления формы, включая метку (label), само поле ввода и вспомогательный текст. Вы можете найти пример с режимом списка (Select) [в этой секции](/components/text-fields/#select).

## Кастомизированные списки

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

Первый этап - стилизация компонента `InputBase`. После стилизации, вы можете использовать компонент напрямую как текстовое поле, либо передать его в компонент `Select`, свойством `input`. В последнем случае вы получите список.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## Список с множественным выбором

Компонент `Select` поддерживает множественный выбор. Он управляется свойством `multiple`.

Как и с одиночным списком, новое значение может быть получено из поля `event.target.value`, в коллбеке `onChange`. Это значение всегда является массивом.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## Контроль открытия/закрытия

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Внутри диалогового окна

Хоть это и не приветствуется спецификацией Material Design, вы можете использовать список внутри диалогового окна.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Группировка

Используйте компонент `ListSubheader` или нативный элемент `<optgroup>` для отображения категорий.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Доступность

Чтобы правильно подписать ваш элемент `Select`, вам потребуется дополнительный элемент со свойством `id`. Значение `id` должно совпадать со значением свойства `labelId` компонента `Select`, например

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

В качестве альтернативы, компонент `TextField` со свойствами `id` и `label` создадут подходящую разметку:

```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

For a [native select](#native-select), you should mention a label by giving the value of the `id` attribute of the select element to the `InputLabel`'s `htmlFor` attribute:

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```