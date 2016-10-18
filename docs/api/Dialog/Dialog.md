Dialog
======

Dialogs are overlayed modal paper based components with a backdrop.

```jsx
<Dialog>
  <DialogContent>...</DialogContent>
  <DialogActions>...</DialogActions>
</Dialog>
```

Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| children | node |  |  Dialog children, usually the included sub-components. |
| className | string |  |  The CSS class name of the root element. |
| hideOnBackdropClick | bool | true |  If true, clicking the backdrop will fire the `onRequestClose` callback. |
| hideOnEscapeKeyUp | bool | true |  If true, hitting escape will fire the `onRequestClose` callback. |
| onBackdropClick | function |  |  Callback fires when the backdrop is clicked on. |
| onEnter | function |  |  Callback fired before the dialog is entering. |
| onEntering | function |  |  Callback fired when the dialog is entering. |
| onEntered | function |  |  Callback fired when the dialog has entered. |
| onEscapeKeyUp | function |  |  Callback fires when the escape key is pressed and the modal is in focus. |
| onExit | function |  |  Callback fired before the dialog is exiting. |
| onExiting | function |  |  Callback fired when the dialog is exiting. |
| onExited | function |  |  Callback fired when the dialog has exited. |
| onRequestClose | function |  |  Callback fired when the dialog requests to be closed. |
| open | bool | false |  Set to true to open the Dialog. |
| transition | union | Fade |  Transition component. |
| transitionDuration | number | 300 |  Length of the transition in ms. |
