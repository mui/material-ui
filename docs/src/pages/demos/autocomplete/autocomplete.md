---
components: TextField, Paper, MenuItem
---

# Autocomplete

The autocomplete is a normal text input enhanced by a panel of suggested options.
Material-UI doesn't provide any high-level API for solving this problem.
We encourage people relying on the solutions the React community has built.

## downshift

In the following example, we demonstrate how to use [downshift](https://github.com/paypal/downshift).

{{"demo": "pages/demos/autocomplete/IntegrationDownshift.js"}}

## react-autosuggest

In the following example, we demonstrate how to use [react-autosuggest](https://github.com/moroshko/react-autosuggest).
It's also using [autosuggest-highlight](https://www.npmjs.com/package/autosuggest-highlight) for the highlighting logic.

{{"demo": "pages/demos/autocomplete/IntegrationAutosuggest.js"}}

## react-select

In the following example, we demonstrate how to use [react-select](https://github.com/JedWatson/react-select).

{{"demo": "pages/demos/autocomplete/IntegrationReactSelect.js"}}
