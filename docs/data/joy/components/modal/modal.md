---
productId: joy-ui
title: React Modal component
components: Modal, ModalClose, ModalDialog, ModalOverflow, DialogTitle, DialogContent, DialogActions
githubLabel: 'component: modal'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, and other interactive elements.</p>

## Introduction

Modals are interactive dialog boxes or overlays that capture user inputs or present information.

In Joy UI, modals are managed through three related components:

- [`Modal`](#basic-usage): A container that renders its `children` node in front of a backdrop component.
- [`ModalClose`](#dialog): A button for closing the modal.
- [`ModalDialog`](#dialog): A component for rendering a modal dialog.

{{"demo": "ModalUsage.js", "hideToolbar": true, "bg": "gradient"}}

The Modal component comes equipped with features designed to improve user interaction and accessibility:

- Manages modal stacking when more than one is needed.
- Automatically create a backdrop element to disable interactions with the rest of the app.
- Disables page scrolling when open.
- Manages focus between modal and its parent app.
- Adds appropriate ARIA roles automatically.

:::info
The term "modal" can sometimes be used interchangeably with "dialog," but this is incorrect.

A modal [restricts interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window), forcing the user to take action.
Therefore, it should be used sparingly, reserved for instances where the application _requires_ user input to proceed.

Dialog, on the other hand, can either be _modal_ or _nonmodal (modeless)_, offering more flexibility in user interactions.
:::

## Basics

```jsx
import Modal from '@mui/joy/Modal';
```

The `Modal` component is designed to accept just one React element as its child.
This could be a Joy UI component, such as `Sheet`, or any other custom element.

{{"demo": "BasicModal.js"}}

## Customization

### Variants

`ModalDialog` supports Joy UI's [global variants](/joy-ui/main-features/global-variants/): .
Based on `ModalDialog`, `ModalClose` will automatically adapt to the proper contrast.

{{"demo": "VariantModalDialog.js"}}

:::info
The `ModalClose` component accepts the `variant` property, since it shares the same styles as [`IconButton`](/joy-ui/react-button/#icon-button).
:::

### Sizes

The `ModalDialog` component offers three distinct sizing options: `sm`, `md` (default), and `lg`. The `ModalClose` and `ModalDialogTitle` components will automatically inherit the size set in `ModalDialog`, unless explicitly specified within each individual component.

{{"demo": "SizeModalDialog.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.

### Transition

The modal components **do not** come with built-in transitions.
To incorporate animations, you will need to create your own transitions or use an external library.

The following is an example using [`react-transition-group`](https://reactcommunity.org/react-transition-group/transition/) to create a fade animation:

{{"demo": "FadeModalDialog.js"}}

### Nesting modals

Modal components in Joy UI are able to be nested:

{{"demo": "NestedModals.js"}}

:::warning
While it is possible to create nested modals, stacking more than two at a time is discouraged.
Each additional modal further restricts interactions with elements in the background, which renders the previous states inaccessible and complicating the user experience.
:::

## Usage with Modal Close

```tsx
import ModalClose from '@mui/joy/ModalClose';
```

Use the `ModalClose` component to render a close button that automatically adopts the modal's `onClose` function.
The second argument of the `onClose` gives information about how the event is triggered.

The potential triggers are:

- `backdropClick`: the user clicks on the modal's backdrop.
- `escapeKeyDown`: the user presses `Escape` on the keyboard.
- `closeClick`: the user clicks on the `ModalClose` element.

{{"demo": "CloseModal.js"}}

## Usage with Modal Dialog

```tsx
import ModalDialog from '@mui/joy/ModalDialog';
```

To create a modal dialog, render the Modal Dialog component inside the Modal.

This will automatically apply spacing to the elements that have either the `aria-labelledby` or `aria-describedby` attribute.

{{"demo": "BasicModalDialog.js"}}

### Layout

The Modal Dialog component offers two layout options for display:

- `center` (default): Positions the modal dialog in the center of the viewport for focused user interaction.
- `fullScreen`: Expands the modal dialog to occupy the entire viewport.

{{"demo": "LayoutModalDialog.js"}}

To use additional layouts, you can modify the theme's styling as follows:

```js
// Add a new `top` layout to the ModalDialog
extendTheme({
  components: {
    JoyModalDialog: {
      defaultProps: {
        layout: 'top',
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.layout === 'top' && {
            top: '12vh',
            left: '50%',
            transform: 'translateX(-50%)',
          }),
        }),
      },
    },
  },
});
```

When using TypeScript, module augmentation is required to incorporate the new values into the layout property:

```ts
// at the root or theme file
declare module '@mui/joy/ModalDialog' {
  interface ModalDialogPropsLayoutOverrides {
    top: true;
  }
}
```

#### Alert Dialog

Use `role="alertdialog"` to create an [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) that interrupts the user's workflow.

{{"demo": "AlertDialogModal.js"}}

## Performance

By default, the content within the modal is unmounted when the modal is closed.
This implies that the content will have to be re-mounted each time the modal is reopened.

If you are rendering "expensive" component trees inside your modal, and you are aiming for more responsive interactions, you can override this default behavior by activating the `keepMounted` property.

Using the `keepMounted` prop also makes the modal's content accessible to search engines, even when the modal is not visible.

Here's a demo illustrating how to utilize the `keepMounted` property to maintain the modal in a mounted state:

{{"demo": "KeepMountedModal.js", "defaultCodeOpen": false}}

As with any performance optimization, the `keepMounted` prop is not a one-size-fits-all solution.
Make sure to explore other performance bottlenecks where more considerable improvements can be achieved before implementing this prop.

## Server-side modal

React [does not support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API when operating on the server.
As a result, to display a server-rendered modal, you'll need to deactivate the portal functionality which can be achieved by setting the `disablePortal` property:

{{"demo": "ServerModal.js", "defaultCodeOpen": false}}

## Limitations

### Focus trap

The `ModalUnstyled` component is designed to redirect focus back to its body, should the focus attempt to leave the modal.
This is done for accessibility purposes, but could potentially introduce issues for users.

Should a user need to interact with another elements on the page, such as interacting with a chatbot window while a modal is active in the main application — this default behavior can be overwritten by employing the `disableEnforceFocus` property.

## Accessibility

The Modal component is designed for accessibility, using ARIA roles and attributes.
The root `div` employs [`role="presentation"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role) to remove semantic meaning, making it non-interactive for assistive tools.
Inside the modal, [`role="dialog"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role) and [`aria-modal="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal) attributes are used to define it as an interactive, focus-capturing dialog that restricts interaction with the rest of the page until closed.

For more complete details on accessibility best practices, you can refer to the [WAI-ARIA guide on the Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

Key highlights include:

- Providing an [accessible name](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) to all interactive elements using `aria-labelledby="id..."`.
  You can also add a description using `aria-describedby="id..."`:

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- Following the [WAI-ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) to help set the initial focus on the most relevant element based on the content of the modal.

  :::warning
  A modal window can overlay either the parent application, or another modal window.
  _All_ underlying windows **inert**, meaning they are non-interactive.
  This can lead to [conflicting behaviors](#focus-trap) if not managed carefully.
  ::: -->

## Anatomy

The Modal component consists of a root `<div>` element assigned the role of `presentation`.
Directly nested within this root are two specialized `<div>` elements: the first serves as the modal's backdrop and is marked with aria-hidden="true", while the second is designed for accessibility, facilitating focus trapping.

Following these is the `<ModalDialog />` component, represented by a `<div>` with the role="dialog".
This container holds the modal's main content.

When included, the `<ModalClose />` component is made up of a `<button>` element with type="button", featuring an SVG icon shaped like an "X" to indicate the close action.

```html
<div role="dialog" class="MuiModalDialog-root">
  <div aria-hidden="true" class="MuiModal-backdrop">
    <div tabindex="0"></div>
    <div aria-modal="true" class="MuiModalDialog-root">
      <!-- Modal contents -->
    </div>
  </div>
</div>
```
