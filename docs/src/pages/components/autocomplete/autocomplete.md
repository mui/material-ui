---
title: Autocomplete React component
components: TextField, Paper, MenuItem, Popper
---

# Autocomplete

<p class="description">The autocomplete is a normal text input enhanced by a panel of suggested options.</p>

Material-UI doesn't provide any high-level API for solving this problem.
We encourage people relying on the solutions the React community has built.

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars)
![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

In the following example, we demonstrate how to use [downshift](https://github.com/downshift-js/downshift).

The last demo allow to clear the input and show a number of options on focus.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars)
![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

In the following example, we demonstrate how to use [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars)
![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

In the following example, we demonstrate how to use [react-autosuggest](https://github.com/moroshko/react-autosuggest).
It's also using [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) for the highlighting logic.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}
