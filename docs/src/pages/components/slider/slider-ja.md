---
title: Slider React component
components: Slider
---

# Slider

<p class="description">スライダーを使用すると、ユーザーは値の範囲から選択できます。</p>

[Sliders](https://material.io/design/components/sliders.html) reflect a range of values along a bar, from which users may select a single value. ボリューム、輝度などの設定を調整したり、画像フィルターを適用したりするのに理想的です。

- 📦 [22 kB gzipped](/size-snapshot) (but only 8 kB without @material-ui/styles).

## 個別のスライダー

個別のスライダーは、値インジケーターを参照することで特定の値に調整できます。 デモ順：

1. `marks={true}`で各ステップのマークを生成できます。
2. デフォルトのステップ増分を変更できます。
3. `marks`プロップに豊富な配列を提供することにより、カスタムマークを作成できます。
4. 選択可能な値を、 `marks` prop with `step ={null}`で、提供される値に制限できます。
5. `valueLabelDisplay = "on"`すると、常にサムラベルを強制的に表示できます。

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

## Customized sliders

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドドキュメントページ](/customization/components/)ご覧ください。

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## 連続スライダー

連続スライダーにより、ユーザーは主観的な範囲に沿って値を選択できます。

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## 範囲スライダー

{{"demo": "pages/components/slider/RangeSlider.js"}}

## 入力フィールド付き

{{"demo": "pages/components/slider/InputSlider.js"}}

## 垂直スライダー

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## アクセシビリティ

コンポーネントは、アクセス可能にするために必要なほとんどの作業を処理します。 ただし、次の点を確認する必要があります。

- スライダには、ラベル`aria-label` または `aria-labelledby`prop) が付いています。
- 各つまみには、現在の値をわかりやすい名前で示しています。 値がラベルのセマンティクスと一致する場合、これは必要ありません。 この名前は、 `getAriaValueText`または`aria-valuetext`プロパティを使用して変更できます。