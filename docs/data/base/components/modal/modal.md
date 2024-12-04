---
productId: base-ui
title: React Modal component
components: Modal
hooks: useModal
githubLabel: 'component: modal'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
---

# Modal

<p class="description">The Modal component lets you create dialogs, popovers, lightboxes, and other elements that force the user to take action before continuing.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Modal is a utility component that renders its children in front of a backdrop.
This lets you create an element that your users must interact with before continuing in the parent application.

:::info
The term "modal" is sometimes used interchangeably with "dialog," but this is incorrect.
A dialog may be _modal_ or _nonmodal (modeless)_.

A modal [blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window), forcing the user to take action.
As such, it should be used sparingly—only when the app _requires_ user input before it can continue.
:::

<!-- Uncomment the next line, once an unstyled dialog component is added in @mui/base -->
<!-- If you are creating a modal dialog, the [`Dialog`](/material-ui/dialog/) component is better suited for this specific use case. -->

Modal is a lower-level construct that is used in the following Material UI components:

- [Dialog](/material-ui/react-dialog/)
- [Drawer](/material-ui/react-drawer/)
- [Menu](/material-ui/react-menu/)
- [Popover](/material-ui/react-popover/)

## Component

```jsx
import { Modal } from '@mui/base/Modal';
```

The following demo shows how to create and style a basic modal.
Click **Open modal** to see how it behaves:

{{"demo": "ModalUnstyled.js", "defaultCodeOpen": false }}

## Customization

### Nested modal

:::warning
Though it is possible to create nested Modals—for example, a select modal within a dialog—stacking more than two at a time is discouraged.

This is because each successive Modal blocks interaction with all elements behind it, making prior states inaccessible and overly complicated for the user to navigate through.
:::

The following demo shows how to nest one Modal within another:

{{"demo": "NestedModal.js", "defaultCodeOpen": false}}

### Transitions

You can animate the open and close states of a Modal using a transition component, as long as that component fulfills the following requirements:

- Is a direct child descendant of the Modal
- Has an `in` prop—this corresponds to the open/close state
- Calls the `onEnter` callback prop when the enter transition starts
- Calls the `onExited` callback prop when the exit transition is completed
  :::info
  The `onEnter` and `onExited` callbacks tell the Modal to unmount the child content when closed and fully transitioned.
  :::

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group):

{{"demo": "TransitionsModal.js", "defaultCodeOpen": false}}

You can also use [react-spring](https://github.com/pmndrs/react-spring) with Modal, but it will require additional custom configuration:

{{"demo": "SpringModal.js", "defaultCodeOpen": false}}

### Performance

The Modal's content is unmounted when it's not open.
This means that it will need to be re-mounted each time it's opened.

If you're rendering expensive component trees inside your Modal, and you want to optimize for interaction responsiveness, you can change this default behavior by enabling the `keepMounted` prop.

You can also use the `keepMounted` prop if you want to make the content of the Modal available to search engines (even when the Modal is closed).

The following demo shows how to apply this prop to keep the Modal mounted:

{{"demo": "KeepMountedModal.js", "defaultCodeOpen": false}}

:::info
You can use the `base-Modal-hidden` class to hide the modal when it is not open.
:::

As with any performance optimization, the `keepMounted` prop won't necessarily solve all of your problems.
Explore other possible bottlenecks in performance where you could make more considerable improvements before implementing this prop.

### Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://react.dev/reference/react-dom/createPortal) API on the server.

To display a Modal rendered on the server, you need to disable the portal feature with the `disablePortal` prop, as shown in the following demo:

{{"demo": "ServerModal.js"}}

## Limitations

### Overflow layout shift

The Modal disables the page scrolling while open by setting `overflow: hidden` as inline-style on the relevant scroll container, this hides the scrollbar and hence impacts the page layout.
To compensate for this offset and avoid a layout shift, the Modal also set a padding property on the scroll container (~15px under normal conditions).

This can create a layout shift with `position: fixed` and `position: sticky` elements.
You need to add the `.mui-fixed` class name on these elements so the Modal can add a CSS padding property when the scroll is disabled.

```jsx
<Box sx={{ position: 'sticky', right: 0, top: 0, left: 0 }} className="mui-fixed">
```

### Focus trap

Modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, but it can potentially create issues for your users.

If the user needs to interact with another part of the page—for example, to interact with a chatbot window while a Modal is open in the parent app—you can disable the default behavior with the `disableEnforceFocus` prop.

## Hook

```js
import useModal from '@mui/base/unstable_useModal';
```

The `useModal` hook lets you apply the functionality of a Modal to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The following demo shows how to build the same Modal as the one found in the [Component](#component) section above, but with the `useModal` hook:

{{"demo": "UseModal.js", "defaultCodeOpen": true}}

If you use a ref to store a reference to the root element, pass it to the `useModal`'s `ref` parameter, as shown in the demo above.
It will get merged with a ref used internally in the hook.

:::warning
Do not add the `ref` parameter to the root element manually, as the correct ref is already a part of the object returned by the `getRootProps` function.
:::

## Accessibility

See the [WAI-ARIA guide on the Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) for complete details on accessibility best practices.

- All interactive elements must have an [accessible name](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). Use the `aria-labelledby="id..."` to give your Modal component an accessible name.
  You can also use `aria-describedby="id..."` to provide a description of the Modal:

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- Follow the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) to help you set the initial focus on the most relevant element based on the content of the Modal.
  :::warning
  A modal window can sit on top of either the parent application or another modal window.
  _All_ windows under the topmost modal are **inert**, meaning the user cannot interact with them.
  This can lead to [conflicting behaviors](#focus-trap).
  :::
