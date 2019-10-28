---
title: React Autocomplete（自动补全）组件
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete（自动补全）

<p class="description">自动补全是一个通过一组建议选项来帮助用户输入的普通文本输入框。</p>

Material-UI 则不会提供用于解决此问题的高层 API。 我们鼓励您使用任意一个 React 社区维护的解决方案，如下所示。

## downshift

![评星](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

以下例子演示了如何使用 [downshift](https://github.com/downshift-js/downshift)。

在最后一个例子中，用户可以清除已有的输入，并在焦点的位置上显示一系列的选项。

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![评星](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

以下例子演示了如何使用 [react-select](https://github.com/JedWatson/react-select)。

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![评星](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

以下例子演示了如何使用 [react-autosuggest](https://github.com/moroshko/react-autosuggest)。 它还使用了 [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) 来实现高亮的逻辑。

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## 补充项目

对于更高级的用例，您可以参考：

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input): 此 chip input 用于选择多个文本值的情况。
- [mui-downshift](https://github.com/techniq/mui-downshift)：为了能够使用 Material-UI 的可视化组件，这在 paypal 的 downshift 上加了简单的一层。
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest)：一个用在 React 和 Material-UI 中的模糊搜索的组件。
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui)：使用 Material-UI 的 react-select 的扩展版本。