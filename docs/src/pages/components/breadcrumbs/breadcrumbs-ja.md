---
title: Breadcrumbs React component
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs

<p class="description">ブレッドクラムを使用すると、値の範囲から選択できます。</p>

## Simple breadcrumbs

{{"demo":"pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Custom separator

次の例では、2つの文字列セパレータとSVGアイコンを使用しています。

{{"demo":"pages/components/breadcrumbs/CustomSeparator.js"}}

## アイコン付きBreadcrumbs

{{"demo":"pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## 折りたたみBreadcrumbs

{{"demo":"pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## カスタマイズBreadcrumbs

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo":"pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## アクセシビリティ

`Breadcrumbs`コンポーネントには、必ず`aria-label`を追加してください。

このコンポーネントのアクセシビリティは、

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.

## Integration with react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js"}}