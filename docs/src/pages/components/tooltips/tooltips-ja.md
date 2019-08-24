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

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [overrides documentation page](/customization/components/)を参照してください。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Custom child element

ツールチップは、DOMイベントリスナーをその子要素に適用する必要があります。 子がカスタムReact要素の場合は、そのプロパティを基になるDOM要素に確実に分散させる必要があります。

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

ツールチップをインタラクティブにすることができます。 `leaveDelay` が期限切れになる前に、ユーザーがツールチップにカーソルを合わせても閉じません。

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## 無効な要素

デフォルトでは無効になっている要素`<button>`はユーザーの操作をトリガーしないため、 `Tooltip`は、ホバーなどの通常のイベントでアクティブになりません。 無効な要素に対応するために、 `span`ような単純なラッパー要素を追加します。

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## トランジション

別のトランジションを使用します。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## 表示と非表示

ツールチップは通常、ユーザーのマウスが要素の上に移動するとすぐに表示され、ユーザーのマウスが離れるとすぐに非表示になります。 ツールチップの表示または非表示の遅延は、上記のControlled Tooltipsデモに示すように、プロパティ `enterDelay` および `leaveDelay`を使用して追加できます。

モバイルでは、ユーザーが要素を長押しして1500msの遅延後に非表示になると、ツールチップが表示されます。 `disableTouchListener` プロパティでこの機能を無効にできます。

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}