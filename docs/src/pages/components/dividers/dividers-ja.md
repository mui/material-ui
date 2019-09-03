---
title: Divider React component
components: Divider
---

# Dividers

<p class="description">Divider(区切り線) は、リストおよびレイアウトのコンテンツをグループ化する細い線です。</p>

[Dividers](https://material.io/design/components/dividers.html) は、内容を明確なグループに分けます。

## List Dividers

[Dividers](https://material.io/design/components/dividers.html)はデフォルトで `<hr>` としてレンダリングされます。 このDOM要素のレンダリングを節約するには、 `ListItem` コンポーネントの `divider` プロパティを使用します。

{{"demo": "pages/components/dividers/ListDividers.js"}}

## HTML5仕様

`Divider`がHTML5仕様に合うように`li`としてレンダリングされていることを確認する必要があります。 次の例は、これを実現する2つの方法を示しています。

## Inset Dividers

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Subheader Dividers

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Middle Dividers

{{"demo": "pages/components/dividers/MiddleDividers.js"}}