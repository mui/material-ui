---
product: material-ui
title: React Modal component
components: Modal, ModalUnstyled
githubLabel: 'component: modal'
waiAria: https://www.w3.org/TR/wai-aria-practices/#dialog_modal
---

# Modal

<p class="description">The `Modal` component lets you create dialogs, popovers, lightboxes, and other windows that force the user to take action before continuing.</p>

The `Modal` component renders its `children` node in front of a backdrop component. This lets you create a window that your users must interact with before continuing in the parent application.
Features:

- 💄 Manages modal stacking when more than one is needed
- 🔐 Creates a backdrop to disable interaction with the rest of the app
- 🔐 Disables page scrolling while open
- ♿️ Manages focus correctly between the modal and its parent app
- ♿️ Adds the appropriate ARIA roles automatically

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

> **Note:** the term "modal" is sometimes used interchangeably with "dialog," but this is incorrect.
> A dialog may be _modal_ or _nonmodal_.
> 
> A modal [blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window), forcing the user to take action.
> As such, it should be used sparingly—only when the app _requires_ user input before it can continue.

If you are creating a modal dialog, the [`Dialog`](/material-ui/dialog/) component is better suited for this specific use case.

Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/material-ui/react-dialog/)
- [Drawer](/material-ui/react-drawer/)
- [Menu](/material-ui/react-menu/)
- [Popover](/material-ui/react-popover/)

## Basic modal

```js
import ModalUnstyled from '@mui/base/ModalUnstyled';
```

{{"demo": "ModalUnstyled.js", "defaultCodeOpen": false }}

## Nested modal

> ⚠ **Note:** though it is possible to create nested modals—for example, a select modal within a dialog—stacking more than two at a time is discouraged.

{{"demo": "NestedModal.js", "defaultCodeOpen": false}}

## Transitions

You can animate the open and close states of a modal with a transition component, as long as that component fulfills the following requirements:

- Is a direct child descendent of the modal
- Has an `in` prop—this corresponds to the open/close state
- Calls the `onEnter` callback prop when the enter transition starts
- Calls the `onExited` callback prop when the exit transition is completed
> The `onEnter` and `onExited` callbacks tell the modal to unmount the child content when closed and fully transitioned.

`Modal` has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group):

{{"demo": "TransitionsModal.js", "defaultCodeOpen": false}}

Alternatively, you can use [react-spring](https://github.com/pmndrs/react-spring).

{{"demo": "SpringModal.js", "defaultCodeOpen": false}}

## Performance

The content of modal is unmounted when closed.
If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness
it might be a good idea to change this default behavior by enabling the `keepMounted` prop:

```jsx
<Modal keepMounted />
```

{{"demo": "KeepMountedModal.js", "defaultCodeOpen": false}}

> You can use the `MuiModal-hidden` class to hide the modal when it is not opened.

As with any performance optimization, this is not a silver bullet.
Be sure to identify bottlenecks first, and then try out these optimization strategies.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server.
In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "ServerModal.js", "defaultCodeOpen": false}}

## Limitations

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes. However, it might create issues.
In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`.
  You can also use `aria-describedby="id..."` to provide a description of the `Modal`:

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- Keep in mind that a "modal window" overlays on either the primary window or another modal window. Windows under a modal are **inert**. That is, users cannot interact with content outside an active modal window. This might create [conflicting behaviors](#focus-trap).
