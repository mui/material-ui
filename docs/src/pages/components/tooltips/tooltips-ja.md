---
title: Tooltip React component
components: Tooltip
---

# Tooltip

<p class="description">ユーザーが要素上にマウスを移動したり、要素をフォーカスしたり、タップしたりすると、ツールチップにわかりやすいテキストが表示されます。</p>

[Tooltips](https://material.io/design/components/tooltips.html)をアクティブにすると、機能の説明など、要素を識別するテキストラベルが表示されます。

## Simple Tooltips

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Positioned Tooltips

`ツールチップ` は、12 **配置** 選択肢があります。 矢印はありません。その代わりに、方向を伝達するためにソースから発生するモーションに依存します。

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customized tooltips

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

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

## Triggers

You can define the types of events that cause a tooltip to show.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Controlled Tooltips

You can use the `open`, `onOpen` and `onClose` properties to control the behavior of the tooltip.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Variable Width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## インタラクティブ

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Disabled Elements

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

## Transições

別のトランジションを使用します。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}