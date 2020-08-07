---
title: Rating React component
components: レート
---

# レート （Rating）

<p class="description">評価は、他の人の意見や製品に関する経験に関する洞察を提供します。 ユーザーは購入した製品を評価することもできます。 ユーザーは購入した製品を評価することもできます。</p>

## 簡単な評価

{{"demo": "pages/components/rating/SimpleRating.js"}}

## カスタマイズされた評価

コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## ホバーのフィードバック

大きな評価ボタンと小さな評価ボタンがありますか? `size`propを使用します。

{{"demo": "pages/components/rating/HoverRating.js"}}

## 半分の評価

大きな評価ボタンと小さな評価ボタンがありますか? `size`propを使用します。

{{"demo": "pages/components/rating/HalfRating.js"}}

## サイズ

大きな評価ボタンと小さな評価ボタンがありますか? `size`propを使用します。

{{"demo": "pages/components/rating/RatingSize.js"}}

## アクセシビリティ

(WAI tutorial: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating)

このコンポーネントのアクセシビリティは、

- ラジオグループは、フィールドを視覚的に非表示にして使用されます。 これには6つのラジオボタンがあり、それぞれが星1つ、星が0つ星です。デフォルトではオンになっています。 親フォームに固有の `name` プロパティを指定していることを確認します。
- ラジオボタンのラベルには実際のテキスト（ "1 Star"、 "2 Stars"、…）が含まれています。ページの言語が英語でない場合は、必ず `getLabelText` propを指定してください。