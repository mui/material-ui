---
title: Breadcrumbs Reactコンポーネント
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs

<p class="description">ブレッドクラムを使用すると、値の範囲から選択できます。</p>

## シンプルなbreadcurmbs

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## カスタムセパレーター (Custom separator）

次の例では、2つの文字列セパレータとSVGアイコンを使用しています。

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## アイコン付きBreadcrumbs

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## 折りたたみBreadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## カスタマイズされた breadcrumbs

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Integration with react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

このコンポーネントのアクセシビリティは、

- リンクのセットは、順序付けられたリスト(`<ol>` element) を使用して構造化されます。
- リンク間のビジュアルセパレータがスクリーンリーダーから通知されないようにするには、 `aria-hidden`を使用します。
- `aria-label` というラベルが付いたnav要素は、その構造をBreadcrumbs経路として識別し、それをナビゲーション用の目印にして、見つけやすくします。