---
title: Rating React component
components: レート
---

# レート （Rating）

<p class="description">評価は、他の人の意見や製品に関する経験に関する洞察を提供します。 ユーザーは購入した製品を評価することもできます。</p>

## 簡単な評価

{{"demo": "pages/components/rating/SimpleRating.js"}}

## カスタマイズされた評価

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## ホバーのフィードバック

ユーザーが正しい評価値を選択するのに役立つように、ホバーにラベルを表示できます。 最初のデモは `onChangeActive` prop を使用し、最後のデモは `IconContainerComponent` prop を使用します。

{{"demo": "pages/components/rating/HoverRating.js"}}

## 半分の評価

評価は`value`propを持つ任意の浮動小数点数を表示できます。 `precision` prop を使用して、許可される最小増分値の変更を定義します。

{{"demo": "pages/components/rating/HalfRating.js"}}

## サイズ

大きな評価ボタンと小さな評価ボタンがありますか? `size`propを使用します。

{{"demo": "pages/components/rating/RatingSize.js"}}

## アクセシビリティ

このコンポーネントのアクセシビリティは、

- A radio group is used with its fields visually hidden. It contains six radio buttons, one for each star and another for 0 stars, which is checked by default. Make sure you are providing a `name` prop that is unique to the parent form.
- The labels for the radio buttons contain actual text (“1 Star”, “2 Stars”, …), make sure you provide a `getLabelText` prop when the page language is not English.