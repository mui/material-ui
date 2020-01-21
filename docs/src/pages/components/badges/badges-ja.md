---
title: バッジReactコンポーネント
components: Badge
---

# Badge (バッジ)

<p class="description">バッジは、その子供の右上に小さなバッジを生成します。</p>

## Basic badges

プライマリー色とセカンダリーを使用した、テキストを含むバッジの例。 バッジが子要素に適用されます。

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Customized badges （カスタマイズされたバッジ）

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドドキュメントページ](/customization/components/)ご覧ください。

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## バッジの表示設定

バッジの可視性は、 `invisible` プロパティを使用して制御できます。

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## バッジの重複

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## バッジの配置

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}