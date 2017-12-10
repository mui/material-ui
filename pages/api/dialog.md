---
filename: /src/Dialog/Dialog.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Dialog

Dialogs are overlaid modal paper based components with a backdrop.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Node |  | Dialog children, usually the included sub-components. |
| classes | Object |  | Useful to extend the style applied to components. |
| fullScreen | boolean | false | If `true`, it will be full-screen |
| fullWidth | boolean | false | If specified, stretches dialog to max width. |
| ignoreBackdropClick | boolean | false | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| ignoreEscapeKeyUp | boolean | false | If `true`, hitting escape will not fire the `onClose` callback. |
| maxWidth | union:&nbsp;'xs'&nbsp;&#124;<br>&nbsp;'sm'&nbsp;&#124;<br>&nbsp;'md'<br> | 'sm' | Determine the max width of the dialog. The dialog width grows with the size of the screen, this property is useful on the desktop where you might need some coherent different width size across your application. |
| onBackdropClick | Function |  | Callback fired when the backdrop is clicked. |
| onClose | Function |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onEnter | TransitionCallback |  | Callback fired before the dialog enters. |
| onEntered | TransitionCallback |  | Callback fired when the dialog has entered. |
| onEntering | TransitionCallback |  | Callback fired when the dialog is entering. |
| onEscapeKeyUp | Function |  | Callback fires when the escape key is released and the modal is in focus. |
| onExit | TransitionCallback |  | Callback fired before the dialog exits. |
| onExited | TransitionCallback |  | Callback fired when the dialog has exited. |
| onExiting | TransitionCallback |  | Callback fired when the dialog is exiting. |
| open | boolean | false | If `true`, the Dialog is open. |
| transition | ComponentType | Fade | Transition component. |
| transitionDuration | TransitionDuration | {  enter: duration.enteringScreen,  exit: duration.leavingScreen} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `paper`
- `paperWidthXs`
- `paperWidthSm`
- `paperWidthMd`
- `fullWidth`
- `fullScreen`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Dialog/Dialog.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDialog`.

## Inheritance

The properties of the [&lt;Modal /&gt;](/api/modal) component are also available.

## Demos

- [Dialogs](/demos/dialogs)

