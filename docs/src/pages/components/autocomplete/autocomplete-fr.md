---
title: Composant React Auto-complétion
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete (Auto-complétion)

<p class="description">La saisie semi-automatique est une entrée de texte normale améliorée par un panneau d'options suggérées.</p>

Material-UI doesn't provide any high-level API for solving this problem. We encourage people relying on the solutions the React community has built.

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

Dans l'exemple suivant, nous montrons comment utiliser [downshift](https://github.com/downshift-js/downshift).

The last demo allows the user to clear the input and show a number of options on focus.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

Dans l'exemple suivant, nous montrons comment utiliser [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

Dans l'exemple suivant, nous montrons comment utiliser [react-autosuggest](https://github.com/moroshko/react-autosuggest). Il utilise également [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) pour la logique de surbrillance.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}