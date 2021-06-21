---
title: React Tooltip（工具提示）组件
components: Tooltip
---

# Tooltip 工具提示

<p class="description">当用户鼠标悬停，聚焦或者轻触一个元素时，工具提示组件会显示一段有意义的文本。</p>

当激活 [工具提示组件](https://material.io/design/components/tooltips.html) 时，该组件会显示一个带有标识元素（identifying element）的文本标签，譬如，一段对其功能的描述。

## 简单的工具提示

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## 工具提示的定位

`工具提示组件`提供了 12 个**位置**的选项。 它们没有方向箭头，而是依靠代码指示的移动情况来移动文字提示的出现位置。

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## 自定义文字提示

你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页](/customization/components/) 中了解有关此内容的更多信息。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## 带箭头的工具提示

您可以通过添加 `arrow` 属性向提示标签增加箭头指示器，从而可以凸显所指示的元素。

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## 自定义子元素

文字提示组件需要将 DOM 事件监听器应用到其子元素当中。 如果子元素是一个自定义的 React 组件，那么你需要确保其属性能够传递给底部的 DOM 元素。

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  // 将属性传递给底部的 DOM 元素。
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="删除">
  <MyComponent>
</Tooltip>
```

您可以在[包装的组件](/guides/composition/#wrapping-components)指南中找到类似的概念。

## 触发器

你可以定义各种类型的事件来触发显示工具提示组件。

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## 可控的工具提示

使用 `open`， `onOpen` 和 `onClose` 这些属性，您可以控制工具提示的行为。

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## 可变的宽度

为了保证可阅读性，`工具提示组件` 默认将较长的文字折行。

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## 交互式

工具提示可以是可交互的。 若用户在 `leaveDelay` 过期之前将鼠标悬停在工具提示上时，它则不会被关闭。

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## 禁用的元素

默认情况下，被禁用的元素（如 `<Button>`）不会触发用户交互行为，因此 hover 等普通的事件不会激活`工具提示`的显示。 若想容纳已禁用的元素激活工具提示，请添加一个简单的包装元素，如 `span`。

> ⚠️ 为了在 Safari 中正常显示，在文字提示的包装组件中，您至少需要一个 display 为 block 或 flex 的元素。

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> 如果您没有包装从 `ButtonBase` 继承的 Material-UI 组件，譬如一个原生的 `<button>` 元素，当禁用元素的时候，您应该将 *pointer-events: none;* 这个CSS 属性添加到您的元素中：

```jsx
<Tooltip title="您没有足够的操作权限">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'一个禁用的按钮'}
    </button>
  </span>
</Tooltip>
```

## 过渡动画

使用不同的过渡动画。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## 显示和隐藏组件

一般情况下，当用户的鼠标悬停在元素上时，工具提示会立即显示，而用户的鼠标离开当前元素时，它则会立即隐藏。 您也可以使用 `enterDelay` 和 `leaveDelay` 属性来控制显示和隐藏文字提示的延迟，请参考以上“可控的工具提示”的演示。

在移动设备上使用时，用户长按元素就会显示出文字提示，并且持续 1500ms 之后就会自动隐藏。 您可以使用 `disableTouchListener` 属性禁用此功能。

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}