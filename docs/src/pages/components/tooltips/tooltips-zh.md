---
title: React Tooltip（工具提示）组件
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Tooltip 工具提示

<p class="description">当用户鼠标悬停，聚焦或者轻触一个元素时，工具提示组件会显示一段有意义的文本。</p>

当它触发时， Tooltips 会显示标识一个元素的文本标签，比如对该功能的描述。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic tooltip

{{"demo": "pages/components/tooltips/BasicTooltip.js"}}

## 文字提示的位置

`Tooltip` 有 12 个**位置** 选项。 它们没有方向箭头，而是依靠源头发出的运动来传递方向。

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customization 个性化

你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## 文字提示的箭头

您可以通过添加 `arrow` 属性向提示标签增加箭头指示器，从而可以凸显所指示的元素。

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## 自定义子元素

文字提示组件需要将 DOM 事件监听器应用到其子元素当中。 If the child is a custom React element, you need to make sure that it spreads its props to the underlying DOM element.

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

The touch action requires a long press due to the `enterTouchDelay` prop being set to `700`ms by default.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## 受控的文字提示

You can use the `open`, `onOpen` and `onClose` props to control the behavior of the tooltip.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## 变量宽度

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## 交互式

Tooltips are interactive by default (to pass [WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)). It won't close when the user hovers over the tooltip before the `leaveDelay` is expired. You can disable this behavior (thus failing the success criterion which is required to reach level AA) by passing `disableInteractive`.

{{"demo": "pages/components/tooltips/NonInteractiveTooltips.js"}}

## 禁用元素

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️  为了在 Safari 中正常显示，在文字提示的包装组件中，您至少需要一个 display 为 block 或 flex 的元素。

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a MUI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property _pointer-events: none;_ to your element when disabled:

```jsx
<Tooltip title="您没有足够的操作权限">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: 'none' } : {}}>
      一个禁用的按钮
    </button>
  </span>
</Tooltip>
```

## 过渡动画

使用不同的过渡动画。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## 跟踪光标

You can enable the tooltip to follow the cursor by setting `followCursor={true}`.

{{"demo": "pages/components/tooltips/FollowCursorTooltips.js"}}

## 虚拟元素

In the event you need to implement a custom placement, you can use the `anchorEl` prop: The value of the `anchorEl` prop can be a reference to a fake DOM element. 你需要创建一个类似 [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/) 的对象。

{{"demo": "pages/components/tooltips/AnchorElTooltips.js"}}

## 显示和隐藏组件

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the `enterDelay` and `leaveDelay` props, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` prop.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

By default, the tooltip only labels its child element. This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label. For example, in:

```html
<button title="some more information">一个按钮</button>
```

the `title` acts as an accessible description. If you want the tooltip to act as an accessible description you can pass `describeChild`. Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "pages/components/tooltips/AccessibilityTooltips.js"}}
