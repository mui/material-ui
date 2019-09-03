---
title: オートコンプリートReactコンポーネント
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete

<p class="description">オートコンプリートは、推奨オプションのパネルによって強化された通常のテキスト入力です。</p>

Material-UIには、この問題を解決するための高レベルAPIはありません。 Reactコミュニティが構築したソリューションに頼ることを推奨します。

## downshift

![Stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/downshift.svg)

次の例では、<a href=「https://github.com/downshift-js/downshift」>downshift</a>の使用方法を示します。

最後のデモでは、ユーザーが入力をクリアしてフォーカスのある多くのオプションを表示することができます。

{{"demo":"pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![Stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/react-select.svg)

次の例では、[react-select](https://github.com/JedWatson/react-select).の使用方法を示します。

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![Stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/react-autosuggest.svg)

次の例では、 リスト コンポーネントで [react-window](https://github.com/moroshko/react-autosuggest) を使用する方法を示します。 強調表示ロジックに [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) も使用されています 。

{{"demo":"pages/components/autocomplete/IntegrationAutosuggest.js"}}