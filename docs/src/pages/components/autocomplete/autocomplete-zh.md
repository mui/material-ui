---
title: React Autocomplete（自动补全）组件
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete（自动补全）

<p class="description">自动补全是一个通过一组建议选项来帮助用户输入的普通文本输入框。</p>

Material-UI 不提供任何高级的 API 来对此进行支持。 我们鼓励您使用由 React 社区提供的现有解决方案。

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

在下面的示例中，我们演示了如何使用 [downshift](https://github.com/downshift-js/downshift)。

在最后一个例子中，用户可以清除已有的输入，并在焦点的位置上显示一系列的选项。

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

在下面的示例中, 我们演示了如何使用 [react-select](https://github.com/JedWatson/react-select)。

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

在下面的示例中, 我们演示了如何使用 [react-autosuggest](https://github.com/moroshko/react-autosuggest)。 它还使用 [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight)完成了高亮的逻辑。

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}