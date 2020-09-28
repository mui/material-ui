---
title: Divider React component
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider

<p class="description">Divider(区切り線) は、リストおよびレイアウトのコンテンツをグループ化する細い線です。</p>

[Dividers](https://material.io/design/components/dividers.html) は、内容を明確なグループに分けます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## List Dividers

Note the use of the `flexItem` prop to accommodate for the flex container. このDOM要素のレンダリングを節約するには、 `ListItem` コンポーネントの `divider` プロパティを使用します。

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5仕様

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. 次の例は、これを実現する2つの方法を示しています。

## Inset Dividers

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Subheader Dividers

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Middle Dividers

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider with content.

{{"demo": "pages/components/dividers/DividerText.js"}}

## Divider (区切り線)

You can also render a divider vertically using the `orientation` prop.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> Note the use of the `flexItem` prop to accommodate for the flex container.

### Vertical with text

You can also render a vertical divider with content.

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
