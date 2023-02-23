---
product: material-ui
title: Transfer list React component
components: List, ListItem, Checkbox, Switch
githubLabel: 'component: transfer list'
---

# Transfer List

<p class="description">A Transfer List (or "shuttle") enables the user to move one or more list items between lists.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic transfer list

For completeness, this example includes buttons for "move all", but not every transfer list needs these.

{{"demo": "TransferList.js", "bg": true}}

## Enhanced transfer list

This example exchanges the "move all" buttons for a "select all / select none" checkbox, and adds a counter.

{{"demo": "SelectAllTransferList.js", "bg": true}}

## Limitations

The component comes with a couple of limitations:

- It only works on desktop.
  If you have a limited amount of options to select, prefer the [Autocomplete](/material-ui/react-autocomplete/#multiple-values) component.
  If mobile support is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
- There are no high-level components exported from npm. The demos are based on composition.
  If this is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
