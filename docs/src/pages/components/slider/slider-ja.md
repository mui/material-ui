---
title: React Slider component
components: Slider
---

# Slider

<p class="description">スライダーを使用すると、ユーザーは値の範囲から選択できます。</p>

[Sliders](https://material.io/design/components/sliders.html) reflect a range of values along a bar, from which users may select a single value. ボリューム、輝度などの設定を調整したり、画像フィルターを適用したりするのに理想的です。

- 📦 [22 kB gzipped](/size-snapshot) (but only +8 kB when used together with other Material-UI components).

## 連続スライダー

連続スライダーにより、ユーザーは主観的な範囲に沿って値を選択できます。

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## 個別のスライダー

個別のスライダーは、値インジケーターを参照することで特定の値に調整できます。 デモ順：

`marks={true}`で各ステップのマークを生成できます。

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Small steps

デフォルトのステップ増分を変更できます。

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### Custom marks

`marks`プロップに豊富な配列を提供することにより、カスタムマークを作成できます。

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### Restricted values

選択可能な値を、 `marks` prop with `step ={null}`で、提供される値に制限できます。

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Label always visible

`valueLabelDisplay = "on"`すると、常にサムラベルを強制的に表示できます。

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Range slider

The slider can be used to set the start and end of a range by supplying an array of values to the `value` prop.

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Slider with input field

In this example an input allows a discrete value to be set.

{{"demo": "pages/components/slider/InputSlider.js"}}

## Customized sliders

コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドドキュメントページ](/customization/components/)ご覧ください。

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## 垂直スライダー

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Inverted track

The track can be inverted with `track="inverted"`.

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale. For instance, in the following demo, the value *x* represents the power of *10^x*.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

コンポーネントは、アクセス可能にするために必要なほとんどの作業を処理します。 ただし、次の点を確認する必要があります。 ただし、次の点を確認する必要があります。 ただし、次の点を確認する必要があります。

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. 値がラベルのセマンティクスと一致する場合、これは必要ありません。 この名前は、 `getAriaValueText`または`aria-valuetext`プロパティを使用して変更できます。