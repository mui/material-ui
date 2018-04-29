---
components: Grow, Popover
---

# Popovers

A `Popover` can be used to display some content on top of another.

## Simple Popover

{{"demo": "pages/utils/popovers/SimplePopover.js" }}

## Anchor playground

Use the radio buttons to adjust the `anchorOrigin` and `transformOrigin` positions.
You can also set the `anchorReference` to `anchorPosition` or `anchorEl`.
When it is `anchorPosition`, the component will, instead of `anchorEl`,
refer to the `anchorPosition` prop which you can adjust to set
the position of the popover.

{{"demo": "pages/utils/popovers/AnchorPlayground.js"}}

## Mouse over interaction

We demonstrate how to use the `Popover` component as well as the [react-popper](https://github.com/souporserious/react-popper) package to implement a popover behavior based on the mouse over event.

{{"demo": "pages/utils/popovers/MouseOverPopover.js"}}
