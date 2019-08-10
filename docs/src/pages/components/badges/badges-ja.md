---
title: Badge React component
components: Badge
---

# バッジ

<p class="description">バッジは、その子供の右上に小さなバッジを生成します。</p>

## 簡単なバッジ

プライマリー色とセカンダリーを使用した、テキストを含むバッジの例。 バッジが子要素に適用されます。

{{"demo": "pages/components/tables/SimpleTable.js"}}

## 最大値

バッジコンテンツの値に上限を設定するには、 `max` プロパティを使用します。

{{"demo": "pages/components/tables/SimpleTable.js"}}

## ドットバッジ

`dot`プロパティは、バッジを小さなドットに変更します。 これは、何かが変更されたことをカウントせずに通知するために使用できます。

{{"demo": "pages/components/tables/SimpleTable.js"}}

## バッジの表示設定

バッジの表示/非表示は、 `invisible` プロパティを使用して制御できます。

BadgeContentが0の場合、バッジは自動的に非表示になります。 これは、`showZero`プロパティで上書きできます。

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## カスタマイズバッジ

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/tables/CustomizedTables.js"}}