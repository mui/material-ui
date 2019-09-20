---
title: オートコンプリートReactコンポーネント
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete

<p class="description">オートコンプリートは、推奨オプションのパネルによって強化された通常のテキスト入力です。</p>

Material-UIは、自動補完の問題を解決するための高レベルAPIを提供しません。 Reactコミュニティが構築しているソリューションを使用することをお勧めします、以下はその一例です。

## downshift

![Stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/downshift.svg)

次の例は、 [ダウンシフト](https://github.com/downshift-js/downshift)の使用方法を示します。

最後のデモでは、ユーザーが入力をクリアしてフォーカスのある多くのオプションを表示することができます。

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![Stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/react-select.svg)

次の例では、[react-select](https://github.com/JedWatson/react-select)の使用方法を示します。

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![Stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/react-autosuggest.svg)

次の例では、 [react-autosuggest](https://github.com/moroshko/react-autosuggest) の使用方法を示します。 ハイライトロジックに [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) を使用します。

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input)：チップ入力を使用して、複数のテキスト値を選択できます。
- [mui-downshift](https://github.com/techniq/mui-downshift)：Material-UIビジュアルコンポーネントを使用するための、PayPalのダウンシフト上の薄いレイヤー。
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest)：ReactおよびMaterial-UIのファジー検索コンポーネント。
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui)：Material-UIでreact-selectを拡張します。