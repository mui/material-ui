---
title: Breadcrumbs Reactコンポーネント
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs

<p class="description">Breadcrumbsを使用すると、値の範囲から選択できます。</p>

## シンプルなbreadcurmbs

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Active last breadcrumb

Keep the last breadcrumb interactive.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Custom separator

In the following examples, we are using two string separators, and an SVG icon.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs with icons

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed breadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Customized breadcrumbs

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## react-routerとの統合

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

このコンポーネントのアクセシビリティは、

- リンクのセットは、順序付けられたリスト(`<ol>` element) を使用して構造化されます。
- リンク間のビジュアルセパレータがスクリーンリーダーから通知されないようにするには、 `aria-hidden`を使用します。
- `aria-label` というラベルが付いたnav要素は、その構造をBreadcrumbs経路として識別し、それをナビゲーション用の目印にして、見つけやすくします。