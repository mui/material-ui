---
title: Tooltip React component
components: Tooltip
---

# Всплывающие подсказки

<p class="description">Всплывающие подсказки отображают информативный текст когда пользователь наводит курсор на элемент, фокусируется на нем или нажимает на него.</p>

При активации, [Tooltips](https://material.io/design/components/tooltips.html) отображают текстовую метку, идентифицирующая элемент, например, описание его функции.

## Простые подсказки

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Позиционированные подсказки

The `Tooltip` has 12 **placements** choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Настраиваемые подсказки

Ниже приведены несколько примеров настройки компонента. Более подробно с этой темой можно ознакомиться на [странице документации по переопределению компонентов](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Custom child element

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
function MyComponent(props) {
  // We spread the properties to the underlying DOM element.
  return <div {...props}>Bin</div>
}

// ...

<Tooltip title="Delete">
  <MyComponent>
</Tooltip>
```

You can find a similar concept in the [wrapping components](/guides/composition/#wrapping-components) guide.

## Триггеры

You can define the types of events that cause a tooltip to show.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Контролируемые подсказки

Вы можете использовать `open`, `onOpen` and `onClose` свойства, чтобы контролировать поведение всплывающей подсказки.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Вариативная ширина

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Интерактивность

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Неактивные элементы

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element like a `span`.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## Transições

Используйте другой transition.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

Всплывающая подсказка обычно отображается сразу же, как пользователь наводит курсор на элемент, и сразу же скрывается, когда курсор уходит с элемента. Задержку в отображении или скрытии всплывающей подсказки можно добавить через свойства `enterDelay` и `leaveDelay`, как показано выше в демонстрационной версии «Контролируемые подсказки».

На мобильном телефоне всплывающая подсказка отображается, когда пользователь нажимает на элемент и скрывается после задержки в 1500 мс Вы можете отключить эту функцию с помощью свойства `disableTouchListener`.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}