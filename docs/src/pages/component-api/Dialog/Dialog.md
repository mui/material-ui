# Dialog

Dialogs are overlaid modal paper based components with a backdrop.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | Dialog children, usually the included sub-components. |
| classes | Object |  | Useful to extend the style applied to components. |
| fullScreen | boolean | false | If `true`, it will be full-screen |
| ignoreBackdropClick | boolean | false | If `true`, clicking the backdrop will not fire the `onRequestClose` callback. |
| ignoreEscapeKeyUp | boolean | false | If `true`, hitting escape will not fire the `onRequestClose` callback. |
| enterTransitionDuration | number | duration.enteringScreen | Duration of the animation when the element is entering. |
| leaveTransitionDuration | number | duration.leavingScreen | Duration of the animation when the element is leaving. |
| maxWidth | union:&nbsp;'xs'<br>&nbsp;'sm'<br>&nbsp;'md'<br> | 'sm' | Determine the max width of the dialog. The dialog width grows with the size of the screen, this property is useful on the desktop where you might need some coherent different width size across your application. |
| onBackdropClick | Function |  | Callback fired when the backdrop is clicked. |
| onEnter | Function |  | Callback fired before the dialog enters. |
| onEntering | Function |  | Callback fired when the dialog is entering. |
| onEntered | Function |  | Callback fired when the dialog has entered. |
| onEscapeKeyUp | Function |  | Callback fires when the escape key is released and the modal is in focus. |
| onExit | Function |  | Callback fired before the dialog exits. |
| onExiting | Function |  | Callback fired when the dialog is exiting. |
| onExited | Function |  | Callback fired when the dialog has exited. |
| onRequestClose | Function |  | Callback fired when the dialog requests to be closed. |
| open | boolean | false | If `true`, the Dialog is open. |
| paperClassName | string |  | The CSS class name of the paper inner element. |
| transition | union:&nbsp;Function<br>&nbsp;Element<*><br> | Fade | Transition component. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `dialog`
- `dialogWidthXs`
- `dialogWidthSm`
- `dialogWidthMd`
- `fullScreen`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDialog`.
