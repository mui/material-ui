---
title: React Dialog component
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---

# Dialog

<p class="description">Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.</p>

A [Dialog](https://material.io/design/components/dialogs.html) is a type of [modal](/components/modal/) window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.

Dialogs are purposefully interruptive, so they should be used sparingly.

## Simple Dialogs

Simple dialogs can provide additional details or actions about a list item.
For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account).

Touch mechanics:

- Choosing an option immediately commits the option and closes the menu
- Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## Alerts

Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.

Most alerts don't need titles.
They summarize a decision in a sentence or two by either:

- Asking a question (e.g. "Delete this conversation?")
- Making a statement related to the action buttons

Use title bar alerts only for high-risk situations, such as the potential loss of connectivity.
Users should be able to understand the choices based on the title and button text alone.

If a title is required:

- Use a clear question or statement with an explanation in the content area, such as "Erase USB storage?".
- Avoid apologies, ambiguity, or questions, such as “Warning!” or “Are you sure?”

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

## Transitions

You can also swap out the transition, the next example uses `Slide`.

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## Form dialogs

Form dialogs allow users to fill out form fields within a dialog.
For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and touch 'Submit'.

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## Customized dialogs

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

The dialog has a close button added to aide usability.

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## Full-screen dialogs

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## Optional sizes

You can set a dialog maximum width by using the `maxWidth` enumerable in combination with the `fullWidth` boolean.
When the `fullWidth` property is true, the dialog will adapt based on the `maxWidth` value.

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## Responsive full-screen

You may make a dialog responsively full screen using [`useMediaQuery`](/components/use-media-query/#usemediaquery).

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return <Dialog fullScreen={fullScreen} />
}
```

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## Confirmation dialogs

Confirmation dialogs require users to explicitly confirm their choice before an option is committed.
For example, users can listen to multiple ringtones but only make a final selection upon touching “OK”.

Touching “Cancel” in a confirmation dialog, or pressing Back, cancels the action, discards any changes, and closes the dialog.

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## Draggable dialog

You can create a draggable dialog by using [react-draggable](https://github.com/mzabriskie/react-draggable).
To do so, you can pass the the imported `Draggable` component as the `PaperComponent` of the `Dialog` component.
This will make the entire dialog draggable.

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## Scrolling long content

When dialogs become too long for the user’s viewport or device, they scroll.

- `scroll=paper` the content of the dialog scrolls within the paper element.
- `scroll=body` the content of the dialog scrolls within the body element.

Try the demo below to see what we mean:

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## Limitations

Follow the [Modal limitations section](/components/modal/#limitations).

## Accessibility

Follow the [Modal accessibility section](/components/modal/#accessibility).
