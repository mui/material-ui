---
title: Modal React component
components: Modal
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

The component renders its `children` node in front of a backdrop component. The `Modal` offers important features:

- 💄 Manages modal stacking when one-at-a-time just isn't enough.
- 🔐 Creates a backdrop, for disabling interaction below the modal.
- 🔐 It disables scrolling of the page content while open.
- ♿️ It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- ♿️ Adds the appropriate ARIA roles automatically.
- 5 [1 кБ в сжатом виде](/size-snapshot).

> **примечание по терминологии**. Термин «modal» иногда используется для обозначения «dialog», но это неверно. An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window). A modal window describes parts of a UI.

If you are creating a modal dialog, you probably want to use the [Dialog](/components/dialogs/) component rather than directly using Modal. Modal - это конструкция нижнего уровня, которая используется следующими компонентами:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Simple modal

{{"demo": "pages/components/modal/SimpleModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## Переходы

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- Have an `in` prop. This corresponds to the open / close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Ограничения

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, however, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.
    
    ```jsx
    <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    >
    <h2 id="modal-title">
      My Title
    </h2>
    <p id="modal-description">
      My Description
    </p>
    </Modal>
    ```

- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- That is, users cannot interact with content outside an active modal window. Keep in mind that a "modal window" overlays on either the primary window or another modal window. Windows under a modal are **inert**. This might create [conflicting behaviors](#focus-trap).