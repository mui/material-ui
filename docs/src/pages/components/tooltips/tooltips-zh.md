---
title: 文字提示 React 组件
components: Tooltip
---

# 文字提示

<p class="description">当用户鼠标悬浮，聚焦或者轻触一个元素时，文字提示会显示有意义的文本。</p>

当它触发时， [Tooltips](https://material.io/design/components/tooltips.html) 会显示一个标识一个元素的文本标签，比如对该功能的描述。

## 简单的文字提示

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## 文字提示的定位

`文字提示` 有 12 个 **位置** 可供选择。 它们没有方向箭头；相反的，它们依靠从源头发出的运动来传达自己的方向。

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customized tooltips

以下是自定义组件的一些示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## 自定义子元素

工具提示需要将DOM事件侦听器应用于其子元素。 如果子项是自定义的React元素，则需要确保它将其属性传播到基础DOM元素。

```jsx
function MyComponent(props) {
  // 我们将属性扩展到底层DOM元素。
  return <div {...props}>Bin</div>
}

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

## 可变的容器宽度

`Tooltip` 为了保证较好的阅读性，会自动将较长的文字折行。

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## 交互式

文字提示可以是交互式的。当用户在 `leaveDelay` 过期之前将鼠标悬停在工具提示上时, 它不会关闭。

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## 对于 disabled 的元素

默认情况下，`<Button>`等disabled的元素不会触发用户交互，因此`Tooltip`不会在hover等正常事件上激活显示。 要允许已禁用的元素激活文字提示，请添加一个简单的包装元素，如`span`。

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## 过渡动画

使用不同的过渡动画。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## 显示和隐藏

当用户的鼠标悬浮在该元素时工具提示会立即显示，并且当用户鼠标离开时立即隐藏。 可以通过` enterDelay `和` leaveDelay `属性来控制显示及隐藏文字提示的延迟，如上面的控制文字提示演示中所示。

在移动设备上，当用户长按元素并在延迟1500ms后，将显示文字提示。 您可以使用`disableTouchListener`属性禁用此功能。

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}