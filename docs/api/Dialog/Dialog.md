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
|:-----|:-----|:--------|:------------|
| children | node |  | Dialog children, usually the included sub-components. |
| className | string |  | The CSS class name of the root element. |
| hideOnBackdropClick | bool | true | If `true`, clicking the backdrop will fire the `onRequestClose` callback. |
| hideOnEscapeKeyUp | bool | true | If `true`, hitting escape will fire the `onRequestClose` callback. |
| maxWidth | enum:&nbsp;'xs'<br>&nbsp;'sm'<br>&nbsp;'md'<br> | 'sm' | Determine the max width of the dialog. The dialog width grows with the size of the screen, this property is useful on the desktop where you might need some coherent different width size across your application. |
| onBackdropClick | function |  | Callback fires when the backdrop is clicked on. |
| onEnter | function |  | Callback fired before the dialog is entering. |
| onEntering | function |  | Callback fired when the dialog is entering. |
| onEntered | function |  | Callback fired when the dialog has entered. |
| onEscapeKeyUp | function |  | Callback fires when the escape key is pressed and the modal is in focus. |
| onExit | function |  | Callback fired before the dialog is exiting. |
| onExiting | function |  | Callback fired when the dialog is exiting. |
| onExited | function |  | Callback fired when the dialog has exited. |
| onRequestClose | function |  | Callback fired when the dialog requests to be closed. |
| open | bool | false | Set to true to open the Dialog. |
| paperClassName | string |  | The CSS class name of the paper inner element. |
| transition | union | Fade | Transition component. |
| transitionDuration | number | 300 | Length of the transition in ms. |

Any other properties supplied will be spread to the root element.
