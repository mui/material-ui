---
title: Composant React Auto-complétion
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete (Auto-complétion)

<p class="description">La saisie semi-automatique est une entrée de texte normale améliorée par un panneau d'options suggérées.</p>

Material-UI doesn't provide a high-level API for solving this problem. You are encouraged to use a solution the React community has built, following one of the examples below.

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

This example demonstrates how to use [downshift](https://github.com/downshift-js/downshift).

La dernière démo permet à l'utilisateur d'effacer une entrée et de montrer un certain nombre d'options sur le focus.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

This example demonstrates how to use [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

This example demonstrates how to use [react-autosuggest](https://github.com/moroshko/react-autosuggest). It also uses [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) for the highlighting logic.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants:

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input): The chip input is used to allow selecting multiple text values.
- [mui-downshift](https://github.com/techniq/mui-downshift): A thin layer over paypal's downshift to use Material-UI visual components.
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest): A fuzzy-search component for React and Material-UI.
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui): Extend react-select with Material-UI.