---
title: Autocomplete React-Komponente
components: TextField, Paper, MenuItem, Popper
---

# Autovervollständigung (Autocomplete)

<p class="description">Die Autovervollständigung ist eine normale Texteingabe, die durch ein Panel mit vorgeschlagenen Optionen ergänzt wird.</p>

Material-UI doesn't provide any high-level API for solving this problem. We encourage people relying on the solutions the React community has built.

## downshift

![stars](https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/downshift.svg)

Im folgenden Beispiel demonstrieren wir, wie man einen [downshift](https://github.com/downshift-js/downshift) benutzt.

The last demo allows the user to clear the input and show a number of options on focus.

{{"demo": "pages/components/autocomplete/IntegrationDownshift.js"}}

## react-select

![stars](https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-select.svg)

Im folgenden Beispiel demonstrieren wir, wie man [react-select](https://github.com/JedWatson/react-select) benutzt.

{{"demo": "pages/components/autocomplete/IntegrationReactSelect.js"}}

## react-autosuggest

![stars](https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-autosuggest.svg)

Im folgenden Beispiel demonstrieren wir, wie man [react-autosuggest](https://github.com/moroshko/react-autosuggest) verwendet. Es verwendet auch [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) für die Highlighting-Logik.

{{"demo": "pages/components/autocomplete/IntegrationAutosuggest.js"}}