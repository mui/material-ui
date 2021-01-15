---
title: Компонент React Tooltip
components: Tooltip
---

# Tooltip (подсказки)

<p class="description">Всплывающие подсказки отображают информативный текст когда пользователь наводит курсор на элемент, фокусируется на нем или нажимает на него.</p>

При активации, [Tooltips](https://material.io/design/components/tooltips.html) отображают текстовую метку, идентифицирующая элемент, например, описание его функции.

## Простые подсказки

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Позиционированные подсказки

The `Tooltip` has 12 **placements** choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Настраиваемые подсказки

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Arrow Tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Custom child element

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

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

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️ In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'A disabled button'}
    </button>
  </span>
</Tooltip>
```

## Переходы

Используйте другой transition.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

Всплывающая подсказка обычно отображается сразу же, как пользователь наводит курсор на элемент, и сразу же скрывается, когда курсор уходит с элемента. Задержку в отображении или скрытии всплывающей подсказки можно добавить через свойства `enterDelay` и `leaveDelay`, как показано выше в демонстрационной версии «Контролируемые подсказки».

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}