---
title: React-компонент Кнопка
components: Button, IconButton, ButtonBase
---

# Button (кнопки)

<p class="description">Кнопки позволяют пользователям выполнять действия и делать выбор одним нажатием.</p>

[Кнопки](https://material.io/design/components/buttons.html) обозначают действия, которые могут выполнять пользователи. Они используются в таких местах пользовательского интерфейса, как:

- Диалоги
- Всплывающие окно
- Формы
- Карточки
- Панели инструментов

## Блочные кнопки

[Блочные кнопки](https://material.io/design/components/buttons.html#contained-button) имеют высокий акцент, отличаются использованием возвышения и заполнения. Они содержат действия, которые являются основными для вашего приложения.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Вы можете убрать эффект "всплытия" с помощью опции `disableElevation`.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Текстовые кнопки

[Текстовые кнопки](https://material.io/design/components/buttons.html#text-button) обычно используются для менее важных действий, в том числе расположенных:

- В диалогах
- В карточках - Cards

В Карточках (Cards) текстовые кнопки помогают сохранить акцент на содержании карточки.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Контурные кнопки

[Контурные кнопки](https://material.io/design/components/buttons.html#outlined-button) - это кнопки со средним акцентом. Они содержат действия, которые важны, но не являются основными в приложении.

Выделенные кнопки также являются альтернативой выделенным кнопкам или могут использоваться как альтернатива текстовым кнопкам.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Кнопка загрузки файла

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Размеры

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Кнопки с иконками и текстом

Иногда вы можете захотеть добавить текст для определенной кнопки, чтобы улучшить UX, поскольку мы распознаем логотипы легче, чем обычный текст. Например, если у вас есть кнопка удаления, вы можете пометить ее значком мусорной корзины.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Кнопки с иконками

Кнопки с иконками обычно находятся на панелях навигации и на панелях инструментов.

Иконки также подходят для кнопок переключения, которые позволяют выбрать элемент или отменить выбор, например, добавление или удаление звезды для элемента.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Настраиваемые кнопки

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

Если вам нужно вдохновение обратитве внимание на библиотеку компонентов [MUI Treasury](https://mui-treasury.com/components/button).

## Сложные кнопки

Текстовые кнопки, плавающие кнопки действий, блочные кнопки построены на основе одного и того же компонента: `ButtonBase`. Вы можете воспользоваться этим более низкоуровневым компонентом для создания пользовательских кнопок.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Сторонняя библиотека маршрутизации

Одно из обыденных случаев использования кнопки - это навигация на другую страницу. `ButtonBase` компонент предоставляет свойство для обработки этого варианта использования: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. Этого можно достичь, указав ref для данного компонента, ожидая что компонент пересылает этот ref в базовый узел DOM. Учитывая то, что многие наши компоненты используют `ButtonBase`, вы сможете пользоваться ими повсюду в вашем приложении.

Здесь можно ознакомится [с примером использования с react-router](/guides/composition/#button).

## Ограничения

### Cursor not-allowed

Компонент ButtonBase устанавливает `pointer-events: none;` на отключенных (disabled) кнопках, что отменяет появление disabled-курсора.

Есть два способа использовать `not-allowed`

1. **CSS only**. Вы можете удалить все стили событий курсора в выключенном(disabled) состоянии в элементе `<button>`:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

Однако:

- Необходимо вернуть `pointer-events: none;` назад, в момент когда вам нужно будет отобразить [подсказку на отключенном элементе](/components/tooltips/#disabled-elements).
- Курсор не изменится, в случае если вы отрендерите какой-либо другой элемент, например `<a>`.

2. **DOM change**. Вы можете обернуть кнопку в дополнительный контейнер:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

Этот способ работает для всех элементов, в том числе и для `<a>`.