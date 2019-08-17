---
title: Breadcrumbs Reactコンポーネント
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

- リンクのセットは、順序付けられたリスト(`<ol>` element) を使用して構造化されます。
- リンク間のビジュアルセパレータがスクリーンリーダーから通知されないようにするには、 `aria-hidden`を使用します。
- `aria-label` というラベルが付いたnav要素は、その構造をBreadcrumbs経路として識別し、それをナビゲーション用の目印にして、見つけやすくします。

## react-routerとの統合

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js"}}