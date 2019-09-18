---
title: Autocomplete React-Komponente
components: TextField, Paper, MenuItem, Popper
---

# Autovervollständigung (Autocomplete)

<p class="description">Die Autovervollständigung ist eine normale Texteingabe, die durch ein Panel mit vorgeschlagenen Optionen ergänzt wird.</p>

Die Material-UI bietet keine übergeordnete API zur Lösung dieses Problems an. Es wird empfohlen, einer der folgenden Pakete aus der React-Community zu verwenden.

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

Dieses Beispiel zeigt die Benutzung von [downshift](https://github.com/downshift-js/downshift).

The last demo allows the user to clear the input and show a number of options on focus.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

Dieses Beispiel zeigt die Benutzung von [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

This example demonstrates how to use [react-autosuggest](https://github.com/moroshko/react-autosuggest). It also uses [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) for the highlighting logic.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

- [material-ui-chip-input](https://mui.wertarbyte.com/#material-ui-chip-input): The chip input is used to allow selecting multiple text values.
- [mui-downshift](https://github.com/techniq/mui-downshift): A thin layer over paypal's downshift to use Material-UI visual components.
- [material-ui-autosuggest](https://github.com/plan-three/material-ui-autosuggest): A fuzzy-search component for React and Material-UI.
- [react-select-material-ui](https://github.com/iulian-radu-at/react-select-material-ui): Extend react-select with Material-UI.