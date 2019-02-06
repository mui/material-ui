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
- The children is [`Portal`](/utils/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll and click away aren't blocked like with the [`Popover`](/utils/popover/) component. The placement of the popper updates with the available area in the viewport.
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

## Simple Popper

{{"demo": "pages/utils/popper/SimplePopper.js" }}

## Scroll playground

{{"demo": "pages/utils/popper/ScrollPlayground.js"}}

## Positioned Popper

{{"demo": "pages/utils/popper/PositionedPopper.js"}}

## Without transition Popper

{{"demo": "pages/utils/popper/NoTransitionPopper.js"}}

## Faked reference object

The `anchorEl` property can be a reference to a fake DOM element. You just need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Highlight part of the text to see the popper:

{{"demo": "pages/utils/popper/FakedReferencePopper.js"}}

## Render Props

It is a [render props](https://reactjs.org/docs/render-props.html) demo that keeps track of the local state for a single popper.

{{"demo": "pages/utils/popper/RenderPropsPopper.js"}}

## Projets complémentaires

For more advanced use cases you might be able to take advantage of:

### PopupState helper

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popper state for you in most cases.

{{"demo": "pages/utils/popper/PopperPopupState.js"}}