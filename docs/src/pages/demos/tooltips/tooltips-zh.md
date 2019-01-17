---
title: 文字提示 React 组件
components: Tooltip
---
# 文字提示

<p class="description">当用户鼠标悬浮，聚焦或者轻触一个元素时，文字提示会显示有意义的文本。</p>

当它触发时， [Tooltips](https://material.io/design/components/tooltips.html) 会显示一个标识一个元素的文本标签，比如对该功能的描述。

## 简单的文字提示

{{"demo": "pages/demos/tooltips/SimpleTooltips.js"}}

## 文字提示的定位

`文字提示` 有 12 个 **位置** 可供选择。 它们没有方向箭头；相反的，它们依靠从源头发出的运动来传达自己的方向。

{{"demo": "pages/demos/tooltips/PositionedTooltips.js"}}

## Customized Tooltips

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here's an example of how you can theme a tooltip.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/tooltips/CustomizedTooltips.js"}}

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

## Triggers

You can define the types of events that cause a tooltip to show.

{{"demo": "pages/demos/tooltips/TriggersTooltips.js"}}

## Controlled Tooltips

You can use the `open`, `onOpen` and `onClose` properties to control the behavior of the tooltip.

{{"demo": "pages/demos/tooltips/ControlledTooltips.js"}}

## Variable Width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/demos/tooltips/VariableWidth.js"}}

## 交互式

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/demos/tooltips/InteractiveTooltips.js"}}

## Disabled Elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element like a `span`.

{{"demo": "pages/demos/tooltips/DisabledTooltips.js"}}

## 过渡动画

Use a different transition.

{{"demo": "pages/demos/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/demos/tooltips/DelayTooltips.js"}}