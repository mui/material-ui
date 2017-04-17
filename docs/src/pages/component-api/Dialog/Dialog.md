Dialog
======

Dialogs are overlaid modal paper based components with a backdrop.

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
| fullScreen | bool | false | If `true`, the dialog will be full-screen. |
| ignoreBackdropClick | bool | false | If `true`, clicking the backdrop will not fire the `onRequestClose` callback. |
| ignoreEscapeKeyUp | bool | false | If `true`, hitting escape will not fire the `onRequestClose` callback. |
| enterTransitionDuration | number | duration.enteringScreen | Duration of the animation when the element is entering. |
| leaveTransitionDuration | number | duration.leavingScreen | Duration of the animation when the element is leaving. |
| maxWidth | enum:&nbsp;'xs'<br>&nbsp;'sm'<br>&nbsp;'md'<br> | 'sm' | Determine the max width of the dialog. The dialog width grows with the size of the screen, this property is useful on the desktop where you might need some coherent different width size across your application. |
| onBackdropClick | function |  | Callback fired when the backdrop is clicked. |
| onEnter | function |  | Callback fired before the dialog enters. |
| onEntering | function |  | Callback fired when the dialog is entering. |
| onEntered | function |  | Callback fired when the dialog has entered. |
| onEscapeKeyUp | function |  | Callback fires when the escape key is released and the modal is in focus. |
| onExit | function |  | Callback fired before the dialog exits. |
| onExiting | function |  | Callback fired when the dialog is exiting. |
| onExited | function |  | Callback fired when the dialog has exited. |
| onRequestClose | function |  | Callback fired when the dialog requests to be closed. |
| open | bool | false | If `true`, the Dialog is open. |
| paperClassName | string |  | The CSS class name of the paper inner element. |
| transition | union:&nbsp;func<br>&nbsp;element<br> | Fade | Transition component. |

Any other properties supplied will be spread to the root element.
