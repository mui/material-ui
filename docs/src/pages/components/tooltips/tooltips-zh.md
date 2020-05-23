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

`Tooltip` 有12个**位置**选项。 They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## 自定义文字提示

以下是自定义组件的一些例子。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## 带箭头的提示

您可以通过添加 `arrow` prop 给你的提示标签增加箭头指示器，从而可以更突出所指示的元素。

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## 自定义子元素

文字提示需要将 DOM 事件监听器应用到其子元素。 如果子元素是自定义的 React 组件，你需要确保它能够将其属性传播到底部的 DOM 元素。

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

您可以在 [wrapping components](/guides/composition/#wrapping-components) 指南中找到类似的概念。

## 触发器

你可以定义各种类型的事件让一个文字提示显示。

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## 受控的文字提示

你可以使用 `open`， `onOpen` 和 `onClose` 属性来控制工具提示的行为。

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## 可变宽度

`Tooltip` 为了保证较好的阅读性，会自动将较长的文字折行。

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## 交互式

文字提示可以是可交互的。 当用户在 `leaveDelay` 过期之前将鼠标悬停在文字提示上时，它不会被关闭。

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## 停用元素

默认情况下，被禁用的元素 (如 `<Button>` ) 不会触发用户交互，因此 `Tooltip` 不会在 hover 等正常事件上激活显示。 要允许已禁用的元素激活文字提示，请添加一个简单的元素包装，如 `span`。

> ⚠️ 为了在 Safari 中正常工作，您需要在文字提示中至少有一个 display 为 block 或 flex 的元素。

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> 如果您没有包装从 `ButtonBase` 继承的Material-UI组件，如原生的 `<button>` 元素，您应该在禁用时将CSS属性 *pointer-events：none;* 添加到您的元素中：

```jsx
<Tooltip title="您没有足够的权限">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'一个被禁用的按钮'}
    </button>
  </span>
</Tooltip>
```

## 过渡动画

使用不同的过渡动画。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## 显示和隐藏

当用户的鼠标悬浮在该元素时文字提示会立即显示，并且当用户鼠标离开时立即隐藏。 可以通过 `enterDelay` 和 `leaveDelay` 属性来控制显示及隐藏文字提示的延迟，如上面的"受控的文字提示"部分的例子所示。

在移动设备上，当用户长按元素时文字提示将会显示，并在1500ms的延迟后隐藏。 您可以使用 `disableTouchListener` 属性禁用此功能。

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}