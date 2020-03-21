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

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Текстовые кнопки

[Текстовые кнопки](https://material.io/design/components/buttons.html#text-button) обычно используются для менее выраженных действий, в том числе расположенных:

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

Значки также подходят для кнопок переключения, которые позволяют выбрать элемент или отменить выбор, например, добавление или удаление звезды для элемента.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Настраиваемые кнопки

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Сложные кнопки

Текстовые кнопки, плавающие кнопки действий, блочные кнопки построены на основе одного и того же компонента: `ButtonBase`. Вы можете воспользоваться этим более низкоуровневым компонентом для создания пользовательских взаимодействий.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Сторонняя библиотека маршрутизации

One common use case is to use the button to trigger navigation to a new page. `ButtonBase` компонент предоставляет свойство для обработки этого варианта использования: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an [integration example with react-router](/guides/composition/#button).

## Ограничения

### Cursor not-allowed

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**. You can remove the pointer events style on the disabled state of the `<button>` element:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements).
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM change**. You can wrap the button:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

This has the advantage of supporting any element, for instance, a link `<a>` element.