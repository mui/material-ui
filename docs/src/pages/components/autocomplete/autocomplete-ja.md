---
title: オートコンプリートReactコンポーネント
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete

<p class="description">オートコンプリートは、推奨オプションのパネルによって強化された通常のテキスト入力です。</p>

Material-UI doesn't provide a high-level API for solving this problem. You are encouraged to use a solution the React community has built, following one of the examples below.

## downshift

![Stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/downshift.svg)

This example demonstrates how to use [downshift](https://github.com/downshift-js/downshift).

最後のデモでは、ユーザーが入力をクリアしてフォーカスのある多くのオプションを表示することができます。

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![Stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/react-select.svg)

This example demonstrates how to use [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![Stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/react-autosuggest.svg)

This example demonstrates how to use [react-autosuggest](https://github.com/moroshko/react-autosuggest). It also uses [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) for the highlighting logic.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input): The chip input is used to allow selecting multiple text values.
- [mui-downshift](https://github.com/techniq/mui-downshift): A thin layer over paypal's downshift to use Material-UI visual components.
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest): A fuzzy-search component for React and Material-UI.
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui): Extend react-select with Material-UI.