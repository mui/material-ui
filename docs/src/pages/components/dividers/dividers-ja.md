---
title: React Divider component
components: Divider
---

# Divider (区切り線)

<p class="description">Divider(区切り線) は、リストおよびレイアウトのコンテンツをグループ化する細い線です。</p>

[Dividers](https://material.io/design/components/dividers.html) は、内容を明確なグループに分けます。

## List Dividers

Dividerはデフォルトで `<hr>` としてレンダリングされることに注意してください。 このDOM要素のレンダリングを節約するには、 `ListItem` コンポーネントの `divider` プロパティを使用します。

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5仕様

リストでは、HTML5の仕様に合うように、 `Divider` が `<li>` としてレンダリングされていることを確認すべきです。 次の例は、これを実現する2つの方法を示しています。

## Inset Dividers

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Subheader Dividers

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Middle Dividers

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

`orientation` プロパティを使用してDividerを垂直に表示することもできます。 flex コンテナに対応するために `flexItem` プロパティを使用することに注意してください。

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}