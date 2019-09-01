---
title: React Autocomplete（自动补全）组件
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete（自动补全）

<p class="description">自动补全是一个通过一组建议选项来帮助用户输入的普通文本输入框。</p>

Material-UI 不提供用于解决此问题的高级 API， 我们鼓励您使用React社区维护的以下解决方案之一。

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

下面的例子演示了如何使用 [downshift](https://github.com/downshift-js/downshift)

在最后一个例子中，用户可以清除已有的输入，并在焦点的位置上显示一系列的选项。

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

下面的例子演示了如何使用 [downshift](https://github.com/JedWatson/react-select)

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

下面的例子演示了如何使用 [downshift](https://github.com/moroshko/react-autosuggest)， 它还使用 [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight)来完成突出显示的逻辑。

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## 补充项目

对于更高级的用例，您可以利用：

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input): The chip input is used to allow selecting multiple text values.
- [mui-downshift](https://github.com/techniq/mui-downshift): A thin layer over paypal's downshift to use Material-UI visual components.
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest): A fuzzy-search component for React and Material-UI.
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui): Extend react-select with Material-UI.