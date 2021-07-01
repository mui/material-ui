---
title: React Slider component
components: Slider
---

# Slider

<p class="description">スライダーを使用すると、ユーザーは値の範囲から選択できます。</p>

[Sliders](https://material.io/design/components/sliders.html) は、バーに沿って値の範囲を反映し、ユーザーはそこから単一の値を選択できます。 音量、明るさ、画像フィルタの適用などの設定を調整するのに最適です。

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

`step={null}` を追加すると、選択可能な値を `marks` プロパティで指定した値に制限できます。

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Label always visible

`valueLabelDisplay = "on"`すると、常にサムラベルを強制的に表示できます。

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Range slider

スライダーを使用して、 `value` プロパティに値の配列を供給することで、範囲の開始と終了を設定できます。

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Slider with input field

この例では、入力によって離散値を設定することができます。

{{"demo": "pages/components/slider/InputSlider.js"}}

## Customized sliders

コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドドキュメントページ](/customization/components/)ご覧ください。

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## 垂直スライダー

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## Track

Trackは、ユーザーが選択可能な範囲を表示します。

### Removed track

`track={false}` でTrackをオフにできます。

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Inverted track

`track="inverted"` でTrackを反転できます。

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Non-linear scale

`scale` プロパティを使用して、異なるスケールの `value` を表すことができます。 例えば、次のデモは、値 *x* は *10^x* のべき乗を表します。

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

コンポーネントは、アクセス可能にするために必要なほとんどの作業を処理します。 ただし、次の点を確認する必要があります。

- それぞれのつまみがユーザーフレンドリーなラベル(`aria-label`, `aria-labelledby` または `getAriaLabel` プロパティ)を持っていること
- それぞれのつまみが、現在の値をユーザーフレンドリーなテキストで示していること。 値がラベルのセマンティクスと一致する場合、これは必要ありません。 この名前は、 `getAriaValueText`または`aria-valuetext`プロパティを使用して変更できます。