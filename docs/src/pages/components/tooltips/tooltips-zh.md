---
title: 文字提示 React 组件
components: Tooltip
---

# Tooltip 提示

<p class="description">当用户鼠标悬浮，聚焦或者轻触一个元素时，文字提示会显示有意义的文本。</p>

当它触发时， [Tooltips](https://material.io/design/components/tooltips.html) 会显示一个标识一个元素的文本标签，比如对该功能的描述。

## 简单的文字提示

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## 文字提示的定位

The `Tooltip` has 12 **placements** choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## 自定义文字提示

以下是自定义组件的一些例子。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## 带箭头的提示

您可以通过添加`arrow` 属性给你的提示标签增加箭头指示器，从而可以更突出所指示的元素

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## 自定义子元素

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="删除">
  <MyComponent>
</Tooltip>
```

您可以在 [包装组件](/guides/composition/#wrapping-components) 指南中找到类似的概念。

## 触发器

你可以定义各种类型的事件让一个文字提示显示。

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## 控制文字提示

你可以使用 `open`， `onOpen` 和`onClose` 属性来控制工具提示的行为。

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## 可变宽度

`Tooltip` 为了保证较好的阅读星，会自动将较长的文字折行。

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## 交互式

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## 停用元素

默认情况下，`<Button>`等disabled的元素不会触发用户交互，因此`Tooltip`不会在hover等正常事件上激活显示。 To accommodate disabled elements, add a simple wrapper element, such as a `span`.

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

## Transitions（过渡动画）

使用不同的过渡动画。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## 显示和隐藏

当用户的鼠标悬浮在该元素时工具提示会立即显示，并且当用户鼠标离开时立即隐藏。 可以通过` enterDelay `和` leaveDelay `属性来控制显示及隐藏文字提示的延迟，如上面的控制文字提示演示中所示。

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}