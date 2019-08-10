---
title: Componente de Autocompletado de React
components: TextField, Paper, MenuItem, Popper
---

# Autocompletado

<p class="description">El autocompletado es una caja de texto normal mejorada por un panel de opciones sugeridas.</p>

Material-UI doesn't provide any high-level API for solving this problem. We encourage people relying on the solutions the React community has built.

## downshift

![estrellas](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/downshift.svg)

En el siguiente ejemplo se muestra como usar [downshift](https://github.com/downshift-js/downshift).

The last demo allows the user to clear the input and show a number of options on focus.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![estrellas](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/react-select.svg)

En el siguiente ejemplo se muestra como usar [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![estrellas](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/react-autosuggest.svg)

En el siguiente ejemplo se muestra como usar [react-select](https://github.com/moroshko/react-autosuggest). También utiliza [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) para la lógica de resaltado.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}