---
title: Popper React component
components: Popper
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. It's an alternative to react-popper.</p>

Some important features of the `Popper` component:

- 
- 
- 
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the `Popper` component. If you need this behavior, you can use [`ClickAwayListener`](/components/click-away-listener/) - see the example in the [menu documentation section](/components/menus/#menulist-composition).
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

## Simple Popper

{{"demo": "pages/components/popper/SimplePopper.js" }}

## Minimalist Popper

You can use the component with zero extra dependencies.

{{"demo": "pages/components/popper/MinimalPopper.js" }}

## Scroll playground

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideHeader": true}}

## Positioned Popper

{{"demo": "pages/components/popper/PositionedPopper.js"}}

## Without transition Popper

{{"demo": "pages/components/popper/NoTransitionPopper.js"}}

## Faked reference object

The `anchorEl` property can be a reference to a fake DOM element. You just need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Highlight part of the text to see the popper:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

### Ayudante PopupState

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popper state for you in most cases.

{{"demo": "pages/components/popper/PopperPopupState.js"}}