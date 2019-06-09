---
title: React-компонент Кнопка
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Кнопки

<p class="description">Кнопки позволяют пользователям выполнять действия и делать выбор одним нажатием.</p>

[Кнопки](https://material.io/design/components/buttons.html) сообщают о действиях, которые могут выполнять пользователи. Они обычно размещаются в вашем интерфейсе, например:

- Диалоги
- Всплывающие окно
- Формы
- Карточки
- Панели инструментов

## Блочные кнопки

[Блочные кнопки](https://material.io/design/components/buttons.html#contained-button) имеют высокий акцент, отличаются использованием возвышения и заполнения. Они содержат действия, которые являются основными для вашего приложения.

Этот пример показывает, как использовать кнопку загрузки.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Текстовые кнопки

[Текстовые кнопки](https://material.io/design/components/buttons.html#text-button) обычно используются для менее выраженных действий, в том числе расположенных:

- В диалогах
- В карточках - Cards

В Карточках (Cards) текстовые кнопки помогают сохранить акцент на содержании карточки.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Контурные кнопки

[Контурные кнопки](https://material.io/design/components/buttons.html#outlined-button) - это кнопки со средним акцентом. Они содержат действия, которые важны, но не являются основными в приложении.

### Альтернатива

Выделенные кнопки также являются альтернативой выделенным кнопкам или могут использоваться как альтернатива текстовым кнопкам.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Grouped Buttons

The ButtonGroup component can be used to group outlined (the default) or contained buttons.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

## Split Button

ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be use to immediately trigger a related action.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Плавающие кнопки действий

[Плавающая кнопка действия](https://material.io/design/components/buttons-floating-action-button.html) выполняет основное или наиболее распространенное действие на экране. Они отображаются над всем содержимым экрана, обычно в виде закрашенного круга со значком в центре. FABs бывают двух типов: обычные и расширенные.

Используйте плавающую кнопку действий (FAB) только в том случае, если это наиболее подходящий способ представить основное действие экрана.

Для отображения наиболее распространенных действий рекомендуется использовать только одну кнопку с плавающим действием.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

По умолчанию анимация кнопки с плавающим действием на экране является расширяющейся.

Кнопка с плавающим действием, которая охватывает несколько боковых экранов (например, экраны с вкладками), должна анимироваться при переходах.

Переход масштабирование (Zoom) может быть использован для достижения этой цели. Обратите внимание, что так как выход и вход анимации запускаются одновременно, мы используем ` enterDelay `, чтобы разрешить исходящим кнопкам плавающего действия анимироваться постепенно.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## Размеры

Хотите изменить размеры? Используйте параметр `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Кнопки с иконками и текстом

Иногда вы можете захотеть добавить текст для определенной кнопки, чтобы улучшить UX, поскольку мы распознаем логотипы легче, чем обычный текст. Например, если у вас есть кнопка удаления, вы можете пометить ее значком мусорной корзины.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Кнопки с иконками

Кнопки с иконками обычно находятся на панелях навигации и на панелях инструментов.

Значки также подходят для кнопок переключения, которые позволяют выбрать элемент или отменить выбор, например, добавление или удаление звезды для элемента.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Настраиваемые кнопки

Ниже приведены несколько примеров настройки компонента. Более подробно с этой темой можно ознакомиться на [странице документации по переопределению компонентов](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}



## Сложные кнопки

Текстовые кнопки, плавающие кнопки действий, блочные кнопки построены на основе одного и того же компонента: `ButtonBase`. Вы можете воспользоваться этим более низкоуровневым компонентом для создания пользовательских взаимодействий.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Сторонняя библиотека маршрутизации

Одним из распространенных вариантов использования кнопки является переход на новую страницу. `ButtonBase` компонент предоставляет свойство для обработки этого варианта использования: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Учитывая, что многие наши интерактивные компоненты используют `ButtonBase`, у вас есть возможность воспользоваться этим:

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*Note: Creating the Button components is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*