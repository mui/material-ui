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

The `Tooltip` has 12 **placements** choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customized tooltips

Here are some examples of customizing the component. 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

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

同様の概念は、[wrapping components](/guides/composition/#wrapping-components)ガイドにも記載されています。

## Triggers

ツールチップを表示するイベントのタイプを定義できます。

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Controlled Tooltips

`open`, `onOpen` and `onClose` の各プロパティを使用して、ツールチップの動作を制御できます。

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Variable Width

既定では、`Tooltip`は長いテキストを折り返して読みやすくします。

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## インタラクティブ

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Disabled Elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element like a `span`.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## Transições

Use a different transition.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties `enterDelay` and `leaveDelay`, as shown in the Controlled Tooltips demo above.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}