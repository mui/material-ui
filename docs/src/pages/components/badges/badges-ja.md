---
title: バッジReactコンポーネント
components: Badge
---

# Badge バッジ

<p class="description">バッジは、その子供の右上に小さなバッジを生成します。</p>

## 基本的なバッジ

プライマリー色とセカンダリーを使用した、テキストを含むバッジの例。 バッジが子要素に適用されます。

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Customized badges （カスタマイズされたバッジ）

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドドキュメントページ](/customization/components/)ご覧ください。

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## バッジの表示設定

バッジの可視性は、 `invisible` プロパティを使用して制御できます。

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

BadgeContentが0の場合、バッジは自動的に非表示になります。 `showZero` プロパティでこれをオーバーライドできます。

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## 最大値

バッジコンテンツの値に上限を設定するには、 `max` プロパティを使用します。

{{"demo": "pages/components/badges/BadgeMax.js"}}

## ドットバッジ

`dot`プロパティは、バッジを小さなドットに変更します。 これは、何かが変更されたことをカウントせずに通知するために使用できます。

{{"demo": "pages/components/badges/DotBadge.js"}}

## バッジの重複

`オーバーラップ` プロパティを使用して、ラップされた要素の角を基準にしてバッジを配置できます。

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## バッジの配置

`anchorOrigin` プロパティを使用して、バッジをラップされた要素の隅に移動できます。

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}