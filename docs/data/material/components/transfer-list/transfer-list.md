---
productId: material-ui
title: Transfer list composition example
components: List, ListItem, Checkbox, Switch
githubLabel: 'scope: transfer list'
---

# Transfer List

<p class="description">A transfer list (or "shuttle") lets users move one or more items between lists. This page is a composition example. Material UI does not export a dedicated Transfer List component.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

:::info
Transfer lists are **not** part of the [Material Design](https://m2.material.io/) guidelines, and there is no `<TransferList />` package export.

The demos below show what's possible by composing [`List`](/material-ui/react-list/), [`Checkbox`](/material-ui/react-checkbox/), and buttons. Copy the pattern and adapt it to your product rather than expecting a drop-in component.
:::

## Basic transfer list

For completeness, this example includes buttons for "move all", but not every transfer list needs these.

{{"component": "file://./demos/transfer-list/index.ts", "bg": true}}

## Enhanced transfer list

This example exchanges the "move all" buttons for a "select all / select none" checkbox and adds a counter.

{{"component": "file://./demos/select-all/index.ts", "bg": true}}

## Limitations

These demos come with a couple of limitations:

- They only work well on desktop.
  If you have a limited amount of options to select, prefer the [Autocomplete](/material-ui/react-autocomplete/#multiple-values) component.
  If mobile support is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).
- There is no high-level Transfer List component on npm; the demos rely on composition.
  If packaging this pattern as a reusable component is important for you, have a look at [#27579](https://github.com/mui/material-ui/issues/27579).

## Accessibility

The demos partially follow the multi-select [ARIA Listboxes with Rearrangeable Options example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-rearrangeable/).
They move focus directly to list items instead of using `aria-activedescendant` on the listbox.

When composing a transfer list:

- Give each list an accessible name using `aria-labelledby` to reference a visible label, or `aria-label`.
- Label transfer buttons clearly and ensure focus remains predictable after moving items, including when a list becomes empty.
- If a focused button becomes disabled, explicitly move focus to a logical target so keyboard users can continue.
