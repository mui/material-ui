---
components: Dialog, DialogTitle, DialogContent, DialogActions
---

# Dialogs

[Dialogs](https://material.google.com/components/dialogs.html) inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.

Dialogs contain text and UI controls.
They retain focus until dismissed or a required action has been taken.
Use dialogs sparingly because they are interruptive.

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

{{demo='pages/component-demos/dialogs/AlertDialog.js'}}

You can also swap out the transition, the next example uses `Slide`.

{{demo='pages/component-demos/dialogs/AlertDialogSlide.js'}}

## Confirmation dialogs

Confirmation dialogs require users to explicitly confirm their choice before an option is committed. For example, users can listen to multiple ringtones but only make a final selection upon touching “OK.”

Touching “Cancel” in a confirmation dialog, or pressing Back, cancels the action, discards any changes, and closes the dialog.

{{demo='pages/component-demos/dialogs/ConfirmationDialog.js'}}

## Full-screen dialogs

{{demo='pages/component-demos/dialogs/FullScreenDialog.js'}}

## Responsive full-screen

You may make a `Dialog` responsively full screen the dialog using `withResponsiveFullScreen`. By default, `withResponsiveFullScreen()(Dialog)` responsively full screens *at or below* the `sm` [screen size](/layout/basics).
