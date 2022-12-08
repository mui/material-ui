---
product: material-ui
title: React Popover component
components: Grow, Popover
githubLabel: 'component: Popover'
---

# Popover

<p class="description">A Popover can be used to display some content on top of another.</p>

Things to know when using the `Popover` component:

- The component is built on top of the [`Modal`](/material-ui/react-modal/) component.
- The scroll and click away are blocked unlike with the [`Popper`](/material-ui/react-popper/) component.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic Popover

{{"demo": "BasicPopover.js" }}

## Anchor playground

Use the radio buttons to adjust the `anchorOrigin` and `transformOrigin` positions.
You can also set the `anchorReference` to `anchorPosition` or `anchorEl`.
When it is `anchorPosition`, the component will, instead of `anchorEl`,
refer to the `anchorPosition` prop which you can adjust to set
the position of the popover.

{{"demo": "AnchorPlayground.js", "hideToolbar": true}}

## Mouse over interaction

This demo demonstrates how to use the `Popover` component and the mouseover event to achieve popover behavior.

{{"demo": "MouseOverPopover.js"}}

## Complementary projects

For more advanced use cases, you might be able to take advantage of:

### PopupState helper

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popover
state for you in most cases.

{{"demo": "PopoverPopupState.js"}}
