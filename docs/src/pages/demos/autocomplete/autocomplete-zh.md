---
title: 自动补全React组件
components: TextField, Paper, MenuItem, Popper
---
# 自动补全

<p class="description">自动补全是一个普通文本输入框通过一组建议选项来帮助用户输入。</p>

Material-UI不提供任何高级 API 来解决此问题。 我们鼓励人们依靠React社区已有的解决方案。

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

在下面的示例中, 我们演示如何使用 [downshift](https://github.com/paypal/downshift)。

{{"demo": "pages/demos/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

In the following example, we demonstrate how to use [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/demos/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

In the following example, we demonstrate how to use [react-autosuggest](https://github.com/moroshko/react-autosuggest). It's also using [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) for the highlighting logic.

{{"demo": "pages/demos/autocomplete/IntegrationAutosuggest.js"}}