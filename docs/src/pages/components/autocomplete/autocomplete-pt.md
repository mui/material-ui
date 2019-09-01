---
title: Componente React para Autocompletar
components: TextField, Paper, MenuItem, Popper
---

# Autocompletar

<p class="description">O autocompletar é uma entrada de texto normal aprimorada por um painel de opções sugeridas.</p>

Material-UI doesn't provide a high-level API for solving this problem. You are encouraged to use a solution the React community has built, following one of the examples below.

## downshift

![estrelas](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

This example demonstrates how to use [downshift](https://github.com/downshift-js/downshift).

A última demonstração permite ao usuário limpar a entrada e mostrar várias opções em foco.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![estrelas](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

This example demonstrates how to use [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![estrelas](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

This example demonstrates how to use [react-autosuggest](https://github.com/moroshko/react-autosuggest). It also uses [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) for the highlighting logic.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input): The chip input is used to allow selecting multiple text values.
- [mui-downshift](https://github.com/techniq/mui-downshift): A thin layer over paypal's downshift to use Material-UI visual components.
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest): A fuzzy-search component for React and Material-UI.
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui): Extend react-select with Material-UI.