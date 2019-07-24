---
title: Badge React component
components: Badge
---

# バッジ

<p class="description">バッジは、その子供の右上に小さなバッジを生成します。</p>

## 簡単なバッジ

Primaryとsecondaryを使用した、テキストを含むバッジの例。バッジは子供に付けられます。

{{"demo": "pages/components/tables/SimpleTable.js"}}

## 最大値

バッジコンテンツの値に上限を設定するには、 `max` プロパティを使用します。

{{"demo": "pages/components/tables/SimpleTable.js"}}

## ドットバッジ

`dot` プロパティはバッジを小さなドットに変更します。これは、数を数えずに何かが変わったという通知として使用できます。

{{"demo": "pages/components/tables/SimpleTable.js"}}

## バッジの表示設定

バッジの表示/非表示は、 `invisible` プロパティを使用して制御できます。

BadgeContentで自動的に非表示になるバッジは0です。これは `showZero` プロパティで上書きできます。

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## カスタマイズバッジ

コンポーネントのカスタマイズ例をいくつか示します。あなたは[上書きドキュメントのページ](/customization/components/)でこれについてもっと詳しく知ることができます。

{{"demo": "pages/components/tables/CustomizedTables.js"}}