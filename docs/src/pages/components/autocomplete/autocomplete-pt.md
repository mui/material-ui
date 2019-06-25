---
title: Componente React para Autocompletar
components: TextField, Paper, MenuItem, Popper
---

# Autocompletar

<p class="description">O autocompletar é uma entrada de texto normal aprimorada por um painel de opções sugeridas.</p>

O Material-UI não fornece nenhuma API de alto nível para resolver esse problema. Recomendamos utilizarem soluções que a comunidade React construiu.

## downshift

![estrelas](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

No exemplo a seguir, demonstramos como usar [downshift](https://github.com/downshift-js/downshift).

A última demonstração permite que em um campo vazio com o foco, seja exibido várias opções.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![estrelas](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

No exemplo a seguir, demonstramos como usar [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![estrelas](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

No exemplo a seguir, demonstramos como usar [react-autosuggest](https://github.com/moroshko/react-autosuggest). Também está sendo usado [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) para a lógica de destaque.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}