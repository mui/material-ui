---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# トグルボタン

<p class="description">トグルボタンを使用して、関連するオプションをグループ化できます。</p>

関連する [Toggle buttons](https://material.io/design/components/buttons.html#toggle-button)のグループを強調するには、次の操作を行います。 グループは共通のコンテナーを共用する必要があります。

`ToggleButtonGroup` は、 が独自の `値` propを指定したときに、子ボタンの選択状態を制御します。

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## サイズ

大きなボタンと小さなボタンがありますか? `size`プロパティを使用します。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## スタンドアロンのトグルボタン

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## アクセシビリティ

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `arial-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.