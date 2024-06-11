---
productId: joy-ui
title: React Modal component
components: Modal, ModalClose, ModalDialog, ModalOverflow, DialogTitle, DialogContent, DialogActions
githubLabel: 'component: modal'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Joy UI provides three modal-related components:

- [`Modal`](#basic-usage): A container that renders its `children` node in front of a backdrop component.
- [`ModalClose`](#dialog): A button for closing the modal.
- [`ModalDialog`](#dialog): A component for rendering a modal dialog.

{{"demo": "ModalUsage.js", "hideToolbar": true, "bg": "gradient"}}

### Features

- 🥞 Manages modal stacking when more than one is needed.
- 🪟 Automatically creates a backdrop element to disable interaction with the rest of the app.
- 🔐 Disables page scrolling while open.
- ⌨️ Manages focus correctly between the modal and its parent app.
- ♿️ Adds the appropriate ARIA roles automatically.

:::info
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

The Modal accepts only a single React element as a child.
That can be either a Joy UI component, for example [`Sheet`](/joy-ui/react-sheet/), or any other custom element.

Use the Modal Close component to render a close button that inherits the modal's `onClose` function.

{{"demo": "BasicModal.js"}}

:::info
Modal Close accepts the variant prop because it uses the same styles as the [`IconButton`](/joy-ui/react-button/#icon-button).
:::

### Close reason

The second argument of the `onClose` gives you the information about how the event is triggered.

The possible values are:

- `backdropClick`: the user clicks on the modal's backdrop.
- `escapeKeyDown`: the user presses `Escape` on the keyboard.
- `closeClick`: the user clicks on the `ModalClose` element.

{{"demo": "CloseModal.js"}}

### Modal Dialog

To create a modal dialog, render the Modal Dialog component inside the Modal.

The Dialog will apply spacing to the elements that have `aria-labelledby` or `aria-describedby` attribute.

{{"demo": "BasicModalDialog.js"}}

#### Variant

The Modal Dialog supports the [global variants](/joy-ui/main-features/global-variants/) feature.

The Modal Close component's variant adapts automatically to contrast with the Modal Dialog, as demonstrated below:

{{"demo": "VariantModalDialog.js"}}

#### Size

The Modal Dialog comes in 3 sizes: `sm`, `md` (default), and `lg`.

The Modal Close and Modal Dialog Title components inherit the size from the Modal Dialog unless specified in each component directly.

{{"demo": "SizeModalDialog.js"}}

#### Layout

The Modal Dialog's layout can be:

- `center` (default): the modal dialog appears at the center of the viewport.
- `fullScreen`: the modal dialog covers the whole viewport.

{{"demo": "LayoutModalDialog.js"}}

To add more layout, create a new theme with [`styleOverrides`](/joy-ui/customization/themed-components/#theme-style-overrides) like this:

```js
const theme = extendTheme({
  components: {
    JoyModalDialog: {
      defaultProps: { layout: 'top' },
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

For **TypeScript**, you need module augmentation to include the new values to the `layout` prop:

```ts
// at the root or theme file
declare module '@mui/joy/ModalDialog' {
  interface ModalDialogPropsLayoutOverrides {
    top: true;
  }
}
```

#### Vertical scroll

By default, content within the Modal Dialog won't overflow the screen when its height is bigger than the viewport.

To ensure your content is visible, make the container holding it overflow by adding the [`overflow` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) with either `scroll` or `auto` values.

{{"demo": "DialogVerticalScroll.js"}}

### Modal Overflow

The previous section demonstrated how to make content _within_ the modal scrollable.

To make the _whole_ modal scrollable, in case its higher than the viewport, use the Modal Overflow component.
It will allow the Modal Dialog to vertically overflow the screen.

The Modal Overflow supports both `center` and `fullScreen` built-in layouts.

{{"demo": "ModalDialogOverflow.js"}}

You can achieve the same result by using the Box component and CSS with the `sx` prop.
However, the Modal Overflow component adds greater convenience:

- It makes your styling more consistent, as you won't need to copy styles across different instances.
- You can also add theming customization to it directly from the theme.
- It automatically handles the close action when the user clicks on the Modal's backdrop.

### Alert dialog

Use `role="alertdialog"` to create an [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) that interrupts the user's workflow.

{{"demo": "AlertDialogModal.js"}}

### Nested modals

The modal components can be nested:

{{"demo": "NestedModals.js"}}

:::warning
Though it is possible to create nested modals, stacking more than two at a time is discouraged.
This is because each successive modal blocks interaction with all elements behind it, making prior states inaccessible and overly complicated for the user to navigate through.
:::

### Transition

The modal components **do not** come with built-in transitions.

Here is one example using [`react-transition-group`](https://reactcommunity.org/react-transition-group/transition/) to create a fade animation:

{{"demo": "FadeModalDialog.js"}}

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

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://react.dev/reference/react-dom/createPortal) API on the server.
Therefore, in order to display a modal rendered on the server, disable the portal feature with the `disablePortal` prop, as shown in the following demo:

{{"demo": "ServerModal.js", "defaultCodeOpen": false}}

## Common examples

### Mobile modal

Use `sx` prop with `theme.breakpoints.only('xs')` to customize the styles of the modal dialog to stick at the bottom in mobile viewport.

{{"demo": "ResponsiveModal.js"}}

## Limitations

### Focus trap

Base UI `Modal` moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, but it can potentially create issues for your users.

If the user needs to interact with another part of the page－for example, to interact with a chatbot window while a modal is open in the parent app－you can disable the default behavior with the `disableEnforceFocus` prop.

## Accessibility

See the [WAI-ARIA guide on the Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) for complete details on accessibility best practices. Here are a couple of highlights:

- All interactive elements must have an [accessible name](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). Use the `aria-labelledby="id..."` to give your `Modal` component an accessible name.
  You can also use `aria-describedby="id..."` to provide a description of the `Modal`:

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- Follow the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) to help you set the initial focus on the most relevant element based on the content of the modal.
  :::warning
  A modal window can sit on top of either the parent application, or another modal window.
  _All_ windows under the topmost modal are **inert**, meaning the user cannot interact with them.
  This can lead to [conflicting behaviors](#focus-trap).
  :::
