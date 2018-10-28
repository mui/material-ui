---
title: 工具提示 React 组件
components: Tooltip
---
# 工具提示

<p class="description">工具提示会显示有意义的文本，当用户鼠标悬浮, 焦点或者轻触一个元素时。</p>

当它触发时， [Tooltips](https://material.io/design/components/tooltips.html) 会显示一个标识一个元素的文本标签，比如对该功能的描述。

## 简单的工具提示

{{"demo": "pages/demos/tooltips/SimpleTooltips.js"}}

## 定位的工具提示

`工具提示` 有 12 个 **位置** 选择。 它们没有方向箭头；相反， 他们依赖从源头发出的运动来改变方向。

{{"demo": "pages/demos/tooltips/PositionedTooltips.js"}}

## 受控的工具提示

你可以使用 `open`， `onOpen` 和`onClose` 属性来控制工具提示的行为。

{{"demo": "pages/demos/tooltips/ControlledTooltips.js"}}

## 触发器

你可以定义各种类型的事件让一个工具提示显示。

{{"demo": "pages/demos/tooltips/TriggersTooltips.js"}}

## 过渡动画

使用不同的转换。

{{"demo": "pages/demos/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

当用户的鼠标悬浮在该元素时工具提示会立即显示，并且当用户鼠标离开时立即隐藏。 A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/demos/tooltips/DelayTooltips.js"}}

## Disabled Elements

By default disabled elements like `Button` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accomodate disabled elements, add a simple wrapper element like a `span`.

{{"demo": "pages/demos/tooltips/DisabledTooltips.js"}}

## Customized Tooltips

{{"demo": "pages/demos/tooltips/CustomizedTooltips.js"}}

## Variable Width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/demos/tooltips/VariableWidth.js"}}