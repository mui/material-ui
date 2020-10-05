---
title: React Tooltip component
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Tooltip

<p class="description">ユーザーが要素上にマウスを移動したり、要素をフォーカスしたり、タップしたりすると、ツールチップにわかりやすいテキストが表示されます。</p>

[Tooltips](https://material.io/design/components/tooltips.html)をアクティブにすると、機能の説明など、要素を識別するテキストラベルが表示されます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Simple Tooltips

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Positioned Tooltips

`ツールチップ` は、12 **配置** 選択肢があります。 矢印はありません。その代わりに、方向を伝達するためにソースから発生するモーションに依存します。

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customized tooltips

コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Arrow Tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Custom child element

ツールチップは、DOMイベントリスナーをその子要素に適用する必要があります。 ツールチップは、DOMイベントリスナーをその子要素に適用する必要があります。 If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

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

ツールチップをインタラクティブにすることができます。 ツールチップをインタラクティブにすることができます。 `leaveDelay` が期限切れになる前に、ユーザーがツールチップにカーソルを合わせても閉じません。

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## 無効な要素

デフォルトでは無効になっている要素`<button>`はユーザーの操作をトリガーしないため、 `Tooltip`は、ホバーなどの通常のイベントでアクティブになりません。 To accommodate disabled elements, add a simple wrapper element, such as a `span`. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

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

## Transitions

別のトランジションを使用します。

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## 表示と非表示

ツールチップは通常、ユーザーのマウスが要素の上に移動するとすぐに表示され、ユーザーのマウスが離れるとすぐに非表示になります。 ツールチップの表示または非表示の遅延は、上記のControlled Tooltipsデモに示すように、プロパティ `enterDelay` および `leaveDelay`を使用して追加できます。 ツールチップの表示または非表示の遅延は、上記のControlled Tooltipsデモに示すように、プロパティ `enterDelay` および `leaveDelay`を使用して追加できます。

モバイルでは、ユーザーが要素を長押しして1500msの遅延後に非表示になると、ツールチップが表示されます。 `disableTouchListener` プロパティでこの機能を無効にできます。 モバイルでは、ユーザーが要素を長押しして1500msの遅延後に非表示になると、ツールチップが表示されます。 `disableTouchListener` プロパティでこの機能を無効にできます。 `disableTouchListener` プロパティでこの機能を無効にできます。

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

By default, the tooltip only labels its child element. This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label. For example, in:

```html
<button title="some more information">A button</button>
```

the `title` acts as an accessible description. If you want the tooltip to act as an accessible description you can pass `describeChild`. Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "pages/components/tooltips/AccessibilityTooltips.js"}}
