---
product: joy-ui
title: React Modal component
githubLabel: 'component: modal'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

## Introduction

Joy UI provides five modal-related components:

- [`Modal`](#basic-usage): A container that renders its `children` node in front of a backdrop component.
- [`ModalClose`](#dialog): A button for closing the modal.
- [`ModalDialog`](#dialog): A component for rendering a modal dialog.
- [`ModalDialogTitle`](#dialog): A title for the modal dialog.
- [`ModalDialogDescription`](#dialog): A description for the modal dialog.

### Features

- 🥞 Manages modal stacking when more than one is needed.
- 🪟 Automatically creates a backdrop element to disable interaction with the rest of the app.
- 🔐 Disables page scrolling while open.
- ⌨️ Manages focus correctly between the modal and its parent app.
- ♿️ Adds the appropriate ARIA roles automatically.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

:::info
**Note:**
The term "modal" is sometimes used interchangeably with "dialog," but this is incorrect.

A modal [blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window), forcing the user to take action.
As such, it should be used sparingly—only when the app _requires_ user input before it can continue.
A dialog, on the other hand, may be _modal_ or _nonmodal (modeless)_.
:::

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Modal from '@mui/joy/Modal';

export default function MyApp() {
  return <Modal>{children}</Modal>;
}
```

### Basic usage

The `Modal` accepts only a single React element as a child.
That can be either a Joy UI component, e.g. [`Sheet`](/joy-ui/react-sheet/), or any other custom element.

Use the `ModalClose` component to render a close button that inherits the modal's `onClose` function.

{{"demo": "BasicModal.js"}}

:::info
💡 **Quick tip:** The `ModalClose` accepts the variant prop because it uses the same styles as the [`IconButton`](/joy-ui/react-button/#icon-button).
:::

### Dialog

To create a modal dialog, add the `ModalDialog` component inside the `Modal`.

The `ModalDialogTitle` and `ModalDialogDescription` give the modal dialog accessible name and description.

{{"demo": "BasicModalDialog.js"}}

#### Layout

The `ModalDialog`'s layout can be:

- `fullScreen`: the modal dialog covers the whole viewport.
- `center`: the modal dialog appears at the center of the viewport.

{{"demo": "LayoutModalDialog.js"}}

#### Variant

The `ModalDialog` supports the [global variants](/joy-ui/main-features/global-variants/) feature.

The `ModalClose`'s variant adapts automatically to have a proper contrast to the `ModalDialog`.

{{"demo": "VariantModalDialog.js"}}

#### Size

The `ModalDialog` comes with 3 sizes, `sm`, `md` (default), and `lg`.

The `ModalClose` and `ModalDialogTitle` inherits the size from the `ModalDialog` unless it is specified in each component directly.

{{"demo": "SizeModalDialog.js"}}

### Alert Dialog

Use `role="alertdialog"` to create an [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) that interrupts the user's workflow.

{{"demo": "AlertDialogModal.js"}}

### Nested modals

The modal components can be nested:

{{"demo": "NestedModals.js"}}

:::warning
⚠️ **Keep in mind:**
Though it is possible to create nested modals, stacking more than two at a time is discouraged.
This is because each successive modal blocks interaction with all elements behind it, making prior states inaccessible and overly complicated for the user to navigate through.
:::

### Performance

The modal's content is unmounted when it is not open.
This means that it will need to be re-mounted each time it is opened.

If you are rendering "expensive" component trees inside your modal, and you want to optimize for interaction responsiveness, change the default behavior by enabling the `keepMounted` prop.

Use the `keepMounted` prop to make the content of the modal available to search engines (even when the modal is closed).

The following demo shows how to apply this prop to keep the modal mounted:

{{"demo": "KeepMountedModal.js", "defaultCodeOpen": false}}

As with any performance optimization, the `keepMounted` prop won't necessarily solve all of your problems.
Explore other possible bottlenecks in performance where you could make more considerable improvements before implementing this prop.

### Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server.
Therefore, in order to display a modal rendered on the server, disable the portal feature with the `disablePortal` prop, as shown in the following demo:

{{"demo": "ServerModal.js", "defaultCodeOpen": false}}

## Limitations

### Focus trap

`ModalUnstyled` moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, but it can potentially create issues for your users.

If the user needs to interact with another part of the page－for example, to interact with a chatbot window while a modal is open in the parent app－you can disable the default behavior with the `disableEnforceFocus` prop.

## Accessibility

See the [WAI-ARIA guide on the Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/) for complete details on accessibility best practices. Here are a couple of highlights:

- All interactive elements must have an [accessible name](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). Use the `aria-labelledby="id..."` to give your `Modal` component an accessible name.
  You can also use `aria-describedby="id..."` to provide a description of the `Modal`:

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- Follow the [WAI-ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog.html) to help you set the initial focus on the most relevant element based on the content of the modal.
  :::warning
  **Keep in mind:** A modal window can sit on top of either the parent application, or another modal window.
  _All_ windows under the topmost modal are **inert**, meaning the user cannot interact with them.
  This can lead to [conflicting behaviors](#focus-trap).
  :::
