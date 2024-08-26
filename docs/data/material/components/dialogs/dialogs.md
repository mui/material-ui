---
productId: material-ui
title: React Dialog component
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
githubLabel: 'component: dialog'
materialDesign: https://m2.material.io/components/dialogs
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
githubSource: packages/mui-material/src/Dialog
---

# Dialog

<p class="description">Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.</p>

A Dialog is a type of [modal](/material-ui/react-modal/) window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.

Dialogs are purposefully interruptive, so they should be used sparingly.

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Dialogs are implemented using a collection of related components:

- Dialog: the parent component that renders the modal.
- Dialog Title: a wrapper used for the title of a Dialog.
- Dialog Actions: an optional container for a Dialog's Buttons.
- Dialog Content: an optional container for displaying the Dialog's content.
- Dialog Content Text: a wrapper for text inside of `<DialogContent />`.
- Slide: optional [Transition](https://mui.com/material-ui/transitions/#slide) used to slide the Dialog in from the edge of the screen.

{{"demo": "SimpleDialogDemo.js"}}

## Basics

```jsx
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
```

## Alerts

Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.

Most alerts don't need titles.
They summarize a decision in a sentence or two by either:

- Asking a question (for example "Delete this conversation?")
- Making a statement related to the action buttons

Use title bar alerts only for high-risk situations, such as the potential loss of connectivity.
Users should be able to understand the choices based on the title and button text alone.

If a title is required:

- Use a clear question or statement with an explanation in the content area, such as "Erase USB storage?".
- Avoid apologies, ambiguity, or questions, such as "Warning!" or "Are you sure?"

{{"demo": "AlertDialog.js"}}

## Transitions

You can also swap out the transition, the next example uses `Slide`.

{{"demo": "AlertDialogSlide.js"}}

## Form dialogs

Form dialogs allow users to fill out form fields within a dialog.
For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and touch 'Submit'.

{{"demo": "FormDialog.js"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

The dialog has a close button added to aid usability.

{{"demo": "CustomizedDialogs.js"}}

## Full-screen dialogs

{{"demo": "FullScreenDialog.js"}}

## Optional sizes

You can set a dialog maximum width by using the `maxWidth` enumerable in combination with the `fullWidth` boolean.
When the `fullWidth` prop is true, the dialog will adapt based on the `maxWidth` value.

{{"demo": "MaxWidthDialog.js"}}

## Responsive full-screen

You may make a dialog responsively full screen using [`useMediaQuery`](/material-ui/react-use-media-query/).

```jsx
import useMediaQuery from '@mui/material/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <Dialog fullScreen={fullScreen} />;
}
```

{{"demo": "ResponsiveDialog.js"}}

## Confirmation dialogs

Confirmation dialogs require users to explicitly confirm their choice before an option is committed.
For example, users can listen to multiple ringtones but only make a final selection upon touching "OK".

Touching "Cancel" in a confirmation dialog, or pressing Back, cancels the action, discards any changes, and closes the dialog.

{{"demo": "ConfirmationDialog.js"}}

## Non-modal dialog

Dialogs can also be non-modal, meaning they don't interrupt user interaction behind it.
Visit [the Nielsen Norman Group article](https://www.nngroup.com/articles/modal-nonmodal-dialog/) for more in-depth guidance about modal vs. non-modal dialog usage.

The demo below shows a persistent cookie banner, a common non-modal dialog use case.

{{"demo": "CookiesBanner.js", "iframe": true}}

## Draggable dialog

You can create a draggable dialog by using [react-draggable](https://github.com/react-grid-layout/react-draggable).
To do so, you can pass the imported `Draggable` component as the `PaperComponent` of the `Dialog` component.
This will make the entire dialog draggable.

{{"demo": "DraggableDialog.js"}}

## Scrolling long content

When dialogs become too long for the user's viewport or device, they scroll.

- `scroll=paper` the content of the dialog scrolls within the paper element.
- `scroll=body` the content of the dialog scrolls within the body element.

Try the demo below to see what we mean:

{{"demo": "ScrollDialog.js"}}

## Performance

Follow the [Modal performance section](/material-ui/react-modal/#performance).

## Limitations

Follow the [Modal limitations section](/material-ui/react-modal/#limitations).

## Complementary projects

For more advanced use cases you might be able to take advantage of:

### material-ui-confirm

![stars](https://img.shields.io/github/stars/jonatanklosko/material-ui-confirm?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-confirm.svg)

The package [`material-ui-confirm`](https://github.com/jonatanklosko/material-ui-confirm/) provides dialogs for confirming user actions without writing boilerplate code.

## Accessibility

Follow the [Modal accessibility section](/material-ui/react-modal/#accessibility).

## Experimental APIs

### Imperative API

You can create and manipulate dialogs imperatively with the [`useDialog`](https://mui.com/toolpad/core/react-use-dialogs/) API in `@toolpad/core`. This API provides state management for opening and closing dialogs and for passing data to the dialog and back. It allows for stacking multiple dialogs. It also provides themed alternatives for `window.alert`, `window.confirm` and `window.prompt`.
